
import { nextTick, reactive, ref } from "vue"

import type { TradeMark } from "@/api/product/trademark/type"
import { reqAddOrUpdateTrademark } from "@/api/product/trademark"
import { FormRules, UploadProps } from "element-plus"
import type { Ref } from "vue"
// 品牌操作相关
export const useTrademarkModify = ( getHasTradeMark: any, pageNo: Ref  ) => {
    
    let dialogFormVisible = ref(false)
    let formRef = ref()
    let trademarkParams = reactive<TradeMark>({
        tmName: '',
        logoUrl: '',
    })

    const addTradeMark = () => {
        dialogFormVisible.value = true
        trademarkParams.id = 0
        trademarkParams.tmName = ''
        trademarkParams.logoUrl = ''

        nextTick(() => {
            formRef.value.clearValidate('tmName')
            formRef.value.clearValidate('logoUrl')
        })
    }

    const updateTradeMark = (row: TradeMark) => {
        nextTick(() => {
            formRef.value.clearValidate('tmName')
            formRef.value.clearValidate('logoUrl')
        })
        dialogFormVisible.value = true
        Object.assign(trademarkParams, row)
    }

    const cancel = () => {
        dialogFormVisible.value = false
    }

    const confirm = async () => {
        await formRef.value.validate()

        let res = await reqAddOrUpdateTrademark(trademarkParams)
        if (res.code === 200) {
            dialogFormVisible.value = false
            ElMessage({
                type: 'success',
                message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
            })
            getHasTradeMark(trademarkParams.id ? pageNo.value : 1)
        } else {
            ElMessage({
                type: 'error',
                message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
            })
        }
    }

    // 上传图片前回调验证
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (
            rawFile.type === 'image/png' ||
            rawFile.type === 'image/jpeg' ||
            rawFile.type === 'image/gif'
        ) {
            if (rawFile.size / 1024 / 1024 < 4) {
                return true
            } else {
                ElMessage({
                    type: 'error',
                    message: '上传的文件大小应小于4M',
                })
            }
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件类型必须是PNG|JPG|GIF',
            })
            return false
        }
    }


    // 上传成功回调
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        _uploadFile,
    ) => {
        trademarkParams.logoUrl = response.data
        formRef.value.clearValidate('logoUrl')
    }


    // 验证规则
    const validatorTmName = (_rule: any, value: any, callBack: any) => {
        if (value.trim().length >= 2) {
            callBack()
        } else {
            callBack(new Error('品牌名称位数大于等于两位'))
        }
    }

    const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
        if (value) {
            callBack()
        } else {
            callBack(new Error('Logo的图片务必上传'))
        }
    }
    type FormData = { tmName: string, logoUrl: string }
    const rules: FormRules<FormData> = {
        tmName: [
            {
                required: true,
                trigger: 'blur',
                validator: validatorTmName,
            },
        ],
        logoUrl: [
            {
                required: true,
                trigger: 'change',
                validator: validatorLogoUrl,
            },
        ],
    }
    return {
        dialogFormVisible,
        formRef,
        trademarkParams,
        addTradeMark,
        updateTradeMark,
        cancel,
        confirm,
        handleAvatarSuccess,
        beforeAvatarUpload,
        rules
    }

}