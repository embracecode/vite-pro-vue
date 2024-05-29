
import { defineStore } from "pinia";


const useLayOutSettingStore = defineStore('globlesetting', () => {


    return {
        isCollapse: false,
        refsh: false,
    }
})

export default useLayOutSettingStore