import { storeToRefs } from 'pinia'
import qs from 'qs'
import { useUserStore } from '@/stores/user'
import { getBaseUrl } from '@/utils/config'
import { getPlatform, MAP_PLATFORM } from '@/utils/getPlatform'

export type CustomRequestOptions = UniApp.RequestOptions & {
    query?: Record<string, any>
    /** 出错时是否隐藏错误提示 */
    hideErrorToast?: boolean
    /** content-type是否是表单类型 */
    contentTypeForm?: boolean
    /** 不检测业务code（非401/401500）*/
    notCheckCode?: boolean
}

uni.addInterceptor('request', {
    invoke(options: CustomRequestOptions) {
        const baseURL = getBaseUrl()
        const UNI_APP_VERSION_NAME = process.env.UNI_APP_VERSION_NAME
        const platform = getPlatform()
        const { token } = storeToRefs(useUserStore())

        if (!options.url.startsWith('http')) {
            options.url = `${baseURL}${options.url}`
        }
        // 接口请求支持通过 query 参数配置 queryString
        // post请求也支持query，很多微信接口都需要
        if (options.query) {
            const queryStr = qs.stringify(options.query)
            if (options.url.includes('?')) {
                options.url += `&${queryStr}`
            } else {
                options.url += `?${queryStr}`
            }
        }
        // 2. 请求超时, 默认 60s
        options.timeout = 10000
        // 3. 添加小程序端请求头标识
        options.header = {
            ...options.header,
            'Client-Type': platform,
            'Client-Version': UNI_APP_VERSION_NAME,
            // 'source-client': 'miniapp',
            Authorization: token.value,
        }
        // 支持form类型
        if (options.contentTypeForm) {
            options.header = {
                ...options.header,
                'content-type': 'application/x-www-form-urlencoded',
            }
        }
    },
    success(args) {
        switch (args.statusCode) {
            case 401:
                args.message = '请先登录系统。'
                //跳转到登录页面
                break
            case 402:
                args.message = '暂未定义。'
                break
            case 403:
                args.message = '服务器理解请求客户端的请求，但是拒绝执行此请求。'
                break
        }
        // 处理状态码
        if (args.statusCode !== 200) {
            uni.showToast({
                icon: 'error',
                title: args.message,
            })
            return Promise.reject(args.message)
        }
        if (!args.data || !args.data.code || !args.data.msg) {
            return Promise.reject('错误的数据内容。')
        }
        // 处理消息码
        if (args.data && Number(args.data.code) !== 1) {
            uni.showToast({
                icon: 'error',
                title: args.data.msg,
            })
            return Promise.reject(args.data.msg)
        }
        return Promise.resolve(args)
    },
})
// uni.addInterceptor({
//     returnValue(args) {
//         // 只返回 data 字段
//         return args.data
//     },
// })
