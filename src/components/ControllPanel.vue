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
            <a-input-number v-model:value="stores.config.CommandConfig.preprocessors.coordinateOffset.x"
                aria-placeholder="X轴偏移量：" addon-after="mm" style="width: 100px" />
            Y轴：
            <a-input-number v-model:value="stores.config.CommandConfig.preprocessors.coordinateOffset.y"
                aria-placeholder="Y轴偏移量：" addon-after="mm" style="width: 100px" />
        </a-space>
        <a-space>
            坐标缩放预处理器：
            X轴：
            <a-input-number v-model:value="stores.config.CommandConfig.preprocessors.coordinateScale.x"
                aria-placeholder="X轴缩放：" addon-after="倍" style="width: 100px" />
            Y轴：
            <a-input-number v-model:value="stores.config.CommandConfig.preprocessors.coordinateScale.y"
                aria-placeholder="Y轴缩放：" addon-after="倍" style="width: 100px" />
        </a-space>
        <a-space>
            <a-button type="primary" @click="applyPreprocessors()">手动应用所有预处理器</a-button>
            <a-checkbox v-model:checked="autoApplyPreprocessors">自动应用所有预处理器</a-checkbox>
        </a-space>
        <a-space>
            <a-checkbox v-model:checked="autoSavePreprocessorsConfig">自动保存预处理器配置</a-checkbox>
        </a-space>

        <h4 style="margin-bottom: 10px; margin-top: 10px;font-weight: bold">系统状态:</h4>
        <a-space>
            实时坐标：
            X轴：
            <a-tag color="#2db7f5">X= {{ stores.data.realtimePos.x.toFixed(3) }}</a-tag>
            Y轴：
            <a-tag color="#2db7f5">Y= {{ stores.data.realtimePos.y.toFixed(3) }}</a-tag>
            Z轴（落笔）：
            <a-tag color="#2db7f5">Y= {{ stores.data.realtimePos.z.toFixed(3) }}</a-tag>
        </a-space>
        <a-space>
            电源电压：
            <a-tag color="#2db7f5">{{ stores.data.BMS.batteryVoltage.toFixed(3) }}V</a-tag>
        </a-space>
        <a-space>
            当前执行指令编号：
            <a-tag color="#2db7f5">{{ stores.data.commandCounter.currentCommandNumber }}</a-tag>
        </a-space>
        <a-space>
            累计执行指令数量：
            <a-tag color="#2db7f5">{{ stores.data.commandCounter.executedCommandCount }}</a-tag>
        </a-space>
    </a-space>
</template>

<script setup lang="ts">
import { stores } from '@/stores';
import { ref } from 'vue';

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
const autoSavePreprocessorsConfig = true;

const applyPreprocessors = () => {
    const commands = stores.data.commandToSend;
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (command.opCode === 0 || command.opCode === 1) {
            if (typeof command.args[0] === 'number' && typeof command.args[1] === 'number') {
                command.args[0] += stores.config.CommandConfig.preprocessors.coordinateOffset.x;
                command.args[1] += stores.config.CommandConfig.preprocessors.coordinateOffset.y;

                command.args[0] *= stores.config.CommandConfig.preprocessors.coordinateScale.x;
                command.args[1] *= stores.config.CommandConfig.preprocessors.coordinateScale.y;
            }
        }

    }
}

</script>