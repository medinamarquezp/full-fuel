import { FuelStationOrmEntity } from "./FuelStationOrmEntity";
import { FuelPriceOrmEntity } from "@/contexts/FuelPrices/Infrastructure/Persistence/FuelPriceOrmEntity";
import { TimetablesOrmEntity } from "@/contexts/Timetables/Infrastructure/Persistence/TimetablesOrmEntity";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo, Criteria } from "@/contexts/FuelStations/Domain/FuelStationRepo";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlFuelStationRepo implements FuelStationRepo {

  constructor()
  {
    DBConnection.getInstance().addModels([FuelStationOrmEntity, TimetablesOrmEntity, FuelPriceOrmEntity]);
  }

  async save(fuelstations: FuelStation[]): Promise<void> {
    try {
      await DBConnection.getInstance().sync({force: true});
      const serializedData = Serializer.classToObject<FuelStation[]>(fuelstations);

      await FuelStationOrmEntity.bulkCreate(serializedData, {
        updateOnDuplicate: ["isAlwaysOpen", "timetable", "bestDay", "bestMoment", "brandImage", "updatedAt"]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(fuelstation: FuelStation): Promise<void> {
    try {
      const serializedData = Serializer.classToObject<FuelStation>(fuelstation);
      await FuelStationOrmEntity.upsert(serializedData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<FuelStation[]>{
    let fuelStations: FuelStation[] = [];

    try {
      const queryResult = await FuelStationOrmEntity.findAll({order: [["id", "ASC"]], raw: true});
      fuelStations = this.serializeRepoToEntity(queryResult);
    } catch (error) {
      throw new Error(error);
    }
    return fuelStations;
  }

  async findByCriteria(criteria: Criteria): Promise<FuelStation[]>{
    let fuelStations: FuelStation[] = [];

    try {
      const queryResult = await FuelStationOrmEntity.findAll({where: {...criteria}, order: [["id", "ASC"]], raw: true});
      fuelStations = this.serializeRepoToEntity(queryResult);
    } catch (error) {
      throw new Error(error);
    }
    return fuelStations;
  }

  async findByID(fuelstationID: number): Promise<FuelStation> {
    let fuelStation: FuelStation | undefined;

    try {
      const queryResult = await FuelStationOrmEntity.findOne({where: {fuelstationID}, raw: true});
       if (queryResult) fuelStation = new FuelStation({...queryResult});
    } catch (error) {
      throw new Error(error);
    }
    return fuelStation as FuelStation;
  }

  private serializeRepoToEntity(queryResult: FuelStationOrmEntity[])
  {
    return queryResult.map(fuelStation =>
    {
      return new FuelStation({...fuelStation});
    });
  }
}
