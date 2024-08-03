<template>
    <div class="trace-canvas">
        <canvas ref="canvas" :width="350" :height="350"></canvas>
        <!-- <a-button type="primary" @click="drawTrace">
            绘制
        </a-button> -->
    </div>
</template>

<script setup lang="ts">
import Command from '@/controller/command/types/Command';
import { stores } from '@/stores';
import { ref, onMounted, watchEffect } from 'vue';

const canvas = ref<HTMLCanvasElement>();

const paperWidthBase = 105;
const paperWidth = 2 * paperWidthBase;
const paperHeight = 3 * paperWidthBase;
const paperStartX = (350 - paperWidth) / 2;
const paperStartY = (350 - paperHeight) / 2;

onMounted(() => {
    clearTraceAndInitPaperAndCoord();
});

watchEffect(() => {
    if (canvas.value) {
        drawTrace();
    }
});

const clearTraceAndInitPaperAndCoord = () => {
    if (!canvas.value) {
        stores.logger.log('canvas 初始化失败', 'error');
        return;
    }
    const ctx = canvas.value.getContext('2d');
    if (!ctx) {
        stores.logger.log('canvas 获取 context 失败', 'error');
        return;
    }

    ctx.lineWidth = 0.7;
    ctx.fillStyle = 'rgb(230, 230, 230)';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = 'rgb(255, 251, 230)';
    // 绘制一个宽高比为2:3的矩形，用来代表纸张
    ctx.fillRect(paperStartX, paperStartY, paperWidth, paperHeight);

    // 绘制坐标系
    drawCoordinateSystem();
}

// 绘制坐标系
const drawCoordinateSystem = () => {
    if (!canvas.value) {
        return;
    }
    const ctx = canvas.value.getContext('2d');
    if (!ctx) {
        stores.logger.log('canvas 获取 context 失败', 'error');
        return;
    }

    // 绘制坐标系，在纸张边缘绘制一系列短线，长度为5像素，用来表示坐标刻度
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    for (let i = 0; i <= 14; i++) {
        const x = paperStartX + i * (paperWidth / 14);
        const y = paperStartY + paperHeight;
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x, y);
    }
    for (let i = 0; i <= 21; i++) {
        const x = paperStartX;
        const y = paperStartY + i * (paperHeight / 21);
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y);
    }
    ctx.stroke();
    ctx.closePath();

}

const drawTrace = () => {
    if (!canvas.value) {
        return;
    }
    const ctx = canvas.value.getContext('2d');
    if (!ctx) {
        stores.logger.log('canvas 获取 context 失败', 'error');
        return;
    }

    clearTraceAndInitPaperAndCoord();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    // 遍历命令列表，绘制轨迹
    stores.data.commandList.forEach(command => {
        if (command.opCode === 0 || command.opCode === 1) {
            let { x, y } = applyPreprocessorsToCommand(command);
            // 坐标量度转换
            x *= paperWidth / 140;
            y *= paperHeight / 210;
            switch (command.opCode) {
                case 0: // 快速移动
                    ctx.moveTo(paperStartX + x, paperStartY + paperHeight - y);
                    break;
                case 1: // 移动
                    ctx.lineTo(paperStartX + x, paperStartY + paperHeight - y);
                    break;
            }
        }
    })

    ctx.stroke();
    ctx.closePath();
}

const applyPreprocessorsToCommand = (command: Command) => {
    if (command.opCode === 0 || command.opCode === 1) {
        let x = command.args[0];
        let y = command.args[1];

        if (typeof x === 'number' && typeof y === 'number') {
            x += stores.config.CommandConfig.preprocessors.coordinateOffset.x;
            y += stores.config.CommandConfig.preprocessors.coordinateOffset.y;

            x *= stores.config.CommandConfig.preprocessors.coordinateScale.x;
            y *= stores.config.CommandConfig.preprocessors.coordinateScale.y;

            if (stores.config.CommandConfig.preprocessors.coordinateReverse) {
                const temp = x;
                x = y;
                y = temp;
            }

            return { x, y }
        }
    }
    return { x: 0, y: 0 }
}

</script>
