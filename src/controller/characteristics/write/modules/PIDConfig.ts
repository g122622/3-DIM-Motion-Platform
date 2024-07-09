/**
 * File: \src\controller\characteristics\write\modules\PIDConfig.ts
 * Project: create
 * Created Date: 2024-07-09 13:59:58
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 18:35:13
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const PIDConfig: Characteristic = {
    serviceUUID: 0xffe0,
    characteristicUUID: 0xffe1,
    async successHandler(characteristic) {
        // stores.config.PIDConfig.length个PID配置，每个配置含5个float数据，每个float数据4个字节
        const dataView = new DataView(new ArrayBuffer(stores.config.PIDConfig.length * 5 * 4));
        console.log(dataView.byteLength);
        for (let i = 0; i < stores.config.PIDConfig.length; i++) {
            dataView.setFloat32(0 + 20 * i, stores.config.PIDConfig[i].Kp, true);
            dataView.setFloat32(4 + 20 * i, stores.config.PIDConfig[i].Ki, true);
            dataView.setFloat32(8 + 20 * i, stores.config.PIDConfig[i].Kd, true);
            dataView.setFloat32(12 + 20 * i, stores.config.PIDConfig[i].IntegralLimit, true);
            dataView.setFloat32(16 + 20 * i, stores.config.PIDConfig[i].TotalLimit, true);
        }
        await characteristic.writeValue(dataView);
        stores.logger.log("提交PID配置成功");
        return;
    },
    errorHandler: noop,
    queryInterval: 500
};

export default PIDConfig;
