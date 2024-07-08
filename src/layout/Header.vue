<template>
    <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="sider-trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="sider-trigger" @click="() => (collapsed = !collapsed)" />
    </a-layout-header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';

const props = defineProps<{
    collapsed: boolean
}>()


</script>