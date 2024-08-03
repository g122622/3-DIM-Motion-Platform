/**
 * File: \src\controller\command\types\Command.ts
 * Project: create
 * Created Date: 2024-07-09 15:02:55
 * Author: Guoyi
 * -----
 * Last Modified: 2024-08-03 15:40:42
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

interface Command {
    opCode: number;
    args: [number | undefined, number | undefined]; // 2 arguments
    commandNumber: number; // command number
}

export default Command;
