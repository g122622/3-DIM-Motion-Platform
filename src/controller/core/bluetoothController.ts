/**
 * File: \src\controller\core\bluetoothController.ts
 * Project: create
 * Created Date: 2024-07-09 02:05:17
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-31 18:24:04
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { stores } from "@/stores";
import characteristicsToRead from "../characteristics/read";
import characteristicsToWrite from "../characteristics/write";
import Characteristic from "../characteristics/types/characteristic";
import sleep from "@/utils/sleep";

class BluetoothController {
    constructor() {
        this.initAll();
    }

    private async initAll() {
        this.startBluetoothStatusScheduledQuery();
        await sleep(500);
        this.startCharacteristicsScheduledQuery();
    }

    private async startBluetoothStatusScheduledQuery() {
        setInterval(() => {
            if (stores.bluetooth.gattServer && stores.bluetooth.gattServer.connected) {
                // 更新连接状态
                stores.bluetooth.isConnected = true;
                // 更新连接时间
                if (!stores.bluetooth.connectedTime) {
                    stores.bluetooth.connectedTime = Date.now();
                }
                const diff = Math.floor((Date.now() - stores.bluetooth.connectedTime) / 1000);
                const hour = Math.floor(diff / 3600);
                let minute = String(Math.floor((diff - 3600 * hour) / 60));
                let second = String(diff % 60);
                if (minute.length === 1) minute = "0" + minute;
                if (second.length === 1) second = "0" + second;
                stores.bluetooth.connectedTimeStr = `${hour}:${minute}:${second}`;
            } else {
                stores.bluetooth.isConnected = false;
                // GATT服务器解除引用
                stores.bluetooth.gattServer = null;
                stores.bluetooth.connectedTime = 0;
            }
        }, 500);
    }

    private async startCharacteristicsScheduledQuery() {
        characteristicsToRead.forEach(async (item: Characteristic) => {
            let characteristicCache: null | BluetoothRemoteGATTCharacteristic = null;
            while (1) {
                if (stores.bluetooth.isConnected) {
                    if (characteristicCache) {
                        // 有缓存，则读取数据
                        await item.successHandler(characteristicCache);
                    } else {
                        // 若没有缓存的characteristic，则尝试获取characteristic，并更新缓存
                        const service = await stores.bluetooth.gattServer?.getPrimaryService(item.serviceUUID);
                        const characteristic = await service?.getCharacteristic(item.characteristicUUID);
                        if (characteristic) {
                            characteristicCache = characteristic;
                        } else {
                            item.errorHandler();
                        }
                    }
                }
                await sleep(item.queryInterval || 500);
            }
        });
    }

    public connectToDevice() {
        return new Promise<void>((resolve, reject) => {
            let isBleSupported = !!navigator && "bluetooth" in navigator;
            if (isBleSupported) {
                navigator.bluetooth.getAvailability().then(async () => {
                    stores.logger.log("设备和浏览器支持蓝牙");
                    // 显示蓝牙列表
                    const device = await navigator.bluetooth.requestDevice({
                        filters: [{ services: [stores.config.BluetoothConfig.GATT.remoteControlServiceUUID] }],
                        optionalServices: [stores.config.BluetoothConfig.GATT.remoteControlServiceUUID, 0x1022]
                    });
                    if (device && device.gatt) {
                        console.log("device", device);
                        stores.logger.log("设备句柄获取成功");

                        // 开始连接设备
                        const server = await device.gatt.connect();
                        stores.bluetooth.gattServer = server;
                        console.log("server", server);
                        stores.logger.log(`GATT服务器连接成功`);

                        // 添加断开连接事件
                        // device.addEventListener("gattserverdisconnected", onDisconnected);
                        // 监听characteristic
                        const service = await server.getPrimaryService(
                            stores.config.BluetoothConfig.GATT.remoteControlServiceUUID
                        );
                        console.log("service", service);
                        stores.logger.log(
                            `GATT服务 0x${stores.config.BluetoothConfig.GATT.remoteControlServiceUUID.toString(16)} 连接成功`
                        );

                        resolve();
                    } else {
                        stores.logger.log(`无法获取设备句柄`);
                        reject();
                    }
                });
            } else {
                alert("设备或浏览器不支持蓝牙");
                reject();
            }
        });
    }

    public disconnectFromDevice() {
        stores.bluetooth.gattServer?.disconnect();
        stores.logger.log("用户操作断开连接", "warning");
    }

    public async writeCharacteristic(chrIn: Characteristic) {
        if (stores.bluetooth.gattServer && stores.bluetooth.gattServer.connected) {
            // 尝试获取characteristic
            const service = await stores.bluetooth.gattServer?.getPrimaryService(chrIn.serviceUUID);
            const characteristic = await service?.getCharacteristic(chrIn.characteristicUUID);
            if (characteristic) {
                chrIn.successHandler(characteristic);
            } else {
                // 获取失败
                stores.logger.log("蓝牙chr获取失败，无法写入", "error");
            }
        } else {
            stores.logger.log("蓝牙未连接或连接异常", "error");
        }
    }

    public async submitPIDConfig() {
        await this.writeCharacteristic(characteristicsToWrite[0]);
    }

    public async submitCommand() {
        await this.writeCharacteristic(characteristicsToWrite[1]);
    }

    public async submitPenConfig() {
        await this.writeCharacteristic(characteristicsToWrite[2]);
    }
}

export default BluetoothController;
