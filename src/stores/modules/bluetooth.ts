/**
 * File: \src\stores\bluetooth.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 13:57:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 17:03:53
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";
import BluetoothController from "@/controller/core/bluetoothController";

export const useBluetoothStore = defineStore("Bluetooth", {
    state: () => ({
        connectedTime: 0 as number,
        connectedTimeStr: "",
        isConnected: false,
        gattServer: null as BluetoothRemoteGATTServer | null,
        bluetoothController: null as unknown as BluetoothController
    }),
});
