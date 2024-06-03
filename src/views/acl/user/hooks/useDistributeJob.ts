
import { Ref, ref } from 'vue'
import {
    reqAllRole,
    reqSetUserRole,
} from '@/api/acl/user'
import type {
    User,
    AllRole,
    SetRoleData,
    RoleData
} from '@/api/acl/user/type'
import type { CheckboxValueType } from 'element-plus';
export const useDistributeJob = (userParams: User, getHasUser:any, pageNo: Ref) => {

    let distributeJob = ref(false)

    let allRole = ref<AllRole>([])

    let userRole = ref<any>([])


    const setRole = async (row: User) => {
        
        distributeJob.value = true
        Object.assign(userParams, row)
        let res = await reqAllRole(userParams.id as number)

        if (res.code === 200) {
            allRole.value = res.data.allRolesList
            userRole.value = res.data.assignRoles
            distributeJob.value = true
        }
    }

    const checkAll = ref(false)
    const isIndeterminate = ref(true)

    const handleCheckAllChange = (val: CheckboxValueType) => {
        console.log(val, 'val');
        userRole.value = val ? allRole.value : []
        isIndeterminate.value = false
    }
    const handleCheckedUsersChange = (value: CheckboxValueType[]) => {
        console.log(value, 'value');
        const checkedCount = value.length
        checkAll.value = checkedCount === allRole.value.length
        isIndeterminate.value =
            checkedCount > 0 && checkedCount < allRole.value.length
    }

    const confirmClick = async () => {
        let data: SetRoleData = {
            userId: userParams.id as number,
            roleIdList: userRole.value.map((item: RoleData) => {
                return item.id as number
            }),
        }
    let res: any = await reqSetUserRole(data)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '分配职务成功',
            })
            distributeJob.value = false
            getHasUser(pageNo.value)
        }
    }
    return {
        distributeJob,
        allRole,
        userRole,
        setRole,
        checkAll,
        isIndeterminate,
        handleCheckAllChange,
        handleCheckedUsersChange,
        confirmClick,
    }
}