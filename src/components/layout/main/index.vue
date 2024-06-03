<template>
    <RouterView v-slot="{ Component }">
        <transition name="fade">
            <div :key="$route.path">
                <component :is="Component" v-if="flag" />
            </div>
        </transition>
    </RouterView>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'


import { watch, ref, nextTick } from 'vue'
let layOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
watch(
    () => layOutSettingStore.refsh,
    () => {
        flag.value = false
        nextTick(() => {
            flag.value = true
        })
    },
)
</script>

<style lang="scss" scoped>

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-active {
    transition: all .5s ease;
}

</style>
