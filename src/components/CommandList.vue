<template>
    <a-space>
        <a-button>总队列大小: {{ stores.data.commandList.length }}</a-button>
        <a-button>发送缓冲区大小: {{ stores.data.commandToSend.length }}</a-button>
    </a-space>
    <div id="list">
        <div class="list-item" v-for="(item, index) in stores.data.commandToSend" :key="item.commandNumber">
            <a-tag color="#f50"># {{ index + 1 }}</a-tag>
            <a-tag color="#2db7f5">No. {{ item.commandNumber }}</a-tag>
            <a-tag color="#2db7f5">opCode: {{ item.opCode }}</a-tag>
            <a-tag color="#2db7f5">参数: {{ item.args[0]?.toFixed(2) || 'null' }}, {{ item.args[1]?.toFixed(2) || 'null'
                }}</a-tag>
            <br />
            <a-tag color="blue" style="margin-top: 10px;">原始G代码：{{ item.originalGcode }}</a-tag>
        </div>
    </div>
</template>

<script setup lang="ts">
import { stores } from '@/stores';

</script>

<style scoped>
#list {
    width: calc(100% - 20px);
    height: 570px;
    overflow-y: scroll;
}

#list .list-item {
    margin: 5px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    margin-left: 0;
}
</style>
