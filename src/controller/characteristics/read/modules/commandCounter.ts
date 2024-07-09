/**
 * File: \src\controller\characteristics\modules\commandCounter.ts
 * Project: create
 * Created Date: 2024-07-09 13:44:39
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 18:34:35
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const commandCounter: Characteristic = {
    serviceUUID: 0x1022,
    characteristicUUID: 0x1025,
    async successHandler(characteristic) {
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        stores.data.commandCounter.currentCommandNumber = dataView.getInt32(0, true);
        stores.data.commandCounter.executedCommandCount = dataView.getInt32(4, true);
    },
    errorHandler: noop,
    queryInterval: 500
};

export default commandCounter;
