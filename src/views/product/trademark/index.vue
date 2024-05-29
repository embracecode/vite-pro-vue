<template>
    <el-card class="box-card">
        <!-- 添加品牌 -->
        <el-button type="primary" size="default" :icon="Plus" @click="addTradeMark" v-has="`btn.Trademark.add`">
            添加品牌
        </el-button>
        <el-table style="margin: 10px 0" border :data="tradeMarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row }">
                    <img :src="row.logoUrl" alt="图片丢失了~" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row }">
                    <el-button type="primary" size="small" :icon="Edit" @click="updateTradeMark(row)"></el-button>
                    <el-popconfirm :title="`您确定删除${row.tmName}`" width="250px" icon="delete"
                        @confirm="removeTradeMark(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" :icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- pagination -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
            @current-change="getHasTradeMark" @size-change="sizeChange" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
        <el-form style="width: 90%" :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted,  } from 'vue'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'

import { useGetListRelation } from './hooks/useGetListRelation'
import { useTrademarkModify } from './hooks/useTrademarkModify'
// 获取列表数据及删除数据相关
const { pageNo,
    limit,
    total,
    tradeMarkArr,
    getHasTradeMark,
    sizeChange,
    removeTradeMark
} = useGetListRelation()

onMounted(() => {
    getHasTradeMark()
})

// 关于添加品牌和修改品牌的相关

const { dialogFormVisible,
    trademarkParams,
    rules,
    formRef,
    handleAvatarSuccess,
    beforeAvatarUpload,
    cancel,
    confirm,
    updateTradeMark,
    addTradeMark
} = useTrademarkModify(getHasTradeMark, pageNo)


</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
