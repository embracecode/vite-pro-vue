<template>
    <div class="logo">
        <img v-if="!setting.logoHidden" :src="setting.logo">

        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
defineOptions({ name: 'Logo' })
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-logo-height;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
    p {
        color: #fff;
        font-size: 20px;
        margin-left: 10px;
        white-space: nowrap;
    }
}
</style>
