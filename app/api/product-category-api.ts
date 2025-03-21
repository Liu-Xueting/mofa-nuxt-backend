import type { ProductCategory } from '@prisma/client'
import type { ProductCategoryCreateRequest, ProductCategorySearchRequest, ProductCategoryUpdateRequest } from '~~/server/schema/modules/product-category'
/**
 * 搜索商品分类
 * @param data 搜索条件
 * @param page 分页参数
 * @returns 商品分类分页
 */
export async function searchProductCategories(data: ProductCategorySearchRequest, page: PageParamsType) {
  return useRequest<PageType<ProductCategory>>('/api/products/categories/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 获取商品分类列表
 */
export async function getProductCategories() {
  return useRequest<ProductCategory[]>('/api/products/categories', {
    method: 'GET',
  })
}

/**
 * 创建商品分类
 * @param data 商品分类数据
 * @returns 商品分类
 */
export async function createProductCategory(data: ProductCategoryCreateRequest) {
  return useRequest<ProductCategoryVO>('/api/products/categories/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新商品分类
 * @param id 商品分类 ID
 * @param data 更新商品分类数据
 */
export async function updateProductCategory(id: string, data: ProductCategoryUpdateRequest) {
  return useRequest<ProductCategoryVO>(`/api/products/categories/${id}/update`, {
    method: 'POST',
    body: data,
  })
}

/**
 * 删除商品分类
 */
export async function deleteProductCategory(id: string) {
  return useRequest(`/api/products/categories/${id}/delete`, {
    method: 'DELETE',
  })
}
