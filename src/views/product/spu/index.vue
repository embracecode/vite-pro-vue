<template>
    <div>
        spu
        <el-button>按钮</el-button>
        <CustomButton>自定义按钮</CustomButton>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { createApp } from 'vue'
const CustomButton = createApp(ElButton)

CustomButton.component('CustomButton', ElButton)


</script>



<style lang="scss" scoped>

</style>