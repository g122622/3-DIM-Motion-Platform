<template>
    <a-layout-sider v-model:collapsed="stores.UI.isSiderCollapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <user-outlined />
                <span>nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <video-camera-outlined />
                <span>nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <upload-outlined />
                <span>nav 3</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';
import { stores } from '@/stores';
import { ref } from 'vue';

const selectedKeys = ref<string[]>(['1']);

</script>