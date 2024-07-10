/**
 * File: \src\stores\modules\config.ts
 * Project: create
 * Created Date: 2024-07-09 01:12:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 23:35:38
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
            { name: "Y", Kp: 1, Ki: 0, Kd: 5, IntegralLimit: 100, TotalLimit: 100 }
        ],
        BluetoothConfig: {
            GATT: {
                remoteControlServiceUUID: 0xffe0,
                remoteInfoServiceUUID: 0x1022
            }
        },
        CommandConfig: {
            batchSize: 16,
            preprocessors: {
                coordinateOffset: {
                    x: 0,
                    y: 0
                },
                coordinateScale: {
                    x: 1,
                    y: 1
                },
                coordinateReverse: false
            },
            autosend: {
                autoSend: true,
                autoSendCheckInterval: 9000,
                autoSendHighThreshold: 32, // 自动发送高阈值，发送的最后一条指令编号减去接收端正在执行的指令编号大于等于该值时，停止发送新的batch
                autoSendLowThreshold: 16 // 自动发送低阈值，发送的最后一条指令编号减去接收端正在执行的指令编号小于该值时，开始发送新的batch
            }
        },
        PenConfig: {
            liftAngle: 91,
            dropAngle: 97
        }
    }),
    persist: true
});
