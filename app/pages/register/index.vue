<script setup lang="ts">
import { registerUser } from '~/api/user-api'

definePageMeta({ layout: 'login' })

const { t } = useI18n()
const localePath = useLocalePath()

const registerForm = reactive({
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
})

async function onSubmit() {
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error(t('register.password_not_match'))
    return
  }
  const res = await registerUser({
    username: registerForm.username,
    password: registerForm.password,
    email: registerForm.email,
  })
  if (res.code === 0) {
    ElMessage.success(t('register.register_success'))
  } else {
    ElMessage.error(`${t('register.register_failed')}: ${res.msg}`)
  }
  setTimeout(() => {
    navigateTo(localePath('/login'))
  }, 300)
}
</script>

<template>
  <div class="m-2">
    <h1 class="text-3xl font-bold">
      {{ $t('register.title') }}
    </h1>
    <p class="pb-8 pt-2 text-base-content">
      {{ $t('register.sub_title') }}
    </p>
    <el-form
      :model="registerForm" label-width="auto" label-position="top" size="large"
      class="w-[448px] max-w-md text-base"
    >
      <!-- username -->
      <el-form-item>
        <el-input v-model="registerForm.username" :placeholder="$t('register.username_placeholder')" />
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <el-input
          v-model="registerForm.password" type="password" show-password
          :placeholder="$t('register.password_placeholder')"
        />
      </el-form-item>
      <!-- confirm password -->
      <el-form-item>
        <el-input
          v-model="registerForm.confirmPassword" type="password" show-password
          :placeholder="$t('register.confirm_password_placeholder')"
        />
      </el-form-item>
      <!-- email -->
      <el-form-item>
        <el-input v-model="registerForm.email" :placeholder="$t('register.email_placeholder')" />
      </el-form-item>
      <!-- register button -->
      <el-form-item>
        <el-button type="primary" class="glass w-full" @click="onSubmit">
          {{ $t('register.register_button') }}
        </el-button>
      </el-form-item>
      <!-- login -->
      <div>
        <span>{{ $t('register.has_account') }}</span>
        <NuxtLink :to="$localePath('/login')" class="text-primary">
          {{ $t('register.login_button') }}
        </NuxtLink>
      </div>
    </el-form>
  </div>
</template>
