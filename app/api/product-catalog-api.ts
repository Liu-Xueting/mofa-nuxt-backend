import type { ProductCatalogCreateRequest, ProductCatalogSearchRequest, ProductCatalogUpdateRequest } from '~~/server/schema/modules/product-catalog'
/**
 * 搜索商品目录
 * @param data 搜索条件
 * @param page 分页参数
 * @returns 商品分页
 */
export async function searchProductCatalogs(data: ProductCatalogSearchRequest, page: PageParamsType) {
  return useRequest<PageType<ProductCatalogVO>>('/api/products/catalogs/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 创建商品目录
 * @param data 创建商品目录数据
 */
export async function createProductCatalog(data: ProductCatalogCreateRequest) {
  return useRequest<ProductCatalogVO>('/api/products/catalogs/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新商品目录
 * @param id 商品目录 ID
 * @param data 更新商品目录数据
 */
export async function updateProductCatalog(id: string, data: ProductCatalogUpdateRequest) {
  return useRequest<ProductCatalogVO>(`/api/products/catalogs/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除商品目录
 * @param id 商品目录 ID
 */
export async function deleteProductCatalog(id: string) {
  return useRequest(`/api/products/catalogs/${id}/delete`, {
    method: 'DELETE',
  })
}
