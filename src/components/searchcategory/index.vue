<template>
    <el-card>
        <el-form :label-width="100">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="一级分类">
                        <el-select :disabled="scene === 0 ? false : true" v-model="categoryStore.c1Id"
                            @change="handler(1)" :clearable="true">
                            <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                                :value="c1.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="二级分类">
                        <el-select :disabled="scene === 0 ? false : true" v-model="categoryStore.c2Id"
                            @change="handler(2)" :clearable="true">
                            <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                                :value="c2.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="三级分类">
                        <el-select :disabled="scene === 0 ? false : true" v-model="categoryStore.c3Id"
                            :clearable="true">
                            <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                                :value="c3.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="2">
                    <slot></slot>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="常用条件查询">
                        <el-select v-model="oftencondition" :clearable="true" @clear="clearOften" placeholder="请选择" style="width: 240px" @change="changeOften">
                            <el-option v-for="item in cities" :key="item.value" :label="item.label"
                                :value="item.value" />
                            <template #footer>
                                <el-button text bg size="small" @click="onAddOption">
                                    Add an option
                                </el-button>
                            </template>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import useCategoryStore from '@/store/modules/category'


import type { CheckboxValueType } from 'element-plus'
defineProps(['scene'])
let categoryStore = useCategoryStore()
onMounted(() => {
    getC1()
})

const getC1 = async () => {
    categoryStore.getC1()
}
const emit = defineEmits(['searchParam'])
const handler = (n: number) => {
    if (n === 1) {
        categoryStore.c2Id = ''
        categoryStore.c3Id = ''
        categoryStore.getC2()
    } else if (n === 2) {
        categoryStore.c3Id = ''
        categoryStore.getC3()
    }
}



const oftencondition = ref<CheckboxValueType[]>([])

const cities = ref([
    {
        value: '2/13/61',
        label: '手机/手机通讯/手机',
    },
    {
        value: '4/22/178',
        label: '数码/摄影摄像/数码相机',
    },
    {
        value: '6/33/285',
        label: '电脑办公/电脑整机/笔记本',
    }
])

const changeOften = (e: string) => {

    if (e) {
        const [c1, c2, c3] = e.split('/')
        emit('searchParam', [c1, c2, c3])
    }
    
    
}
const clearOften = () => {
    emit('searchParam', [])
}
const onAddOption = () => {
    ElMessage({
        message: '功能暂未完善',
        type: 'warning'
    })
    return
}
</script>

<style lang="scss" scoped></style>
