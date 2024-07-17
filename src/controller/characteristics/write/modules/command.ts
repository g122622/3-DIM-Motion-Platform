/**
 * File: \src\controller\characteristics\write\modules\command.ts
 * Project: create
 * Created Date: 2024-07-10 00:45:18
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-17 14:30:37
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../../types/characteristic";
import { stores } from "@/stores";

const command: Characteristic = {
    serviceUUID: 0xffe0,
    characteristicUUID: 0xffe3,
    async successHandler(characteristic) {
        // 一个batch默认有16个命令，每个命令12字节，共16*12字节
        const dataView = new DataView(new ArrayBuffer(stores.config.CommandConfig.batchSize * 12));

        for (let i = 0; i < stores.data.commandToSend.length; i++) {
            const command = stores.data.commandToSend[i];
            dataView.setUint8(0 + 12 * i, command.opCode);
            dataView.setUint16(1 + 12 * i, command.commandNumber, true);
            // reserved
            dataView.setFloat32(4 + 12 * i, command.args[0] || 0, true);
            dataView.setFloat32(8 + 12 * i, command.args[1] || 0, true);
        }
        await characteristic.writeValue(dataView);
        stores.logger.log("提交任务batch成功");
        return;
    },
    errorHandler: noop,
    queryInterval: 500
};

export default command;
