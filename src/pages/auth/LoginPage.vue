<script setup lang="ts">
import type { LoginReqDto } from '@/core/dtos'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Icon } from '@iconify/vue'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const isLoading = ref(false)

const form = reactive<LoginReqDto>({
  Email: 'homework@eva.guru',
  Password: 'Homeworkeva1**',
  GrantType: 'password',
  Scope: 'amazon_data',
  ClientId: 'C0001',
  ClientSecret: 'SECRET0001',
  RedirectUri: 'https://api.eva.guru'
})

const onSubmit = async (): Promise<void> => {
  isLoading.value = true
  try {
    const res = await authStore.login(form)
    await router.push('/overview')
  } catch (err: any) {
    toast.error(err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex md:min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="@/assets/img/logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div class="mt-2">
            <input
              v-model="form.Email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="form.Password"
              id="password"
              name="password"
              type="password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center items-center gap-2 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            <Icon v-if="isLoading" icon="eos-icons:loading" height="24"></Icon>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
