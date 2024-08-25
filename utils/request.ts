import type { CustomRequestOptions } from '@/interceptors/uni-adaptor'

export const request = <T>(options: CustomRequestOptions) => {
    return new Promise<API.BaseResponse<T>>((resolve, reject) => {
        uni.request({
            ...options,
            success(res) {
                resolve(res.data as API.BaseResponse<T>)
            },
            fail(err) {
                reject(err)
            },
        })
    })
}
