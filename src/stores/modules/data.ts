/**
 * File: \src\stores\modules\data.ts
 * Project: create
 * Created Date: 2024-07-09 01:04:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 01:50:20
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";

export const useDataStore = defineStore("Data", {
    state: () => ({
        BMS: {
            batteryVoltage: -1
        },
        systemState: 0
    })
});
