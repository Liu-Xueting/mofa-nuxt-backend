import type { MenuCreateRequest, MenuSearchRequest, MenuUpdateRequest } from '~~/server/schema/modules/menu'
/**
 * 获取菜单列表
 */
export async function getMenus() {
  return useRequest<MenuVO[]>('/api/menus')
}

/**
 * 创建菜单
 */
export async function createMenu(data: MenuCreateRequest) {
  return useRequest<MenuVO>('/api/menus/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新菜单
 */
export async function updateMenu(id: string, data: MenuUpdateRequest) {
  return useRequest<MenuVO>(`/api/menus/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 删除菜单
 */

export async function deleteMenu(id: string) {
  return useRequest<MenuVO>(`/api/menus/${id}/delete`, {
    method: 'DELETE',
  })
}

/**
 * 获取菜单详情
 */
export async function getMenu(id: string) {
  return useRequest<MenuVO>(`/api/menus/${id}`)
}

/**
 * 搜索菜单
 */
export async function searchMenu(data: MenuSearchRequest, page?: PageParamsType) {
  return useRequest<PageType<MenuVO>>('/api/menus/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 获取菜单树
 */
// export async function getMenuTree() {
//   return useRequest<MenuInfo[]>('/api/menus/tree')
// }
