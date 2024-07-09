<template>
    <a-space direction="vertical">
        <h4 style="margin-bottom: 10px; font-weight: bold">缓冲区操作:</h4>
        <a-space>
            <a-button type="primary" @click="fillCommandList()">从总队列中填充</a-button>
            <a-input-number v-model:value="stores.config.CommandConfig.batchSize" aria-placeholder="任务批次大小：" suffix="条"
                style="width: 100px" type="number" />
            <a-button type="primary" @click="clearCommandList()" danger>手动清空发送缓冲区</a-button>
        </a-space>
        <a-space>
            <a-button type="primary" danger @click="stores.bluetooth.bluetoothController.submitCommand()">发送命令batch
            </a-button>
        </a-space>

        <h4 style="margin-bottom: 10px; margin-top: 10px;font-weight: bold">命令预处理:</h4>
        <a-space>
            坐标偏移预处理器：
            X轴：
            <a-input-number v-model:value="preprocessors.coordinateOffset.x" aria-placeholder="X轴偏移量：" suffix="mm"
                style="width: 100px" />
            Y轴：
            <a-input-number v-model:value="preprocessors.coordinateOffset.y" aria-placeholder="Y轴偏移量：" suffix="mm"
                style="width: 100px" />
        </a-space>
        <a-space>
            <a-button type="primary" @click="applyPreprocessors()">手动应用所有预处理器</a-button>
            <a-checkbox v-model:checked="autoApplyPreprocessors">自动应用所有预处理器</a-checkbox>
        </a-space>
    </a-space>
</template>

<script setup lang="ts">
import { stores } from '@/stores';
import { ref, reactive } from 'vue';

function fillCommandList() {
    if (stores.data.commandToSend.length > 0) {
        stores.logger.log("发送缓冲区已有命令，请先清空缓冲区")
        return;
    }
    const batchSize = stores.config.CommandConfig.batchSize;
    stores.data.commandToSend = stores.data.commandList.slice(0, batchSize);
    // 移除已发送的命令
    stores.data.commandList = stores.data.commandList.slice(batchSize);
    // 应用预处理器
    if (autoApplyPreprocessors.value) {
        applyPreprocessors();
    }
    stores.logger.log(`成功从总队列中填充 ${batchSize} 条命令到发送缓冲区`);
}

const clearCommandList = () => {
    stores.data.commandToSend = [];
}

const autoApplyPreprocessors = ref(true);
const preprocessors = reactive({
    coordinateOffset: {
        x: 0,
        y: 0
    }
});

const applyPreprocessors = () => {
    const commands = stores.data.commandToSend;
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (command.opCode === 0 || command.opCode === 1) {
            if (typeof command.args[0] === 'number' && typeof command.args[1] === 'number') {
                command.args[0] += preprocessors.coordinateOffset.x;
                command.args[1] += preprocessors.coordinateOffset.y;
            }
        }

    }
}
</script>