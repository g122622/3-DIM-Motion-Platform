<template>
    <a-row style="height: 100%;">
        <a-col :span="8">
            <CommandList />
        </a-col>
        <a-col :span="10">col</a-col>
        <a-col :span="6">col</a-col>
    </a-row>
</template>

<script setup lang="ts">
import CommandList from "@/components/CommandList.vue";
</script>
