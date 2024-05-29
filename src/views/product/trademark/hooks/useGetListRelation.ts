import { ref } from "vue";

// 获取列表相关内容提取
import type {
    Records,
    TradeMarkResponseData,
} from '@/api/product/trademark/type'
import {
    reqHasTradeMark,
    reqDeleteTrademark,
} from '@/api/product/trademark'
export const useGetListRelation = () => {
    let pageNo = ref(1)
    let limit = ref(3)
    let total = ref(0)
    let tradeMarkArr = ref<Records>([])

    const getHasTradeMark = async (pager = 1) => {
        pageNo.value = pager
        let res: TradeMarkResponseData = await reqHasTradeMark(
            pageNo.value,
            limit.value,
        )
        if (res.code === 200) {
            total.value = res.data.total
            tradeMarkArr.value = res.data.records
        }
    }
    const sizeChange = () => {
        getHasTradeMark()
    }

    
    const removeTradeMark = async (id: number) => {
        let res = await reqDeleteTrademark(id)

        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除品牌成功',
            })
            //再次获取已有的品牌数据
            getHasTradeMark(
                tradeMarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
            )
        } else {
            ElMessage({
                type: 'error',
                message: '删除品牌失败',
            })
        }
    }
    return {
        pageNo,
        limit,
        total,
        tradeMarkArr,
        getHasTradeMark,
        sizeChange,
        removeTradeMark
    };
};