export type AppEnv = 'dev' | 'test' | 'prod'
const CONFIG = {
    dev: {
        API_CLOUD_ENV: 'https://pcapi-xiaotuxian-front-devtest.itheima.net', // 自搭云接口域名
    },
    test: {
        API_CLOUD_ENV: 'https://test-cloud.zidayun.com',
    },
    prod: {
        API_CLOUD_ENV: 'https://cloud.zidayun.com',
    },
} as const

// 客户端打包 手动切换对应环境
const APP_ENV_DEFAULT = 'dev'
// 打包系统配置的环境变量
const APP_ENV_BUILD = process.env.APP_ENV as AppEnv
// 实际使用的环境变量
export const APP_ENV = APP_ENV_BUILD || APP_ENV_DEFAULT
// 当前环境对应配置项
export const APP_ENV_CONFIG = CONFIG[APP_ENV]
// 获取对应环境接口域名
export const getBaseUrl = () => APP_ENV_CONFIG['API_CLOUD_ENV']
