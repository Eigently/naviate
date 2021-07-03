import { FastifyPluginAsync } from "fastify";
import { StatusCodes } from "http-status-codes";

import { getMostRecentDAtis, GetMostRecentDAtisError } from "../service/d_atis";

const d_atis: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/:airport",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            airport: { type: "string" },
          },
        },
      },
    },
    async function (request, reply) {
      const { params }: { params: any } = request;
      const { airport }: { airport: string } = params;
      const dAtis = await getMostRecentDAtis(airport.toLocaleUpperCase());

      if (dAtis.ok) {
        return dAtis.val;
      } else {
        const error = dAtis.val;
        switch (error) {
          case GetMostRecentDAtisError.NO_ENTRY:
            return reply.code(StatusCodes.BAD_REQUEST).send({
              code: StatusCodes.BAD_REQUEST,
              error,
              message: `No table entry for ${airport}.`,
            });
          case GetMostRecentDAtisError.ONLY_ARRIVAL:
            return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
              code: StatusCodes.INTERNAL_SERVER_ERROR,
              error,
              message: `Exclusively have arrival D-ATIS but not departure.`,
            });
          case GetMostRecentDAtisError.ONLY_DEPARTURE:
            return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
              code: StatusCodes.INTERNAL_SERVER_ERROR,
              error,
              message: `Exclusively have departure D-ATIS but not arrival.`,
            });
        }
      }
    }
  );
};

export default d_atis;
