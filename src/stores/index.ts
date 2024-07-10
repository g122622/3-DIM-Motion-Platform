/**
 * File: \src\stores\index.ts
 * Project: create
 * Created Date: 2024-07-09 00:58:21
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 17:57:25
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { createPinia } from "pinia";
import { nextTick } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { useLoggerStore } from "./modules/logger";
import { useConfigStore } from "./modules/config";
import { useBluetoothStore } from "./modules/bluetooth";
import { useDataStore } from "./modules/data";
import { useUIStore } from "./modules/UI";

interface Stores {
    logger: ReturnType<typeof useLoggerStore>;
    config: ReturnType<typeof useConfigStore>;
    bluetooth: ReturnType<typeof useBluetoothStore>;
    data: ReturnType<typeof useDataStore>;
    UI: ReturnType<typeof useUIStore>;
}

export const stores = {} as Stores;

export function initPinia() {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    nextTick(() => {
        nextTick(() => {
            stores.logger = useLoggerStore(pinia);
            stores.config = useConfigStore(pinia);
            stores.bluetooth = useBluetoothStore(pinia);
            stores.data = useDataStore(pinia);
            stores.UI = useUIStore(pinia);
        });
    });

    return pinia;
}
