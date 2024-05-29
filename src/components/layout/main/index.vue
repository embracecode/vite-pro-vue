<template>
    <RouterView v-slot="{ Component }">
        <!-- <transition name="fade" mode="out-in"> -->
            <component :is="Component" />
        <!-- </transition> -->
    </RouterView>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-active {
    transition: all .5s ease;
}

</style>
