/**
 * File: \src\stores\modules\config.ts
 * Project: create
 * Created Date: 2024-07-09 01:12:00
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-17 14:28:30
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
            { name: "X", Kp: 3, Ki: 0.001, Kd: 50, IntegralLimit: 10, TotalLimit: 50 },
            { name: "Y", Kp: 3, Ki: 0.001, Kd: 50, IntegralLimit: 10, TotalLimit: 50 }
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
                autoSendCheckInterval: 3500,
                autoSendHighThreshold: 32, // 自动发送高阈值，发送的最后一条指令编号减去接收端正在执行的指令编号大于等于该值时，停止发送新的batch
                autoSendLowThreshold: 16 // 自动发送低阈值，发送的最后一条指令编号减去接收端正在执行的指令编号小于该值时，开始发送新的batch
            }
        },
        PenConfig: {
            liftAngle: 91,
            dropAngle: 97,
            currentAngle: 91
        },
        autoSendDevConfig: true
    }),
    persist: true
});
