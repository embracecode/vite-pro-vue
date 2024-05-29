<script setup lang="ts">
// import container from '@/components/layout/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
// import {
//   Check,
//   Delete,
//   Edit,
//   Message,
//   Search,
//   Star,
// } from '@element-plus/icons-vue'
// import SvgIcon from '@/components/svgicon/index.vue'

</script>

<template>
    <ElConfigProvider :locale="zhCn">
        <RouterView></RouterView>
    </ElConfigProvider>
</template>

<style lang="scss" scoped>
    .testscss {
        color: $color-primary;
    }
</style>
