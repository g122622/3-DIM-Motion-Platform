/**
 * File: \src\stores\modules\config.ts
 * Project: create
 * Created Date: 2024-07-09 01:12:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 02:19:12
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";

export const useConfigStore = defineStore("Config", {
    state: () => ({
        PIDConfig: [
            { name: "Pit", P: 1, I: 0, D: 5, max: 10 },
            { name: "Rol", P: 1, I: 0, D: 5, max: 10 },
            { name: "Yaw", P: 1, I: 0, D: 5, max: 10 },
            { name: "Gyr", P: 1, I: 0, D: 5, max: 10 },
            { name: "Thr", P: 1, I: 0, D: 5, max: 10 }
        ],
        BluetoothConfig: {
            GATT: {
                RCServiceUUID: 0xffe0
            }
        }
    })
});
