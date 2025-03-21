import type { PermissionCreateRequest, PermissionSearchRequest, PermissionUpdateRequest } from '~~/server/schema/modules/permission'

/**
 * 搜索权限
 */
export async function searchPermission(data: PermissionSearchRequest, page?: PageParamsType) {
  return useRequest<PageType<PermissionVO>>('/api/permissions/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 更新权限
 */
export async function updatePermission(id: string, data: PermissionUpdateRequest) {
  return useRequest<PermissionVO>(`/api/permissions/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 创建权限
 */
export async function createPermission(data: PermissionCreateRequest) {
  return useRequest<PermissionVO>('/api/permissions/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 删除权限
 */
export async function deletePermission(id: string) {
  return useRequest<PermissionVO>(`/api/permissions/${id}/delete`, {
    method: 'DELETE',
  })
}

/**
 * 获取权限详情
 */
export async function getPermission(id: string) {
  return useRequest<PermissionVO>(`/api/permissions/${id}`, {
    method: 'GET',
  })
}
