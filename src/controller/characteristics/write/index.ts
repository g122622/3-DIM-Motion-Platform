/**
 * File: \src\controller\characteristics\write\index.ts
 * Project: create
 * Created Date: 2024-07-09 13:58:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-10 01:07:59
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import Characteristic from "../types/characteristic";

import PIDConfig from "./modules/PIDConfig";
import command from "./modules/command";

const characteristics: Array<Characteristic> = [PIDConfig, command];

export default characteristics;
