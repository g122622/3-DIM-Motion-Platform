<template>
    <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="stores.UI.isSiderCollapsed" class="sider-trigger"
            @click="() => (stores.UI.isSiderCollapsed = !stores.UI.isSiderCollapsed)" />
        <menu-fold-outlined v-else class="sider-trigger"
            @click="() => (stores.UI.isSiderCollapsed = !stores.UI.isSiderCollapsed)" />
        <input type="file" id="file-input" accept=".gcode">
        <ConnectionManager />
    </a-layout-header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import parseCommand from "@/controller/command/parseCommand.ts";
import ConnectionManager from '@/components/ConnectionManager.vue';
import { stores } from '@/stores';

onMounted(() => {
    document.getElementById('file-input')?.addEventListener('change', function (event) {
        let file = event?.target?.files[0]; // 获取选中的文件
        if (!file) {
            alert("请选择一个文件！");
            return;
        }

        // 使用FileReader读取文件内容
        let reader = new FileReader();

        reader.onload = function (e) {
            // 文件读取成功，e.target.result即为文件内容
            let content = e.target.result;
            stores.data.commandList = [...stores.data.commandList, ...parseCommand(content as string)]
        };

        // 以文本格式读取文件
        reader.readAsText(file);
    });
})

</script>