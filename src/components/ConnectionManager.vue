<template>
    <div id="connection-mgr-container">
        <a-space>
            <a-button type="primary" @click="reload()">🔃重启页面</a-button>
            <a-button type="primary" @click="toggleFullScreen()">🖥️切换全屏</a-button>
            <a-button type="primary" @click="handleStartFlight()">🚀开始运行</a-button>
            <a-button type="primary" @click="">⛔停止运行</a-button>

            <a-button type="primary" @click="stores.bluetooth.bluetoothController.connectToDevice()"
                v-if="!stores.bluetooth.isConnected">
                <div class="innerText">📡连接无人机</div>

            </a-button>
            <a-button type="primary" @click="stores.bluetooth.bluetoothController.disconnectFromDevice()" v-else
                class="innerText">
                <div class="innerText">🔗已连接，{{ stores.bluetooth.connectedTimeStr }}</div>
            </a-button>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { stores } from '@/stores';

const markerColor = computed(() => {
    return stores.bluetooth.isConnected ? 'rgb(146, 212, 47)' : 'rgb(229, 108, 59)'
})

/**
 * 检查当前是否已经全屏显示，如果没有则请求全屏显示，如果已经全屏显示则退出全屏显示。
 * 可以在需要全屏显示的按钮或事件中调用这个函数来实现网页全屏显示。
 */
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const handleStartFlight = async () => {

}

const reload = () => {
    window.location.reload()
}

</script>



<style scoped>
#connection-mgr-container {
    float: right;
    margin-right: 20px;
}

.innerText {
    display: list-item;
    margin-left: 10px;
}

.innerText::marker {
    content: '•  ';
    font-weight: 900;
    color: v-bind('markerColor');
}
</style>
