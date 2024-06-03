

import { ref, reactive, nextTick } from 'vue'


import { reqAddOrUpdateUser } from '@/api/acl/user'
import type { User } from '@/api/acl/user/type'
export const useModifyUserInfo = (getHasUser: Function) => {

    let upUserInfo = ref(false)
    let userParams = reactive<User>({
        username: '',
        name: '',
        password: '',
    })
    let formRef = ref<any>()


    const addUser = () => {
        upUserInfo.value = true
        Object.assign(userParams, {
            id: 0,
            username: '',
            name: '',
            password: '',
        })
        nextTick(() => {
            formRef.value.clearValidate('username')
            formRef.value.clearValidate('name')
            formRef.value.clearValidate('password')
        })
    }
    const updateUser = (row: User) => {
        upUserInfo.value = true
        Object.assign(userParams, row)
        nextTick(() => {
            formRef.value.clearValidate('username')
            formRef.value.clearValidate('name')
        })
    }


    
    const save = async () => {
        formRef.value.validate()
        let res: any = await reqAddOrUpdateUser(userParams)
        if (res.code === 200) {
            upUserInfo.value = false
            ElMessage({
                type: 'success',
                message: userParams.id ? '更新成功' : '添加成功',
            })
            getHasUser()
        } else {
            upUserInfo.value = false
            ElMessage({
                type: 'error',
                message: userParams.id ? '更新失败' : '添加失败',
            })
        }
    }

    const cancel = () => {
        upUserInfo.value = false
    }

    const rules = {
        username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
        name: [{ required: true, trigger: 'blur', validator: validatorName }],
        password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
    }

    return {
        upUserInfo,
        userParams,
        formRef,
        addUser,
        updateUser,
        save,
        cancel,
        rules
    }


}


const validatorUserName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}

const validatorName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少五位'))
    }
}

const validatorPassword = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}