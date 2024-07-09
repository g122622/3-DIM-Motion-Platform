/**
 * File: \src\controller\characteristics\write\modules\command.ts
 * Project: create
 * Created Date: 2024-07-10 00:45:18
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 01:07:59
 * Modified By:
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
    characteristicUUID: 0xffe3,
    async successHandler(characteristic) {
        // 一个batch默认有16个命令，每个命令16字节，共16*16=256字节
        const dataView = new DataView(new ArrayBuffer(stores.config.CommandConfig.batchSize * 16));

        for (let i = 0; i < stores.data.commandToSend.length; i++) {
            const command = stores.data.commandToSend[i];
            dataView.setUint8(0 + 16 * i, command.opCode);
            dataView.setUint16(1 + 16 * i, command.commandNumber, true);
            dataView.setFloat32(4 + 16 * i, command.args[0] || 0, true);
            dataView.setFloat32(8 + 16 * i, command.args[1] || 0, true);
            dataView.setFloat32(12 + 16 * i, command.args[2] || 0, true);
        }
        await characteristic.writeValue(dataView);
        stores.logger.log("提交任务batch成功");
        return;
    },
    errorHandler: noop,
    queryInterval: 500
};

export default PIDConfig;
