<template>
    <svg :style="style">
        <use :href="href" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
    prefix?: string
    height?: number | string
    width?: number | string
    color?: string
    name: string
}

const props = withDefaults(defineProps<Props>(), {
    prefix: '#icon-',
    height: 20,
    width: 20,
    color: '',
    name: ''
})

const style = computed(() => {
    return {
        height: `${props.height}px`,
        width: `${props.width}px`
    }
})
const href = computed(() => {
    return `${props.prefix}${props.name}`
})
</script>
<!-- <script lang="ts">
export default {
    name: 'SvgIcon'
}
</script> -->
<style lang="scss" scoped>

</style>
