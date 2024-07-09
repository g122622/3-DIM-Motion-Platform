<template>
    <a-layout>
        <Sider />
        <a-layout>
            <Header />
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <MainContent />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import Header from "@/layout/Header.vue";
import Sider from "@/layout/Sider.vue";
import MainContent from "@/layout/MainContent.vue";

</script>

<style>
.sider-trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.sider-trigger:hover {
    color: #1890ff;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.ant-layout-sider {
    min-height: 100vh;
}
</style>
