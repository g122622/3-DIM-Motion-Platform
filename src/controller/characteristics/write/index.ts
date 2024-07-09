/**
 * File: \src\controller\characteristics\write\index.ts
 * Project: create
 * Created Date: 2024-07-09 13:58:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-07-09 14:31:16
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import Characteristic from "../types/characteristic";

import PIDConfig from "./modules/PIDConfig";

const characteristics: Array<Characteristic> = [PIDConfig];

export default characteristics;
