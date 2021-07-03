import { DAtis as DAtisEntity } from "../entity/d_atis";
import { Ok, Err, Result } from "ts-results";

export interface DAtis {
  airport: string;
  data: DAtisCombinedData | DAtisSeparatedData;
}

export interface DAtisCombinedData {
  combined: string;
}

export interface DAtisSeparatedData {
  arrival: string;
  departure: string;
}

export enum DAtisType {
  COMBINED = "combined",
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
}

export interface DAtisFlat {
  airport: string;
  type: DAtisType;
  body: string;
}

export enum GetMostRecentDAtisError {
  NO_ENTRY = "no_entry",
  ONLY_ARRIVAL = "only_arrival",
  ONLY_DEPARTURE = "only_departure",
}

const persistDAtis = async (dAtisFlat: DAtisFlat): Promise<void> => {
  const { airport, type, body } = dAtisFlat;

  const dAtis = new DAtisEntity();
  dAtis.icaoCode = airport;
  dAtis.timestamp = new Date();
  dAtis.type = type;
  dAtis.body = body;

  await dAtis.save();
};

export const saveDAtis = async (dAtisFlat: DAtisFlat): Promise<void> => {
  const { airport, type, body } = dAtisFlat;
  const lastSaved = await DAtisEntity.findOne({
    where: { icaoCode: airport, type },
    order: { timestamp: "DESC" },
  });
  if (lastSaved && lastSaved.body === body) return;

  await persistDAtis(dAtisFlat);
  if (lastSaved) await lastSaved.remove();
};

export const getMostRecentDAtis = async (
  airport: string
): Promise<Result<DAtis, GetMostRecentDAtisError>> => {
  const lastSaved = await DAtisEntity.findOne({
    where: { icaoCode: airport },
    order: { timestamp: "DESC" },
  });
  if (!lastSaved) return Err(GetMostRecentDAtisError.NO_ENTRY);

  switch (lastSaved.type) {
    case DAtisType.COMBINED:
      return Ok({ airport, data: { combined: lastSaved.body } });

    case DAtisType.ARRIVAL:
      const departure = await DAtisEntity.findOne({
        where: { icaoCode: airport, type: DAtisType.DEPARTURE },
        order: { timestamp: "DESC" },
      });
      if (!departure) return Err(GetMostRecentDAtisError.ONLY_ARRIVAL);
      return Ok({
        airport,
        data: { arrival: lastSaved.body, departure: departure.body },
      });

    case DAtisType.DEPARTURE:
    default:
      const arrival = await DAtisEntity.findOne({
        where: { icaoCode: airport, type: DAtisType.ARRIVAL },
        order: { timestamp: "DESC" },
      });
      if (!arrival) return Err(GetMostRecentDAtisError.ONLY_DEPARTURE);
      return Ok({
        airport,
        data: { arrival: arrival.body, departure: lastSaved.body },
      });
  }
};
