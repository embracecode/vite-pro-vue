<template>
    <el-card style="height: 80px">
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位的关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">
                    搜索
                </el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
        <el-button type="primary" size="default" icon="Plus" @click="addRole">
            添加职位
        </el-button>
        <el-table border style="margin: 10px 0" :data="allRole">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <template #="{ row }">
                    <el-button size="small" icon="User" @click="setPermission(row)">
                        分配权限
                    </el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">
                        编辑
                    </el-button>
                    <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper , ->, sizes, total, " :total="total"
            @current-change="getHasRole" @size-change="getHasRole" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button size="default" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="handler">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import { onMounted} from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'

import { useGetListRelation } from './hooks/useGetListRelation'
import { useSetJob } from './hooks/useSetJob'
import { useSetMenuAndBtn } from './hooks/useSetMenuAndBtn'

// 获取列表数据相关内容 操作搜索删除数据等
const {
    keyword,
    pageNo,
    pageSize,
    total,
    allRole,
    getHasRole,
    search,
    removeRole,
} = useGetListRelation()

onMounted(() => {
    getHasRole()
})


// 添加及编辑职位

const {
    dialogVisible,
    RoleParams,
    form,
    rules,
    addRole,
    updateRole,
    save
} = useSetJob(getHasRole, pageNo)



// 分配菜单和按钮权限部分

const {
    drawer,
    menuArr,
    selectArr,
    tree,
    defaultProps,
    setPermission,
    handler
 } = useSetMenuAndBtn(RoleParams, getHasRole)







// 刷新业务实现
let settingStore = useLayOutSettingStore()
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
