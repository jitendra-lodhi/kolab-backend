require("dotenv").config();

import { ParameterManager } from "./config/parameterManager";

(async () => {
  await ParameterManager.initValues();
  require("./server");
})();
