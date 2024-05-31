<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入中国地图的JSON数据
import chinaJSON from './china.json'

let DataTemplate = {
    // 飞线样式
    // lineStyle: {
    //     curveness: 0.2, // 尾迹线条曲直度
    //     width: 5,
    //     color: {
    //         type: "linear",
    //         x: 0,
    //         y: 0,
    //         x2: 0,
    //         y2: 1,
    //         colorStops: [
    //             {
    //                 offset: 0.05,
    //                 color: "yellow", // 0% 处的颜色
    //             },
    //             {
    //                 offset: 0.3,
    //                 color: "red", // 0% 处的颜色
    //             },
    //             {
    //                 offset: 1,
    //                 color: "cyan", // 100% 处的颜色
    //             },
    //         ],
    //         global: false, // 缺省为 false
    //     },
    // },
    lineStyle: {
        color: '#1DE9B6',
        width: 2, // 线条宽度
        opacity: 0.1, // 尾迹线条透明度
        curveness: 0.2 // 尾迹线条曲直度
    },
    // 飞线动画效果
    // effect: {
    //     show: false,
    //     period: 10,
    //     delay: 400,
    //     trailLength: 0.6,
    //     color: "rgba(255,255,100,1)", // 流动点颜色
    //     symbol: "pin",
    //     symbolSize: 30,
    // },
    // 取消一些交互
    select: {
        disabled: false,
    },
    emphasis: {
        disabled: true,
    }
}

const cityData = [
    [[110.81, 33.40], [91.144205, 29.649484]],
    [[110.350983, 19.968035], [126.522207, 45.801617]],
    [[121.518142, 31.211845], [91.144205, 29.649484]],
    [[111.785972, 40.849642], [102.881681, 24.866897]],
    [[82.78, 43.27], [114.242011, 22.272474]],
    [[116.403694, 39.949459], [113.11, 28.40]],
    [[101.851432, 36.622494], [121.591732, 25.034634]],
]
// 创建飞线数据
const dataSeries = cityData.map((item) => {
    const data = {
        ...DataTemplate,
        coords: item,
    }
    return data
})

// 波纹点坐标
const points = [
    // 点坐标
    { value: [110.81, 33.40], itemStyle: { color: '#c1bb1f' }, name: '湖北境内', total: 0, bj: 0, yj: 0, yx: 0, tj: 0, dw: 0 },
    { value: [116.403694, 39.949459], itemStyle: { color: '#3eef1d' }, name: '北京', total: 0, bj: 0, yj: 0, yx: 0, tj: 0, dw: 0 },
    { value: [113.11, 28.40], itemStyle: { color: '#3eef1d' }, name: '湖南境内', total: 5, bj: 0, yj: 0, yx: 5, tj: 0, dw: 0 },
    { value: [106.44, 29.50], itemStyle: { color: '#3eef1d' }, name: '重庆境内', total: 10, bj: 0, yj: 0, yx: 10, tj: 0, dw: 0 },
    { value: [112.85, 38.95], itemStyle: { color: '#3eef1d' }, name: '山西境内', total: 8, bj: 0, yj: 0, yx: 8, tj: 0, dw: 0 },
    { value: [82.78, 43.27], itemStyle: { color: '#3eef1d' }, name: '新疆境内', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [126.522207, 45.801617], itemStyle: { color: '#3eef1d' }, name: '黑龙江', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [111.785972, 40.849642], itemStyle: { color: '#3eef1d' }, name: '内蒙古', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [110.350983, 19.968035], itemStyle: { color: '#3eef1d' }, name: '海南', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [114.242011, 22.272474], itemStyle: { color: '#3eef1d' }, name: '香港', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [91.144205, 29.649484], itemStyle: { color: '#3eef1d' }, name: '西藏', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [121.518142, 31.211845], itemStyle: { color: '#3eef1d' }, name: '上海', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [121.591732, 25.034634], itemStyle: { color: '#3eef1d' }, name: '台湾', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
    { value: [101.851432, 36.622494], itemStyle: { color: '#3eef1d' }, name: '青海', total: 18, bj: 0, yj: 0, yx: 18, tj: 0, dw: 0 },
]
//获取DOM元素
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)

const options: echarts.EChartOption = {
    //地图组件
    geo: {
        map: 'china', //中国地图
        roam: true, //鼠标缩放的效果
        //地图的位置调试
        left: 150,
        top: 150,
        right: 150,
        zoom: 1.2,
        bottom: 0,
        //地图上的文字的设置
        label: {
            show: true, //文字显示出来
            color: 'white',
            fontSize: 14,
        },

        itemStyle: {
            //每一个多边形的样式
            color: {
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(3,27,78,1)", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "rgba(58,149,253,1)", // 50% 处的颜色
                    },
                ],
                global: false, // 缺省为 false
            },
            opacity: 0.8,
        },
        //地图高亮的效果
        emphasis: {
            itemStyle: {
                areaColor: 'rgba(0,254,233,0.6)',
                opacity: 0.8,
            },
            label: {
                fontSize: 40,
                color: 'yellow'
            },
        },
    },
    //布局位置
    grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    series: [
        {
            type: 'lines', //航线的系列
            data: dataSeries,
            //开启动画特效
            effect: {
                show: true,
                period: 10, // 箭头指向速度，值越小速度越快
                trailLength: 0.6, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', // 箭头图标
                symbolSize: 10, // 图标大小
                color: "rgba(255,255,100,1)", // 流动点颜色
            },
            silent: true,
            // effect: {
            //     show: true,
            //     period: 10, // 箭头指向速度，值越小速度越快
            //     trailLength: 0.6, // 特效尾迹长度[0,1]值越大，尾迹越长重
            //     symbol: 'arrow', // 箭头图标
            //     symbolSize: 10, // 图标大小
            //     color: "rgba(255,255,100,1)", // 流动点颜色
            // },
        },
        {
            name: 'companyPoint',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            // zlevel: 2, // zlevel用于 Canvas 分层 相同的绘制在同一个canvas上
            rippleEffect: {
                number: 5, // 波纹数量
                period: 4, // 动画周期 数值越大，波动越慢
                scale: 3.5, // 动画中波纹的最大缩放比例
                brushType: 'stroke' // 波纹的绘制方式 stroke fill
            },
            symbol: 'circle',
            symbolSize: 16,
            data: points,
            z: 4
        },
    ],
}
onMounted(() => {
    let mychart = echarts.init(map.value)
    //设置配置项
    mychart.setOption(options)
})
</script>

<style scoped></style>
