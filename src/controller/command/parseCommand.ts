/**
 * File: \src\controller\command\parseCommand.ts
 * Project: create
 * Created Date: 2024-07-09 16:02:05
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-17 23:54:49
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import Command from "./types/Command";
import { stores } from "@/stores";

let multiplier = 1; // 单位倍率。毫米为1，英寸为25.4

function extractGCodeParameters(gCode: string) {
    const regex = /([XYFP])(-?\d+(\.\d+)?)/g;
    let match;
    const parameters: { [key: string]: number | undefined } = {
        X: undefined,
        Y: undefined,
        F: undefined,
        P: undefined
    };

    while ((match = regex.exec(gCode)) !== null) {
        // 使用组捕获来确保正确分配值
        const axis = match[1]; // 获取轴字符(X, Y, F)
        const value = parseFloat(match[2]) * multiplier; // 获取对应的数值
        parameters[axis] = value; // 根据轴字符分配数值到相应的属性
    }

    return parameters;
}

let commandNumber = 1; // 命令编号

export default function parseCommand(strIn: string): Command[] {
    const lines = strIn.split(/\n/);
    const ret = [] as Command[];

    for (let i = 0; i < lines.length; i++) {
        // 清除行首尾空白
        const line = lines[i].trim();

        // 空行
        if (line.length === 0) {
            continue;
        }

        // 注释行
        if (line.startsWith("#") || line.startsWith(";") || line.startsWith("//")) {
            continue;
        }

        // 以空格分割
        const parts = line.split(" ");

        const opCode = parts[0]; // 命令
        let params: ReturnType<typeof extractGCodeParameters> = {};
        let shouldNumberIncrement = true; // 是否需要增加命令编号

        switch (opCode) {
            case "G0": // 快速移动
                params = extractGCodeParameters(parts[1]); // 获取参数
                ret.push({
                    opCode: 0x00,
                    args: [params["X"], params["Y"]],
                    originalGcode: line,
                    commandNumber
                });
                shouldNumberIncrement = true;
                break;

            case "G1": // 直线插值
                params = extractGCodeParameters(parts[1]); // 获取参数
                ret.push({
                    opCode: 0x01,
                    args: [params["X"], params["Y"]],
                    originalGcode: line,
                    commandNumber
                });
                shouldNumberIncrement = true;
                break;

            case "G4": // 等待
                params = extractGCodeParameters(parts[1]); // 获取参数
                ret.push({
                    opCode: 0x04,
                    args: [params["P"], undefined],
                    originalGcode: line,
                    commandNumber
                });
                shouldNumberIncrement = true;
                break;

            case "M5": // 主轴停止（抬笔）
                ret.push({
                    opCode: 0x05,
                    args: [undefined, undefined],
                    originalGcode: line,
                    commandNumber
                });
                shouldNumberIncrement = true;
                break;

            case "M3S1000.0": // 主轴启动（落笔）
                ret.push({
                    opCode: 0x03,
                    args: [undefined, undefined],
                    originalGcode: line,
                    commandNumber
                });
                shouldNumberIncrement = true;
                break;

            case "F1500": // 无效指令
                shouldNumberIncrement = false;
                break;

            case "G20": // 切换到英寸单位
                multiplier = 25.4;
                shouldNumberIncrement = false;
                break;

            case "G21": // 切换到毫米单位
                multiplier = 1;
                shouldNumberIncrement = false;
                break;

            case "G90": // 切换到绝对坐标模式
                shouldNumberIncrement = false;
                break;

            case "G91": // 切换到相对坐标模式
                shouldNumberIncrement = false;
                stores.logger.log(`不支持切换到相对坐标模式: ${line}`);
                break;

            default:
                stores.logger.log(`不支持的G代码: ${line}`);
                shouldNumberIncrement = false;
                break;
        }
        if (shouldNumberIncrement) {
            commandNumber++;
        }
    }
    return ret;
}
