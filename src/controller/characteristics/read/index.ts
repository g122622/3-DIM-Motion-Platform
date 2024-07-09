/**
 * File: \src\controller\characteristics\index.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:31:43
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 13:56:41
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import Characteristic from "../types/characteristic";

import realtimePos from "./modules/realtimePos";
import batteryVoltage from "./modules/batteryVoltage";
import commandCounter from "./modules/commandCounter";

const characteristics: Array<Characteristic> = [realtimePos, batteryVoltage, commandCounter];

export default characteristics;
