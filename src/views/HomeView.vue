<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onClick = () => {
  router.push('/about')
}
</script>

<template>
  <main>
    <button @click="onClick">跳转路由/about</button>

    <div>国际化{{ $t('test') }}</div>
    home 页面
  </main>
</template>
