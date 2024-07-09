/**
 * File: \src\stores\modules\data.ts
 * Project: create
 * Created Date: 2024-07-09 01:04:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 16:36:01
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";
import Command from "@/controller/command/types/Command";

export const useDataStore = defineStore("Data", {
    state: () => ({
        BMS: {
            batteryVoltage: -1
        },
        systemState: 0,
        realtimePos: {
            x: 0,
            y: 0,
            z: 0
        },
        commandCounter: {
            currentCommandNumber: 0,
            executedCommandCount: 0
        },
        commandList: [] as Command[],
        commandToSend: [] as Command[]
    })
});
