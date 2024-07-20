<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const onClickLogout = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    await router.push('/login')
  } catch (err: any) {
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <header class="flex items-center justify-between py-3 px-8 border-b mb-3">
    <img src="@/assets/img/logo.png" alt="logo" class="w-[50px]" />
    <button
      @click="onClickLogout()"
      :disabled="isLoading"
      class="p-3 ml-auto text-red-500 transition duration-300 rounded hover:bg-neutral-200"
    >
      <Icon :icon="isLoading ? 'eos-icons:loading' : 'streamline:logout-1'" height="20"></Icon>
    </button>
  </header>
</template>

<style lang="scss" scoped></style>
