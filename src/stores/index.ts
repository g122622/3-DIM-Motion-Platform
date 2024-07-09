/**
 * File: \src\stores\index.ts
 * Project: create
 * Created Date: 2024-07-09 00:58:21
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 18:17:53
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { createPinia } from "pinia";

import { useLoggerStore } from "./modules/logger";
import { useConfigStore } from "./modules/config";
import { useBluetoothStore } from "./modules/bluetooth";
import { useDataStore } from "./modules/data";

interface Stores {
    logger: ReturnType<typeof useLoggerStore>;
    config: ReturnType<typeof useConfigStore>;
    bluetooth: ReturnType<typeof useBluetoothStore>;
    data: ReturnType<typeof useDataStore>;
}

export const stores = {} as Stores;

export function initPinia() {
    const pinia = createPinia();

    stores.logger = useLoggerStore(pinia);
    stores.config = useConfigStore(pinia);
    stores.bluetooth = useBluetoothStore(pinia);
    stores.data = useDataStore(pinia);

    return pinia;
}
