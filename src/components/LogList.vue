<template>
    <div id="log-list-container" class="dashboard-item" ref="listContainer">
        <h4 style="margin-bottom: 10px; font-weight: bold">日志区:</h4>
        <a-space direction="vertical">
            <template v-for="(item, index) in stores.logger.logList" :key="item.timeStamp + item.message + item.level">
                <a-space>
                    <a-alert
                        :message="`#${stores.logger.logList.length - index} [${(new Date(item.timeStamp)).toLocaleTimeString()}] ${item.message}`"
                        :type="item.level" show-icon closable>
                    </a-alert>
                </a-space>
            </template>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import { stores } from '@/stores'

</script>

<style scoped>
#log-list-container {
    height: 570px;
    overflow-y: scroll;
}
</style>
