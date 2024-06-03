
import { ref } from 'vue'

import {
    reqUserInfo,
    reqRemoveUser,
    reqSelectUser,
} from '@/api/acl/user'

import type {
    UserResponseData,
    Records,
    User,
} from '@/api/acl/user/type'

export const useGetListRelation = () => {
    let pageNo = ref(1)

    let pageSize = ref(5)

    let total = ref(0)

    let userArr = ref<Records>([])
    let keyword = ref('')
    let selectIdArr = ref<User[]>([])


    // 获取用户列表
    const getHasUser = async (pager = 1) => {
        pageNo.value = pager
        let res: UserResponseData = await reqUserInfo(
            pageNo.value,
            pageSize.value,
            keyword.value,
        )
        if (res.code === 200) {
            total.value = res.data.total
            userArr.value = res.data.records
        }
    }

    const selectChange = (value: any) => {
        selectIdArr.value = value
    }

    // 删除用户
    const deleteUser = async (userId: number) => {
        let res: any = await reqRemoveUser(userId)
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '删除成功' })
            getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
        }
    }
    // 批量删除用户
    const deleteSelectUser = async () => {
        let idList: any = selectIdArr.value.map((item) => {
            return item.id
        })
        let res: any = await reqSelectUser(idList)
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '删除成功' })
            getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
        }
    }

    const search = () => {
        getHasUser()
        keyword.value = ''
    }
    return {
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
    }
}