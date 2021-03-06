import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARepo } from "@/contexts/CCAAs/Domain/CCAARepo";
import { CCAAOrmEntity } from "./CCAAOrmEntity";
import { FuelPriceOrmEntity } from "@/contexts/FuelPrices/Infrastructure/Persistence/FuelPriceOrmEntity";
import { TimetablesOrmEntity } from "@/contexts/Timetables/Infrastructure/Persistence/TimetablesOrmEntity";
import { FuelStationOrmEntity } from "@/contexts/FuelStations/Infrastructure/Persistence/FuelStationOrmEntity";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlCCAARepo implements CCAARepo
{

  constructor()
  {
    DBConnection.getInstance().addModels([CCAAOrmEntity, FuelStationOrmEntity, TimetablesOrmEntity, FuelPriceOrmEntity]);
  }
  public async save(ccaas: CCAA[]): Promise<void>
  {
    const serializedData = Serializer.classToObject<CCAA[]>(ccaas);

    try
    {
      await CCAAOrmEntity.bulkCreate(serializedData, {
        updateOnDuplicate: ["name", "updatedAt"]
      });
    } catch (error)
    {
      throw new Error(error);
    }
  }
  public async getAll(): Promise<CCAA[]>
  {
    try
    {
      const queryResult = await CCAAOrmEntity.findAll();
      const serializedResult = this.serializeRepoToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  private serializeRepoToEntity(queryResult: CCAAOrmEntity[])
  {
    return queryResult.map(ccaa =>
    {
      return new CCAA(ccaa.ccaaID, ccaa.name);
    });
  }
}
