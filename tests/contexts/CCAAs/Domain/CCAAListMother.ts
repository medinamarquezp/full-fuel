import { plainToClass } from "class-transformer";
import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";

const CCAAListPlainObject = [
  {
    "externalID": "01",
    "name": "Andalucia"
  },
  {
    "externalID": "02",
    "name": "Aragón"
  },
  {
    "externalID": "03",
    "name": "Asturias"
  },
  {
    "externalID": "04",
    "name": "Baleares"
  },
  {
    "externalID": "05",
    "name": "Canarias"
  },
  {
    "externalID": "06",
    "name": "Cantabria"
  },
  {
    "externalID": "07",
    "name": "Castilla la Mancha"
  },
  {
    "externalID": "08",
    "name": "Castilla y León"
  },
  {
    "externalID": "09",
    "name": "Cataluña"
  },
  {
    "externalID": "10",
    "name": "Comunidad Valenciana"
  },
  {
    "externalID": "11",
    "name": "Extremadura"
  },
  {
    "externalID": "12",
    "name": "Galicia"
  },
  {
    "externalID": "13",
    "name": "Madrid"
  },
  {
    "externalID": "14",
    "name": "Murcia"
  },
  {
    "externalID": "15",
    "name": "Navarra"
  },
  {
    "externalID": "16",
    "name": "País Vasco"
  },
  {
    "externalID": "17",
    "name": "Rioja (La)"
  },
  {
    "externalID": "18",
    "name": "Ceuta"
  },
  {
    "externalID": "19",
    "name": "Melilla"
  }
]

export const CCAAListMother = plainToClass(CCAA, CCAAListPlainObject);
