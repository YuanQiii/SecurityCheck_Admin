import request from "@/utils/request";

// 获取数据
export function ycProductListApi(pageSize, pageNum) {
    return request({
        url: "/ycProductList",
        method: "get",
        params: {
            pageSize,
            pageNum
        }
    });
}

// 批量添加数据
export function ycBatchAddApi(count) {
    return request({
        url: "/ycBatchAdd",
        method: "get",
        params: {
            count
        }
    });
}