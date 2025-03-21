import type { ProductCreateRequest, ProductSearchRequest, ProductStatusRequest, ProductUpdateRequest } from '~~/server/schema/modules/product'
/**
 * 搜索商品
 * @param data 搜索条件
 * @param page 分页参数
 * @returns 商品分页
 */
export async function searchProducts(data: ProductSearchRequest, page: PageParamsType) {
  return useRequest<PageType<ProductVO>>('/api/products/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 创建商品
 * @param data 商品信息
 */
export async function createProduct(data: ProductCreateRequest) {
  return useRequest('/api/products/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新商品
 * @param id 商品 ID
 * @param data 商品信息
 */
export async function updateProduct(id: string, data: ProductUpdateRequest) {
  return useRequest(`/api/products/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 更新产品状态
 * @param id 商品 ID
 * @param data 商品状态
 */
export async function updateProductStatus(id: string, data: ProductStatusRequest) {
  return useRequest(`/api/products/${id}/status`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除商品
 * @param id 商品 ID
 */
export async function deleteProduct(id: string) {
  return useRequest(`/api/products/${id}/delete`, {
    method: 'DELETE',
  })
}
