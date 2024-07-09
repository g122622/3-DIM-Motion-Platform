<template>
    <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="sider-trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="sider-trigger" @click="() => (collapsed = !collapsed)" />
        <input type="file" id="file-input" accept=".gcode">
        <ConnectionManager />
    </a-layout-header>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import parseCommand from "@/controller/command/parseCommand.ts";
import ConnectionManager from '@/components/ConnectionManager.vue';

const props = defineProps<{
    collapsed: boolean
}>()

onMounted(() => {
    document.getElementById('file-input').addEventListener('change', function (event) {
        let file = event.target.files[0]; // 获取选中的文件
        if (!file) {
            alert("请选择一个文件！");
            return;
        }

        // 使用FileReader读取文件内容
        let reader = new FileReader();

        reader.onload = function (e) {
            // 文件读取成功，e.target.result即为文件内容
            let content = e.target.result;
            console.log(parseCommand(content));

            // 这里可以进一步处理content，比如显示在页面上等
        };

        // 以文本格式读取文件
        reader.readAsText(file);
    });
})

</script>