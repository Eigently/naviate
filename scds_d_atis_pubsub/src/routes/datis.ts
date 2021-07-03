import { FastifyPluginAsync } from "fastify";
import { DAtis } from "../entity/DAtis";

const datis: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/:icaoCode",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            icaoCode: { type: "string", maxLength: 4, minLength: 3 },
          },
        },
      },
    },
    async function (request, reply) {
      const { params }: { params: any } = request;
      const { icaoCode }: { icaoCode: string } = params;
      return queryDatabase(icaoCode.toUpperCase());
    }
  );
};

const queryDatabase = async (icaoCode: string) => {
  const first = await DAtis.findOne({
    where: { icaoCode },
    order: { timestamp: "DESC" },
  });
  if (!first) {
    return { error: "InvalidICAOCode" };
  }

  if (first.type === "combined") {
    return {
      airport: icaoCode,
      d_atis_type: "COMBINED",
      d_atis_combined: first.body,
      d_atis_departure: null,
      d_atis_arrival: null,
    };
  }

  let departure;
  let arrival;
  if (first.type === "departure") {
    departure = first;
    arrival = await DAtis.findOne({ where: { icaoCode, type: "arrival" } });
  } else {
    departure = await DAtis.findOne({ where: { icaoCode, type: "departure" } });
    arrival = first;
  }

  return {
    airport: icaoCode,
    d_atis_type: "SEPARATED",
    d_atis_combined: null,
    d_atis_departure: departure?.body,
    d_atis_arrival: arrival?.body,
  };
};

export default datis;
