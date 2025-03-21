import type { UserCreateRequest, UserRegisterRequest, UserSearchRequest, UserStatus, UserUpdateRequest } from '~~/server/schema/modules/user'

/**
 * 通过用户 ID 获取用户信息
 * @param id 用户 ID
 * @returns 用户信息
 */
export async function getUserById(id: string) {
  return useRequest<UserVO>(`/api/users/${id}`, {
  })
}

/**
 * 注册用户
 * @param data 注册用户信息
 * @returns 注册成功的用户信息
 */
export async function registerUser(data: UserRegisterRequest) {
  return useRequest<UserVO>('/api/users/register', {
    method: 'POST',
    body: data,
  })
}

/**
 * 搜索用户
 */
export async function searchUsers(data: UserSearchRequest, page: PageParamsType) {
  return useRequest<PageType<UserVO>>('/api/users/search', {
    method: 'POST',
    body: data,
    params: page,
  })
}

/**
 * 删除用户
 * @param id 用户 ID
 */
export async function deleteUser(id: string) {
  return useRequest<UserVO>(`/api/users/${id}/delete`, {
    method: 'DELETE',
  })
}

/**
 * 更新用户
 */
export async function updateUser(id: string, data: UserUpdateRequest) {
  return useRequest<UserVO>(`/api/users/${id}/update`, {
    method: 'PUT',
    body: data,
  })
}

/**
 * 创建用户
 */
export async function createUser(data: UserCreateRequest) {
  return useRequest<UserVO>('/api/users/create', {
    method: 'POST',
    body: data,
  })
}

/**
 * 更新用户状态
 */
export async function updateUserStatus(id: string, data: UserStatus) {
  return useRequest<UserVO>(`/api/users/${id}/status`, {
    method: 'PUT',
    body: data,
  })
}
