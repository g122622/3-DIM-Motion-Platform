<template>
    <a-space direction="vertical">
        <h4 style="margin-bottom: 10px; margin-top: 10px;font-weight: bold">系统状态:</h4>
        <a-space>
            实时坐标：
            X轴：
            <a-tag color="#2db7f5">X= {{ stores.data.realtimePos.x.toFixed(3) }}</a-tag>
            Y轴：
            <a-tag color="#2db7f5">Y= {{ stores.data.realtimePos.y.toFixed(3) }}</a-tag>
        </a-space>
        <a-space>
            Z轴/笔尖状态：
            <a-tag color="#2db7f5">Z= {{ stores.data.realtimePos.z.toFixed(3) }}</a-tag>
        </a-space>
        <a-space>
            电源电压：
            <a-tag color="#2db7f5">{{ stores.data.BMS.batteryVoltage.toFixed(3) }}V</a-tag>
        </a-space>
        <a-space>
            当前执行指令编号：
            <a-tag color="#2db7f5">{{ stores.data.commandCounter.currentCommandNumber }}</a-tag>
            累计执行指令数量：
            <a-tag color="#2db7f5">{{ stores.data.commandCounter.executedCommandCount }}</a-tag>
        </a-space>
    </a-space>
</template>

<script setup lang="ts">
import { stores } from '@/stores';

</script>
