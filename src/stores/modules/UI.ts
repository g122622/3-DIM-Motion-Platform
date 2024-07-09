/**
 * File: \src\stores\modules\UI.ts
 * Project: create
 * Created Date: 2024-07-09 22:07:36
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 22:11:12
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { defineStore } from "pinia";

export const useUIStore = defineStore("UI", {
    state: () => ({
        isSiderCollapsed: false
    })
});
