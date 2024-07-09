<template>
    <a-row style="height: 100%;">
        <a-col :span="8">
            <CommandList />
        </a-col>
        <a-col :span="10">
            <ControllPanel />
        </a-col>
        <a-col :span="6">
            <LogList />
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import CommandList from "@/components/CommandList.vue";
import ControllPanel from "@/components/ControllPanel.vue";
import LogList from "@/components/LogList.vue";
</script>
