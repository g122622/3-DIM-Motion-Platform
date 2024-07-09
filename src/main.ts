import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import { createApp, nextTick } from "vue";
import "@/styles/globalStyles.css";
import App from "@/App.vue";
import { initPinia } from "./stores";
import sleep from "@/utils/sleep";
import BluetoothController from "@/controller/core/bluetoothController";

import { stores } from "@/stores";

class Application {
    async initVue() {
        const pinia = await initPinia();
        createApp(App).use(pinia).use(Antd).mount("#app");
    }

    initEvents() {
        window.addEventListener("error", function (event) {
            stores.logger.log(event.error.stack, "error");
        });
    }

    async initAll() {
        this.initVue();
        this.initEvents();
        await sleep(500);
        stores.bluetooth.bluetoothController = new BluetoothController();
        await nextTick();
        stores.logger.log("初始化全部成功", "warning");
        stores.logger.log("目前仍在测试，功能不稳定", "error");
    }

    constructor() {
        this.initAll();
    }
}

(function () {
    new Application();
})();
