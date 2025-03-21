import type { ProductGroupCreateRequest, ProductGroupSearchRequest, ProductGroupUpdateRequest } from '~~/server/schema/modules/product-group'
/**
 * 搜索商品分组
 * @param data 搜索条件
 * @param page 分页参数
 * @returns 商品分页
 */
export async function searchProductGroups(data: ProductGroupSearchRequest, page: PageParamsType) {
  return useRequest<PageType<ProductGroupVO>>('/api/products/groups/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 创建商品分组
 * @param data 创建商品分组数据
 */
export async function createProductGroup(data: ProductGroupCreateRequest) {
  return useRequest<ProductGroupVO>('/api/products/groups/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新商品分组
 * @param id 商品分组 ID
 * @param data 更新商品分组数据
 */
export async function updateProductGroup(id: string, data: ProductGroupUpdateRequest) {
  return useRequest<ProductGroupVO>(`/api/products/groups/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除商品分组
 * @param id 商品分组 ID
 */
export async function deleteProductGroup(id: string) {
  return useRequest(`/api/products/groups/${id}/delete`, {
    method: 'DELETE',
  })
}

/**
 * 获取商品分组列表
 */
export async function getProductGroupList() {
  return useRequest<ProductGroupVO[]>('/api/products/groups', {
    method: 'GET',
  })
}
