<template>
    <el-card style="height: 80px">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword.length ? false : true" @click="search">
                    搜索
                </el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin: 10px 0">
        <el-button type="primary" size="default" @click="addUser">
            添加用户
        </el-button>
        <el-button type="danger" size="default" :disabled="selectIdArr.length ? false : true" @click="deleteSelectUser">
            批量删除
        </el-button>
        <el-table style="margin: 10px 0" border :data="userArr" @selection-change="selectChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="id" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button size="small" icon="User" @click="setRole(row)">
                        分配角色
                    </el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">
                        编辑
                    </el-button>
                    <el-popconfirm :title="`你确定删除${row.username}`" width="260px" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper, -> , sizes, total" :total="total"
            @current-change="getHasUser" @size-change="getHasUser" />
    </el-card>


    <!-- 更改用户信息 -->
    <el-drawer v-model="upUserInfo">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>

    <!-- 分配用户职位 -->
    <el-drawer v-model="distributeJob">
        <template #header>
            <h4>分配角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedUsersChange">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :value="role">
                            {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="distributeJob = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import useLayOutSettingStore from '@/store/modules/setting'


import { useGetListRelation } from './hooks/useGetListRelation'

import { useModifyUserInfo } from './hooks/useModifyUserInfo'

import { useDistributeJob } from './hooks/useDistributeJob' 
// 使用获取列表数据及操作列表数据
const {
    pageNo,
    pageSize,
    total,
    userArr,
    getHasUser,
    keyword,
    selectIdArr,
    selectChange,
    deleteUser,
    deleteSelectUser,
    search
} = useGetListRelation()

// 使用修改用户信息相关内容
const {
    upUserInfo,
    userParams,
    formRef,
    addUser,
    updateUser,
    save,
    cancel,
    rules
} = useModifyUserInfo(getHasUser)

// 分配职位逻辑
const { 
    distributeJob,
    allRole,
    userRole,
    setRole,
    checkAll,
    isIndeterminate,
    handleCheckAllChange,
    handleCheckedUsersChange,
    confirmClick,
} = useDistributeJob(userParams, getHasUser, pageNo)


onMounted(() => {
    getHasUser()
})


// 刷新功能实现
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
