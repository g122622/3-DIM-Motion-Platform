/**
 * File: \src\controller\characteristics\motionData.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:16
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 02:38:01
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../types/characteristic";
import config from "@/config";

const motionData: Characteristic = {
    serviceUUID: config.remoteInfoServiceUUID,
    characteristicUUID: 0x1023,
    async successHandler(characteristic) {
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        bluetooth.basicMotionData.ax = dataView.getFloat32(0, true);
        bluetooth.basicMotionData.ay = dataView.getFloat32(4, true);
        bluetooth.basicMotionData.az = dataView.getFloat32(8, true);
        bluetooth.basicMotionData.gx = dataView.getFloat32(12, true);
        bluetooth.basicMotionData.gy = dataView.getFloat32(16, true);
        bluetooth.basicMotionData.gz = dataView.getFloat32(20, true);
        bluetooth.basicMotionData.pitch = dataView.getFloat32(24, true);
        bluetooth.basicMotionData.roll = dataView.getFloat32(28, true);
    },
    errorHandler: noop,
    queryInterval: 100
};

export default motionData;
