<template>
    <a-row style="height: 100%;">
        <a-col :span="7">
            <CommandList />
        </a-col>
        <a-col :span="11">
            <ControllPanel />
        </a-col>
        <a-col :span="6">
            <LogList />
            <SystemStatus />
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import CommandList from "@/components/CommandList.vue";
import ControllPanel from "@/components/ControllPanel.vue";
import LogList from "@/components/LogList.vue";
import SystemStatus from "@/components/SystemStatus.vue";

</script>
