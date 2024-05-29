<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_asside" :class="{ fold: LayOutSettingStore.isCollapse ? true: false }">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" :default-active="$route.path" active-text-color="#409eff"
                    text-color="#959ea6" :collapse="LayOutSettingStore.isCollapse" :router="true">
                    <Menu :menuList="useStore.menuRouter"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 右侧区域 -->
        <div class="layout_right">
            <!-- 顶部导航 -->
            <div class="layout_tabbar">
                <Tabbar></Tabbar>
            </div>
            <!-- 内容展示区域 -->
            <div class="layout_main">
                <Main></Main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/components/layout/logo.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
defineOptions({ name: 'Layout' })
const useStore = useUserStore()

const LayOutSettingStore = useLayOutSettingStore()

</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    display: flex;
    .layout_asside {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-bg;
        transition: width 0.3s;
        .scrollbar {
            height: calc(100vh - $base-logo-height);
            color: #959ea6;
        }
        &.fold {
            width: $base-menu-collapse-width;
        }
        .el-menu {
            border-right: none;
        }
    }
    .layout_right {
        flex: 1;
        .layout_tabbar {
            height: $base-header-height;
        }
        .layout_main {
            height: calc(100vh - $base-header-height);
            padding: 20px;
            box-sizing: border-box;
            overflow: auto;
        }
    }
}
.el-header {
    background-color: #fff !important;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    z-index: 999;
}
</style>