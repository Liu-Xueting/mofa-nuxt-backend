import type { RoleCreateRequest, RoleSearchRequest, RoleUpdateRequest } from '~~/server/schema/modules/role'

/**
 * 搜索角色
 */
export async function searchRole(data: RoleSearchRequest, page: PageParamsType) {
  return useRequest<PageType<RoleVO>>('/api/roles/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 更新角色
 */
export async function updateRole(id: string, data: RoleUpdateRequest) {
  return useRequest<RoleVO>(`/api/roles/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 创建角色
 */
export async function createRole(data: RoleCreateRequest) {
  return useRequest<RoleVO>('/api/roles/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 删除角色
 */
export async function deleteRole(id: string) {
  return useRequest<RoleVO>(`/api/roles/${id}/delete`, {
    method: 'DELETE',
  })
}
