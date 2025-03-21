import type { RetailerApplySearchRequest, RetailerApplyStatusRequest } from '~~/server/schema/modules/retailer-apply'
/**
 * 搜索门店申请
 */
export async function searchRetailerApplies(data: RetailerApplySearchRequest, page: PageParamsType) {
  return useRequest<PageType<RetailerApplyVO>>('/api/retailers/applies/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 修改门店申请状态
 * @param id 门店申请ID
 * @param data 门店申请状态
 */
export async function updateRetailerApplyStatus(id: string, data: RetailerApplyStatusRequest) {
  return useRequest(`/api/retailers/applies/${id}/status`, {
    method: 'PUT',
    body: data,
  })
}
