/* eslint-disable no-console */
import path from "path";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm";
import { ParameterManager } from "../../config/parameterManager";
import {
  Users,
 
} from "../entities";

// Export of dataSource instance is required to run migration
export class DatabaseInitialization {
  public static dataSource: DataSource;
  public static AppDataSource: DataSource;

  static async dataSourceInstance() {
    this.AppDataSource = new DataSource(await getConfig());

    return this.AppDataSource;
  }

  static async dbCreateConnection() {
    try {
      if (!this.AppDataSource) {
        await this.dataSourceInstance();
      }

      // Check if datasource in already initialized
      if (!this.dataSource) {
        this.dataSource = await this.AppDataSource.initialize();
        console.log("---connection created-----");
      }

      // return datasource
      return this.dataSource;
    } catch (err: any) {
      console.log(err);
    }
    return null;
  }
}

export default DatabaseInitialization.dataSourceInstance();

async function getConfig() {
  const vars = await ParameterManager.initValues();
  return {
    type: "postgres",
    name: "default",
    host: vars["DB_HOST"],
    port: vars["DB_PORT"],
    username: vars["DB_USER"],
    password: vars["DB_PWD"],
    database: vars["DB_NAME"],
    synchronize: false,
    logging: true,
    entities: [
      Users,
    ],
    migrations: [path.join(__dirname, "../migrations", "*.{js,ts}")],
    migrationsTableName: "migration_table",
    subscribers: [],
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  } as DataSourceOptions;
}
