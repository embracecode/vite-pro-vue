<template>
    <searchcategory :scene="scene" @search-param="searchParam">
        <el-button type="primary" @click="searchData">查询</el-button>
    </searchcategory>
    <el-card style="margin: 10px 0">
        <div v-show="scene === 0">
            <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">
                添加平台属性
            </el-button>
            <el-table border style="margin: 10px 0" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row }">
                        <el-tag style="margin: 5px" v-for="(item) in row.attrValueList" :key="item.id">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene === 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button :disabled="attrParams.attrName ? false : true" type="primary" size="default" icon="Plus"
                @click="addAttrValue">
                添加属性值
            </el-button>
            <el-button size="default" @click="cancel">取消</el-button>
            <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row, $index }">
                        <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" placeholder="请你输入属性值名称"
                            v-model="row.valueName" @blur="toLook(row, $index)"></el-input>
                        <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #="{ $index }">
                        <el-button type="danger" size="small" icon="Delete"
                            @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" size="default" @click="save"
                :disabled="attrParams.attrValueList.length > 0 ? false : true">
                保存
            </el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import searchcategory from './../../../components/searchcategory/index.vue'
import { onBeforeUnmount } from 'vue'

import { useGetAttrData } from './hooks/useGetData'

import { useModifyData } from './hooks/useModifyData';

// 使用获取数据相关hook
const {
    searchParam,
    searchData,
    deleteAttr,
    categoryStore,
    attrArr,
    getAttr
} = useGetAttrData()


// 使用操作数据相关hook
const { addAttr,
    updateAttr,
    attrParams,
    inputArr,
    toLook,
    toEdit,
    addAttrValue,
    cancel,
    save,
    scene } = useModifyData(categoryStore, getAttr)










onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style lang="scss" scoped></style>
