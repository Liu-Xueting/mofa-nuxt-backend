<script setup lang="ts">
definePageMeta({ layout: 'login' })

const { t } = useI18n()
const { loginByCredentials, updateUserData } = useUserStore()
const localePath = useLocalePath()
const isLoading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  rememberPassword: false,
})

async function onSubmit() {
  isLoading.value = true
  try {
    const res = await loginByCredentials(
      loginForm.username,
      loginForm.password,
    )
    if (res?.error) {
      ElMessage.error(t('login.login_failed'))
    } else {
      await updateUserData()
      ElNotification.success({
        title: t('login.login_success'),
        message: t('login.title'),
      })
    }
  } catch (error) {
    ElMessage.error(t('login.login_failed'))
    console.error(error)
  } finally {
    isLoading.value = false
    navigateTo(localePath('/admin'))
  }
}
</script>

<template>
  <div class="m-2">
    <h1 class="text-3xl font-bold">
      {{ $t('login.title') }}
    </h1>
    <p class="pb-8 pt-2 text-base-content">
      {{ $t('login.sub_title') }}
    </p>
    <el-form
      :model="loginForm" label-width="auto" label-position="top" size="large"
      class="w-[448px] max-w-md text-base"
    >
      <!-- username -->
      <el-form-item>
        <el-input v-model="loginForm.username" :placeholder="$t('login.username_placeholder')" />
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <el-input
          v-model="loginForm.password" type="password" show-password
          :placeholder="$t('login.password_placeholder')"
        />
      </el-form-item>
      <!-- remember password -->
      <div class="flex items-center justify-between">
        <el-checkbox v-model="loginForm.rememberPassword">
          {{ $t('login.remember_password') }}
        </el-checkbox>
        <NuxtLink :to="$localePath('/reset-password')" class="text-primary">
          {{ $t('login.forget_password') }}
        </NuxtLink>
      </div>
      <!-- submit -->
      <el-form-item class="pt-8">
        <el-button type="primary" class="glass w-full" :disabled="isLoading" @click="onSubmit">
          {{ $t('login.login_button') }}
        </el-button>
      </el-form-item>
      <!-- register -->
      <div>
        <span>{{ $t('login.no_account_yet') }}</span>
        <NuxtLink :to="$localePath('/register')" class="text-primary">
          {{ $t('login.register_button') }}
        </NuxtLink>
      </div>
    </el-form>
  </div>
</template>
