/**
 * File: \src\controller\characteristics\realtimePos.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:16
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 18:34:39
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const realtimePos: Characteristic = {
    serviceUUID: 0x1022,
    characteristicUUID: 0x1023,
    async successHandler(characteristic) {
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        stores.data.realtimePos.x = dataView.getFloat32(0, true);
        stores.data.realtimePos.y = dataView.getFloat32(4, true);
        stores.data.realtimePos.z = dataView.getFloat32(8, true);
    },
    errorHandler: noop,
    queryInterval: 500
};

export default realtimePos;
