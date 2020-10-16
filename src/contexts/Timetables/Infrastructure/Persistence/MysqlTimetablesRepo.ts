import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { TimetablesRepo } from "@/contexts/Timetables/Domain/TimetablesRepo";
import { TimetablesOrmEntity } from "./TimetablesOrmEntity";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlTimetablesRepo implements TimetablesRepo
{

  constructor()
  {
    DBConnection.getInstance().addModels([TimetablesOrmEntity]);
  }
  public async save(timetables: Timetables[]): Promise<void>
  {
    const serializedData = Serializer.classToObject<Timetables[]>(timetables);

    try
    {
      await TimetablesOrmEntity.destroy({ where: {}, truncate: true });

      await TimetablesOrmEntity.bulkCreate(serializedData);
    } catch (error)
    {
      throw new Error(error);
    }
  }
  public async getAll(): Promise<Timetables[]>
  {
    try
    {
      const queryResult = await TimetablesOrmEntity.findAll();
      const serializedResult = this.serializeRepoToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  public async getByFuelstationID(fuelstationID: number): Promise<Timetables[]>
  {
    try
    {
      const queryResult = await TimetablesOrmEntity.findAll({
        where: {
          fuelstationID
        }
      });
      const serializedResult = this.serializeRepoToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  private serializeRepoToEntity(queryResult: TimetablesOrmEntity[])
  {
    return queryResult.map(timetables =>
    {
      const { fuelstationID, weekDay, alwaysOpen, opening, closing } = timetables;
      return new Timetables({ fuelstationID, weekDay, alwaysOpen, opening, closing });
    });
  }
}
