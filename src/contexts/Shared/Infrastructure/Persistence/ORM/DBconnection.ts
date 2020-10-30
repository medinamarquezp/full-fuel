import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";
export class DBConnection
{
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  private static options: SequelizeOptions = {
    database: process.env.MYSQL_DATABASE || "",
    username: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    host: process.env.MYSQL_HOST || "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  };

  private static dbConection: Sequelize | null = null;
  public static getInstance(): Sequelize
  {
    if(this.dbConection === null) {
      try
      {
        this.dbConection = new Sequelize(this.options);
        this.log.info("Database connected!");
        return this.dbConection;
      } catch (err)
      {
        const error = `Error on creating a MYSQL DB connection: ${err}`;
        this.log.error(error);
        throw new Error(error);
      }
    }
    return this.dbConection;
  }

  public static async closeConnection(): Promise<void>
  {
    if (this.dbConection) await this.dbConection.close();
  }

}
