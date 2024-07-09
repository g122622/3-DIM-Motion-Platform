<template>
    <a-space direction="vertical">
        <a-space>
            <a-button type="primary" @click="fillCommandList()">从总队列中填充</a-button>
            <a-input v-model:value="stores.config.CommandConfig.batchSize" aria-placeholder="任务批次大小：" suffix="条"
                style="width: 100px" />
        </a-space>
        <a-space>
            <a-button>发送缓冲区大小: {{ stores.data.commandToSend.length }}</a-button>
            <a-button type="primary" @click="clearCommandList()">手动清空发送缓冲区</a-button>
        </a-space>
    </a-space>
    <div id="list">
        <div class="list-item" v-for="(item, index) in stores.data.commandToSend" :key="item.commandNumber">
            <a-tag color="#f50"># {{ index + 1 }}</a-tag>
            <a-tag color="#2db7f5">No. {{ item.commandNumber }}</a-tag>
            <a-tag color="#2db7f5">opCode: {{ item.opCode }}</a-tag>
            <a-tag color="#2db7f5">参数: {{ item.args }}</a-tag>
            <br />
            <a-tag color="blue" style="margin-top: 10px;">{{ item.originalGcode }}</a-tag>


        </div>
    </div>
</template>

<script setup lang="ts">
import { stores } from '@/stores';

function fillCommandList() {
    if (stores.data.commandToSend.length > 0) {
        stores.logger.log("发送缓冲区已有命令，请先清空缓冲区")
        return;
    }
    const batchSize = stores.config.CommandConfig.batchSize;
    stores.data.commandToSend = stores.data.commandList.slice(0, batchSize);
    // 移除已发送的命令
    stores.data.commandList = stores.data.commandList.slice(batchSize);
    stores.logger.log(`成功从总队列中填充 ${batchSize} 条命令到发送缓冲区`);
}

const clearCommandList = () => {
    stores.data.commandToSend = [];
}
</script>

<style scoped>
#list {
    width: 100%;
    height: 500px;
    overflow-y: scroll;
}

#list .list-item {
    margin: 5px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin-left: 0;
}
</style>
