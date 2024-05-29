import { ref, nextTick, reactive } from "vue"
import type {  Attr, AttrValue } from '@/api/product/attr/type'
import type { CategoryState } from "@/store/modules/type/type"
import { reqAddOrUpdateAttr } from "@/api/product/attr"
// 修改数据相关
export const useModifyData = (categoryStore: CategoryState, getAttr: any) => {
    let attrParams = reactive<Attr>({
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3,
    })

    let inputArr = ref<any>([])
    let scene = ref(0)

    const cancel = () => {
        scene.value = 0
    }
    const addAttr = () => {
        Object.assign(attrParams, {
            attrName: '',
            attrValueList: [],
            categoryId: categoryStore.c3Id,
            categoryLevel: 3,
        })
        scene.value = 1
    }

    const updateAttr = (row: Attr) => {
        scene.value = 1
        Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
    }
    const addAttrValue = () => {
        attrParams.attrValueList.push({
            valueName: '',
            flag: true,
        })
        nextTick(() => {
            inputArr.value[attrParams.attrValueList.length - 1].focus()
        })
    }

    const save = async () => {
        let res: any = await reqAddOrUpdateAttr(attrParams)
        if (res.code === 200) {
            scene.value = 0
            ElMessage({
                type: 'success',
                message: attrParams.id ? '修改成功' : '添加成功',
            })
            getAttr()
        } else {
            ElMessage({
                type: 'error',
                message: attrParams.id ? '修改失败' : '添加失败',
            })
        }
    }

    const toLook = (row: AttrValue, $index: number) => {
        if (row.valueName.trim() === '') {
            attrParams.attrValueList.splice($index, 1)
            ElMessage({
                type: 'error',
                message: '属性值不能为空',
            })
            return
        }
        let repeat = attrParams.attrValueList.find((item) => {
            if (item !== row) {
                return item.valueName === row.valueName
            }
        })
        if (repeat) {
            attrParams.attrValueList.splice($index, 1)
            ElMessage({
                type: 'error',
                message: '属性值不能重复',
            })
            return
        }
        row.flag = false
    }
    const toEdit = (row: AttrValue, $index: number) => {
        row.flag = true
        nextTick(() => {
            inputArr.value[$index].focus()
        })
    }

    return {
        attrParams,
        addAttr,
        updateAttr,
        addAttrValue,
        save,
        toLook,
        toEdit,
        cancel,
        inputArr,
        scene
    }
}