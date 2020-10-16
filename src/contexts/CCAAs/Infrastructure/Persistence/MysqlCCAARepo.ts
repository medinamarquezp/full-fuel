import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARepo } from "@/contexts/CCAAs/Domain/CCAARepo";
import { CCAAOrmEntity } from "./CCAAOrmEntity";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlCCAARepo implements CCAARepo
{

  constructor()
  {
    DBConnection.getInstance().addModels([CCAAOrmEntity]);
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
      return new CCAA(ccaa.externalID, ccaa.name);
    });
  }
}
