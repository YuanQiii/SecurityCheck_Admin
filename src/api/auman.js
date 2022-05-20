import request from "@/utils/request";

// 获取数据
export function aumanProductListApi(pageSize, pageNum) {
    return request({
        url: "/aumanProductList",
        method: "get",
        params: {
            pageSize,
            pageNum
        }
    });
}

// 批量添加数据
export function aumanBatchAddApi(count) {
    return request({
        url: "/aumanBatchAdd",
        method: "get",
        params: {
            count
        }
    });
}

// 批量导出数据
export function aumanBatchExportApi(count) {
    return request({
        url: "/aumanBatchExport",
        method: "get",
        params: {
            count
        },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/x-download'
        }
    });
}