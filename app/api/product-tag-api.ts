import type { ProductTagCreateRequest, ProductTagSearchRequest, ProductTagUpdateRequest } from '~~/server/schema/modules/product-tag'

/**
 * 搜索商品标签
 * @param data 搜索条件
 * @param page 分页参数
 * @returns 商品分类分页
 */
export async function searchProductTags(data: ProductTagSearchRequest, page: PageParamsType) {
  return useRequest<PageType<ProductTagVO>>('/api/products/tags/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 获取商品标签列表
 */
export async function getProductTags() {
  return useRequest<ProductTagVO[]>('/api/products/tags', {
    method: 'GET',
  })
}

/**
 * 创建商品标签
 * @param data 商品标签数据
 * @returns 商品标签
 */
export async function createProductTag(data: ProductTagCreateRequest) {
  return useRequest<ProductTagVO>('/api/products/tags/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新商品标签
 * @param id 商品标签 ID
 * @param data 更新商品标签数据
 */
export async function updateProductTag(id: string, data: ProductTagUpdateRequest) {
  return useRequest<ProductTagVO>(`/api/products/tags/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除商品标签
 */
export async function deleteProductTag(id: string) {
  return useRequest(`/api/products/tags/${id}/delete`, {
    method: 'DELETE',
  })
}
