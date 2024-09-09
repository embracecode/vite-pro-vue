
import SvgIcon from '@/components/svgicon/index.vue'
import SearchCategory from '@/components/searchcategory/index.vue'
import type { App, Component } from 'vue'

type componentType = {
    [props: string] :Component
}
// 需要全局挂在的组件
const components: componentType = {
    SvgIcon,
    SearchCategory
}

// 需要引入的icon组件 配置给路由标题
import {
    HomeFilled, Platform, Lock, User, Avatar, List, 
    Goods, 
    ShoppingCart, 
    Management, 
    SetUp, 
    ScaleToOriginal, 
    Expand,
    Fold,
    CopyDocument,
    Tickets,
    DataBoard,
    Rank,
    Edit,
    Plus,
    Delete,
    ChromeFilled
} from '@element-plus/icons-vue'
 
const icons: componentType= {
    HomeFilled,
    Platform,
    Lock,
    User,
    Avatar,
    List, 
    Goods, 
    ShoppingCart, 
    Management, 
    SetUp, 
    ScaleToOriginal, 
    Expand,
    Fold,
    CopyDocument,
    Tickets,
    DataBoard,
    Rank,
    Edit,
    Plus,
    Delete,
    ChromeFilled
}
console.log(icons);

export default {
    install(app: App) {
        Object.keys(components).forEach(key => {
            
            app.component(key, components[key])
        })
        for (const [key, com] of Object.entries(icons)) {
            app.component(key, com)
        }
    }
}