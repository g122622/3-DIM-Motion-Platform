<template>
    <a-space direction="vertical">
        <h4 style="margin-bottom: 10px; font-weight: bold">缓冲区操作:</h4>
        <a-space>
            <a-button type="primary" @click="fillCommandList()">📄从总队列中填充</a-button>
            <a-input-number v-model:value="stores.config.CommandConfig.batchSize" aria-placeholder="任务批次大小："
                addon-after="条" style="width: 100px" type="number" />
            <a-button type="primary" @click="clearCommandList()" danger>🗑︎手动清空发送缓冲区</a-button>
        </a-space>
        <a-space>
            <a-button type="primary" @click="moveToPosition()">✨️移动到坐标</a-button>
            X轴：
            <a-input-number v-model:value="moveToPositionSetting.x" aria-placeholder="X轴偏移量：" addon-after="mm"
                style="width: 100px" />
            Y轴：
            <a-input-number v-model:value="moveToPositionSetting.y" aria-placeholder="Y轴偏移量：" addon-after="mm"
                style="width: 100px" />
            <a-checkbox v-model:checked="moveToPositionSetting.pendown">落笔</a-checkbox>
        </a-space>
        <a-space>
            <a-button type="primary" danger @click="stores.bluetooth.bluetoothController.submitCommand()">
                🚀发送命令batch
            </a-button>
            <a-checkbox v-model:checked="stores.config.CommandConfig.autosend.autoSend">自动发送命令</a-checkbox>
            自动发送检查间隔：
            <a-input-number v-model:value="stores.config.CommandConfig.autosend.autoSendCheckInterval"
                aria-placeholder="自动发送检查间隔：" addon-after="ms" style="width: 100px" type="number" />
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
            XY反转预处理器：
            <a-checkbox v-model:checked="stores.config.CommandConfig.preprocessors.coordinateReverse">
                启用XY反转
            </a-checkbox>
        </a-space>
        <a-space>
            <a-button type="primary" @click="applyPreprocessors()">手动应用所有预处理器</a-button>
            <a-checkbox v-model:checked="autoApplyPreprocessors">自动应用所有预处理器</a-checkbox>
            <a-checkbox v-model:checked="autoSavePreprocessorsConfig">自动保存预处理器配置</a-checkbox>
        </a-space>

        <h4 style="margin-bottom: 10px; margin-top: 10px;font-weight: bold;">设备配置:</h4>
        <a-space>
            X轴PID参数：
            Kp
            <a-input-number v-model:value="stores.config.PIDConfig[0].Kp" aria-placeholder="Kp：" style="width: 50px"
                type="number" />
            Ki
            <a-input-number v-model:value="stores.config.PIDConfig[0].Ki" aria-placeholder="Ki：" style="width: 50px"
                type="number" />
            Kd
            <a-input-number v-model:value="stores.config.PIDConfig[0].Kd" aria-placeholder="Kd：" style="width: 50px"
                type="number" />
            积分限幅
            <a-input-number v-model:value="stores.config.PIDConfig[0].IntegralLimit" aria-placeholder="积分限幅："
                style="width: 50px" type="number" />
            总量限幅
            <a-input-number v-model:value="stores.config.PIDConfig[0].TotalLimit" aria-placeholder="总量限幅："
                style="width: 50px" type="number" />
        </a-space>
        <a-space>
            Y轴PID参数：
            Kp
            <a-input-number v-model:value="stores.config.PIDConfig[1].Kp" aria-placeholder="Kp：" style="width: 50px"
                type="number" />
            Ki
            <a-input-number v-model:value="stores.config.PIDConfig[1].Ki" aria-placeholder="Ki：" style="width: 50px"
                type="number" />
            Kd
            <a-input-number v-model:value="stores.config.PIDConfig[1].Kd" aria-placeholder="Kd：" style="width: 50px"
                type="number" />
            积分限幅
            <a-input-number v-model:value="stores.config.PIDConfig[1].IntegralLimit" aria-placeholder="积分限幅："
                style="width: 50px" type="number" />
            总量限幅
            <a-input-number v-model:value="stores.config.PIDConfig[1].TotalLimit" aria-placeholder="总量限幅："
                style="width: 50px" type="number" />
        </a-space>
        <a-space>
            <a-button type="primary" @click="">
                从设备读取PID配置
            </a-button>
            <a-button type="primary" danger @click="stores.bluetooth.bluetoothController.submitPIDConfig()">
                🚀提交PID配置
            </a-button>
            <a-checkbox v-model:checked="stores.config.autoSendDevConfig">BLE连接后自动提交所有设备配置</a-checkbox>
        </a-space>
        <a-space>
            抬笔：
            <a-input-number v-model:value="stores.config.PenConfig.liftAngle" aria-placeholder="抬笔角度：" addon-after="度"
                style="width: 100px" type="number" step="0.1" />
            落笔：
            <a-input-number v-model:value="stores.config.PenConfig.dropAngle" aria-placeholder="落笔角度：" addon-after="度"
                style="width: 100px" type="number" step="0.1" />
            当前：
            <a-input-number v-model:value="stores.config.PenConfig.currentAngle" aria-placeholder="当前角度："
                addon-after="度" style="width: 100px" type="number" step="0.1" />
            <a-button type="primary" danger @click="stores.bluetooth.bluetoothController.submitPenConfig()">
                🚀提交
            </a-button>
        </a-space>
    </a-space>
</template>

<script setup lang="ts">
import { stores } from '@/stores';
import { onMounted, reactive, ref, watch } from 'vue';

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
const moveToPosition = () => {
    clearCommandList()
    stores.data.commandToSend.push({
        opCode: moveToPositionSetting.pendown ? 1 : 0,
        args: [moveToPositionSetting.x, moveToPositionSetting.y],
        commandNumber: 0,
        originalGcode: ""
    })
    for (let i = 0; i < stores.config.CommandConfig.batchSize - 1; i++) {
        stores.data.commandToSend.push({
            opCode: 4,
            args: [0.01, 0],
            commandNumber: i + 1,
            originalGcode: ""
        })
    }
    stores.bluetooth.bluetoothController.submitCommand();
}
const moveToPositionSetting = reactive({
    x: 0,
    y: 0,
    pendown: false
})

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

                if (stores.config.CommandConfig.preprocessors.coordinateReverse) {
                    const temp = command.args[0];
                    command.args[0] = command.args[1];
                    command.args[1] = temp;
                }
            }
        }

    }
}

onMounted(() => {
    stores.config.CommandConfig.autosend.autoSend = false;

    // 自动发送命令
    setInterval(() => {
        if (stores.config.CommandConfig.autosend.autoSend) {
            clearCommandList();
            fillCommandList();
            stores.bluetooth.bluetoothController.submitCommand();
        }
    }, stores.config.CommandConfig.autosend.autoSendCheckInterval)

    // 监听蓝牙连接状态
    watch(() => stores.bluetooth.isConnected, (newVal) => {
        if (newVal && stores.config.autoSendDevConfig) {
            setTimeout(() => {
                stores.bluetooth.bluetoothController.submitPIDConfig();
                stores.bluetooth.bluetoothController.submitPenConfig();
            }, 1000);
        }
    })
})

</script>