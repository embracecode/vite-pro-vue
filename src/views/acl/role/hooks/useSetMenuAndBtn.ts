import { ref } from 'vue'

import {
    reqAllMenuList,
    reqSetPermission,
} from '@/api/acl/role'
import type {
    RoleData,
    MenuList
} from '@/api/acl/role/type'
import { ElTree } from 'element-plus'

type ElTreeType = InstanceType<typeof ElTree>
export const useSetMenuAndBtn = (RoleParams: RoleData, getHasRole: Function) => {
    let drawer = ref(false)

    let menuArr = ref<MenuList>([])

    let selectArr = ref<number[]>([])

    let tree = ref<ElTreeType>()
    const setPermission = async (row: RoleData) => {
        drawer.value = true
        Object.assign(RoleParams, row)
        let res = await reqAllMenuList(RoleParams.id as number)
        if (res.code === 200) {
            menuArr.value = res.data
            selectArr.value = filterSelectArr(menuArr.value, [])
        }
    }

    const defaultProps = {
        children: 'children',
        label: 'name',
    }

    const filterSelectArr = (allData: any, initArr: any) => {
        allData.forEach((item: any) => {
            if (item.select && item.level === 4) {
                initArr.push(item.id)
            }
            if (item.children && item.children.length > 0) {
                filterSelectArr(item.children, initArr)
            }
        })
        return initArr
    }

    const handler = async () => {
        const roleId = RoleParams.id as number
        let arr = (tree.value as ElTreeType).getCheckedKeys()
        let arr1 = (tree.value as ElTreeType).getHalfCheckedKeys()
        let permissionId: (number | string)[] = arr.concat(arr1)
        let res = await reqSetPermission(roleId, permissionId)
        
        if (res.code === 200) {
            drawer.value = false
            ElMessage({
                type: 'success',
                message: '分配权限成功',
            })
            getHasRole()
        }
    }

    return {
        drawer,
        menuArr,
        selectArr,
        tree,
        defaultProps,
        setPermission,
        handler
    }
}