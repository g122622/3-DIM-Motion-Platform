/**
 * File: \src\stores\logger.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 15:11:11
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 17:03:40
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";

interface logItem {
    level: "debug" | "info" | "warning" | "error" | "fatal";
    message: string;
    timeStamp: number;
}

export const useLoggerStore = defineStore("Logger", {
    state: () => ({
        logList: [] as logItem[]
    }),
    actions: {
        log(message: string, level: logItem["level"] = "info") {
            this.logList.unshift({ message, level, timeStamp: Date.now() });
        }
    },
});
