/**
 * File: \src\stores\modules\config.ts
 * Project: create
 * Created Date: 2024-07-09 01:12:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 14:05:51
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
            { name: "X", Kp: 1, Ki: 0, Kd: 5, IntegralLimit: 100, TotalLimit: 100 },
            { name: "Y", Kp: 1, Ki: 0, Kd: 5, IntegralLimit: 100, TotalLimit: 100 },
        ],
        BluetoothConfig: {
            GATT: {
                remoteControlServiceUUID: 0xffe0,
                remoteInfoServiceUUID: 0x1022,
            }
        }
    })
});
