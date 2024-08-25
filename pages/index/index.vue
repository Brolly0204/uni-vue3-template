<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
        <uni-card title="基础卡片" extra="额外信息">
            <text>这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
        </uni-card>

        <uni-badge :text="count + ''">
            <button type="default" @click="btnClick">右下 {{ count }}</button>
        </uni-badge>
    </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { request } from '@/utils/request'

const title = ref<string>('uni-app')
const counter = useCounterStore()
const btnClick = () => {
    counter.increment()
}

const count = computed(() => counter.count)
interface BannerInfo {
    id: string
    type: string
    imgUrl: string
    hrefUrl: string
}

interface BannerParams {
    flag: string
}

type BannerList = BannerInfo[]
const getHomeBanner = async (data: BannerParams): Promise<API.BaseResponse<BannerList>> => {
    return request({
        url: '/home/banner',
        method: 'GET',
        data,
    })
}

onMounted(() => {
    getHomeBanner({ flag: 'abc' }).then((res) => {
        console.log('home', res, res.result)
    })
})
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
