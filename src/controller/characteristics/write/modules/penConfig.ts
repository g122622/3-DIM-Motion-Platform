/**
 * File: \src\controller\characteristics\write\modules\pen.ts
 * Project: create
 * Created Date: 2024-07-11 00:04:54
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-11 11:55:16
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const penConfig: Characteristic = {
    serviceUUID: 0xffe0,
    characteristicUUID: 0xffe4,
    async successHandler(characteristic) {
        // 4*3 = 12 bytes
        const dataView = new DataView(new ArrayBuffer(12));

        dataView.setFloat32(0, stores.config.PenConfig.liftAngle, true);
        dataView.setFloat32(4, stores.config.PenConfig.dropAngle, true);
        dataView.setFloat32(8, stores.config.PenConfig.currentAngle, true);

        await characteristic.writeValue(dataView);
        stores.logger.log("提交笔配置成功");
        return;
    },
    errorHandler: noop,
    queryInterval: 500
};

export default penConfig;
