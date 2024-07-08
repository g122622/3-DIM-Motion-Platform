/**
 * File: \src\controller\submitPWMConfig.ts
 * Project: rc-frontend
 * Created Date: 2024-04-18 16:25:01
 * Author: Guoyi
 * -----
 * Last Modified: 2024-05-02 17:04:34
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import { useLoggerStore } from "../stores/logger";
import config from "../config";

export async function submitPWMConfig() {
    const quadcopterDetails = useQuadcopterDetailsStore();
    const logger = useLoggerStore();

    if (quadcopterDetails.gattServer && quadcopterDetails.gattServer.connected) {
        // 尝试获取characteristic
        const service = await quadcopterDetails.gattServer?.getPrimaryService(config.remoteControllServiceUUID);
        const characteristic = await service?.getCharacteristic(0xffe3);
        if (characteristic) {
            const dataView = new DataView(new ArrayBuffer(6 * 4)); // 含2+4个float数据，每个float数据4个字节

            dataView.setFloat32(0, quadcopterDetails.PWMConfig.basic, true);
            dataView.setFloat32(4, quadcopterDetails.PWMConfig.PID_Mult, true);
            dataView.setFloat32(8, quadcopterDetails.PWMConfig.PWM1_Mult, true);
            dataView.setFloat32(12, quadcopterDetails.PWMConfig.PWM2_Mult, true);
            dataView.setFloat32(16, quadcopterDetails.PWMConfig.PWM3_Mult, true);
            dataView.setFloat32(20, quadcopterDetails.PWMConfig.PWM4_Mult, true);

            await characteristic.writeValue(dataView);
            logger.log("提交PWM配置成功");
            return;
        } else {
            // 获取失败
            logger.log("蓝牙chr获取失败", "error");
        }
    } else {
        logger.log("蓝牙未连接或连接异常", "error");
    }
}
