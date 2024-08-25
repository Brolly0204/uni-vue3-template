export {}

declare global {
    namespace API {
        // 响应数据类型
        type BaseResponse<T = null> = {
            code: number
            msg: string
            result: T
            success: boolean
            time: number
        }
        // // 带分页的响应数据类型
        // type BaseResponsePaging<T> = BaseResponse<{
        //   list: T[];
        //   currPage: number;
        //   pageSize: number;
        //   totalCount: number;
        //   totalPage: number;
        // }>;
    }

    type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
}
