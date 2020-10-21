import { plainToClass } from "class-transformer";
import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";

const CCAAListPlainObject = [
  {
    "ccaaID": "01",
    "name": "Andalucia"
  },
  {
    "ccaaID": "02",
    "name": "Aragón"
  },
  {
    "ccaaID": "03",
    "name": "Asturias"
  },
  {
    "ccaaID": "04",
    "name": "Baleares"
  },
  {
    "ccaaID": "05",
    "name": "Canarias"
  },
  {
    "ccaaID": "06",
    "name": "Cantabria"
  },
  {
    "ccaaID": "07",
    "name": "Castilla la Mancha"
  },
  {
    "ccaaID": "08",
    "name": "Castilla y León"
  },
  {
    "ccaaID": "09",
    "name": "Cataluña"
  },
  {
    "ccaaID": "10",
    "name": "Comunidad Valenciana"
  },
  {
    "ccaaID": "11",
    "name": "Extremadura"
  },
  {
    "ccaaID": "12",
    "name": "Galicia"
  },
  {
    "ccaaID": "13",
    "name": "Madrid"
  },
  {
    "ccaaID": "14",
    "name": "Murcia"
  },
  {
    "ccaaID": "15",
    "name": "Navarra"
  },
  {
    "ccaaID": "16",
    "name": "País Vasco"
  },
  {
    "ccaaID": "17",
    "name": "Rioja (La)"
  },
  {
    "ccaaID": "18",
    "name": "Ceuta"
  },
  {
    "ccaaID": "19",
    "name": "Melilla"
  }
]

export const CCAAListMock = plainToClass(CCAA, CCAAListPlainObject);
