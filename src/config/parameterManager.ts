require("dotenv").config();

export class ParameterManager {
  public static finalParams: any = {};

  static async initValues() {
    let finalParams: any = {};
    try {

      if (finalParams) {
        //console.log("finalParams :: ", finalParams)
        for (const key in finalParams) {
          if (!process.env[key]) process.env[key] = finalParams[key];
        }
      }
    } catch (error) {
      console.error("Errored configuration not loaded from SSM", error);
      return {};
    }
    return process.env;
  }
}
