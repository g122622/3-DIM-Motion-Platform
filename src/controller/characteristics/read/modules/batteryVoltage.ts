/**
 * File: \src\controller\characteristics\batteryVoltage.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:31
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 13:56:41
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const batteryVoltage: Characteristic = {
    serviceUUID: stores.config.BluetoothConfig.GATT.remoteInfoServiceUUID,
    characteristicUUID: 0x1024,
    async successHandler(characteristic) {
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        stores.data.BMS.batteryVoltage = dataView.getInt32(0, true);
    },
    errorHandler: noop,
    queryInterval: 500
};

export default batteryVoltage;
