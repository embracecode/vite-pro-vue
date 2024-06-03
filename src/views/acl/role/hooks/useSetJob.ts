
import { Ref, reactive, ref, nextTick } from 'vue'

import { reqAddOrUpdateRole } from '@/api/acl/role'
import { RoleData } from '@/api/acl/role/type'
import type {  FormInstance } from 'element-plus'
export const useSetJob = ( getHasRole:Function, pageNo: Ref ) => {

    let dialogVisible = ref(false)

    let RoleParams = reactive<RoleData>({
        roleName: '',
    })
    let form = ref<FormInstance>()

    
    const addRole = () => {
        dialogVisible.value = true
        Object.assign(RoleParams, {
            roleName: '',
            id: 0,
        })
        nextTick(() => {
            (form.value as FormInstance).clearValidate('roleName')
        })
    }

    const updateRole = (row: RoleData) => {
        dialogVisible.value = true
        Object.assign(RoleParams, row)
        nextTick(() => {
            (form.value as FormInstance).clearValidate('roleName')
        })
    }

    const validateRoleName = (_rule: any, value: any, callBack: any) => {
        if (value.trim().length >= 2) {
            callBack()
        } else {
            callBack(new Error('职位名称至少两位'))
        }
    }

    const rules = {
        roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }],
    }

    const save = async () => {
        await (form.value as FormInstance).validate()
        let res: any = await reqAddOrUpdateRole(RoleParams)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: RoleParams.id ? '更新成功' : '添加成功',
            })
            dialogVisible.value = false
            getHasRole(RoleParams.id ? pageNo.value : 1)
        }
    }


    return {
        dialogVisible,
        RoleParams,
        form,
        rules,
        addRole,
        updateRole,
        save
    }
}