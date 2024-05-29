
import { reqAttr, reqRemoveAttr } from '@/api/product/attr'
import { ref } from 'vue'
import useCategoryStore from '@/store/modules/category'


import type { AttrResponseData, Attr } from '@/api/product/attr/type'



export const useGetAttrData = () => {
    let oftencondition: Array<number | string> = []
    const categoryStore = useCategoryStore()
    let attrArr = ref<Attr[]>([])
    
    const searchParam = (value: number[] | string[]) => {
        oftencondition = value
    }
    const searchData = () => {
        if (categoryStore.c3Id || oftencondition.length > 0) {
            categoryStore.c3Id ? getAttr() : getAttr(oftencondition)
        } else {
            ElMessage({
                message: '请选择三种类别',
                type: 'warning',
            })
        }
    }
    const getAttr = (param?: Array<number | string>) => {
    
        if (param) {
            const [c1Id, c2Id, c3Id] = param
            getData(c1Id, c2Id, c3Id)
        } else {
            const { c1Id, c2Id, c3Id } = categoryStore
            getData(c1Id, c2Id, c3Id)
        }
    }
    type strornum = string | number
    const getData = async (c1Id: strornum, c2Id: strornum, c3Id: strornum) => {
        let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
        if (res.code === 200) {
            attrArr.value = res.data
        }
    }

    const deleteAttr = async (attrId: number) => {
        let res: any = await reqRemoveAttr(attrId)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getAttr()
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败',
            })
        }
    }

    return {
        searchParam,
        searchData,
        deleteAttr,
        getAttr,
        categoryStore,
        attrArr,
        
    }
}