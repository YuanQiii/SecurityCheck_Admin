/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-05-20 15:51:47
 * @FilePath: \SecurityCheck_Admin\src\api\xc.js
 */
import request from "@/utils/request";

// 获取数据
export function xcProductListApi(pageSize, pageNum) {
    return request({
        url: "/xcProductList",
        method: "get",
        params: {
            pageSize,
            pageNum
        }
    });
}

// 批量添加数据
export function xcBatchAddApi(count) {
    return request({
        url: "/xcBatchAdd",
        method: "get",
        params: {
            count
        }
    });
}

// 批量导出数据
export function xcBatchExportApi(count) {
    return request({
        url: "/xcBatchExport",
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