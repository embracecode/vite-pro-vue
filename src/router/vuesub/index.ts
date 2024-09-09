import type { RouteRecordRaw } from "vue-router";

export const VueSubRouter: RouteRecordRaw[] = [
    {
        path: '/vuesub',
        component: () => import('@/components/layout/index.vue'),
        name: 'Vuesub',
        meta: {
            title: '链接的子应用',
            hidden: false,
            icon: 'ChromeFilled',
        },
        redirect: '/vuesub/vuesub',
        children: [
            {
                path: 'vuesub',
                component: () => import('@/views/link/subvue/index.vue'),
                name: 'VueChild',
                meta: {
                    title: '子应用',
                    icon: 'ShoppingCart',
                    hidden: false,
                },
            }
        ],
    },
];