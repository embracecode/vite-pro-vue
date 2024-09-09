<template>
    <div class="container">
        <WujieVue url="http://localhost:5173/" name="vue3sub" :props="subProps2">
        </WujieVue>
    </div>
</template>

<script setup lang="ts">
import { bus } from 'wujie'

window.subProps = {
    text: "主应用传给子组件的值",
    number: 100
}
let subProps2 = window.subProps
let receiverSub = {}
bus.$on('subPropsChange', (newProps: any) => {
    console.log('接收子组件传递过来的值', newProps);
    receiverSub = newProps
})



</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    background: plum;
}
</style>
