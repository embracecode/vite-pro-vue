import { ref } from 'vue'


import {
    reqRemoveRole,
    reqAllRoleList,
} from '@/api/acl/role'


import type {
    RoleResponseData,
    Records,
} from '@/api/acl/role/type'

export const useGetListRelation = () => {
    let keyword = ref('')
    let pageNo = ref(1)
    let pageSize = ref(10)
    let total = ref(0)
    let allRole = ref<Records>([])

    const getHasRole = async (pager = 1) => {
        pageNo.value = pager
        let res: RoleResponseData = await reqAllRoleList(
            pageNo.value,
            pageSize.value,
            keyword.value,
        )
        if (res.code === 200) {
            total.value = res.data.total
            allRole.value = res.data.records
        }
    }

    const search = () => {
        getHasRole()
        keyword.value = ''
    }

    const removeRole = async (id: number) => {
        let res: any = await reqRemoveRole(id)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
        }
    }
    return {
        keyword,
        pageNo,
        pageSize,
        total,
        allRole,
        getHasRole,
        search,
        removeRole,
    }
}