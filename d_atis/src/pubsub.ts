import {
  Connection,
  EventContext,
  ConnectionOptions,
  ReceiverOptions,
  ReceiverEvents,
} from "rhea-promise";
import { parse } from "fast-xml-parser";
import { DAtisType, saveDAtis } from "./service/d_atis";

export const startPubSub = async (): Promise<void> => {
  const connectionOptions: ConnectionOptions = {
    transport: "tls",
    host: process.env.AMQP_HOST,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
    port: parseInt(process.env.AMQP_PORT || "5671"),
    reconnect: true,
  };

  const connection = new Connection(connectionOptions);
  await connection.open();

  const receiverOptions: ReceiverOptions = {
    source: process.env.AMQP_QUEUE_NAME,
  };
  const receiver = await connection.createReceiver(receiverOptions);
  receiver.on(ReceiverEvents.message, async (context: EventContext) => {
    const body: string = context.message?.body;
    await handleMessage(body);
  });
  receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
    const receiverError = context.receiver && context.receiver.error;
    if (receiverError) console.log("error: ", receiverError);
  });
};

const handleMessage = async (messageXmlString: string) => {
  const messageObjectFull = parse(messageXmlString);
  const messageObject = messageObjectFull[Object.keys(messageObjectFull)[0]];

  const airport = messageObject.airportID.trim();
  const body = messageObject.dataBody.slice(1).trim();

  let type = DAtisType.COMBINED;
  if (body.includes("DEP INFO") && !body.includes("ARR/DEP INFO"))
    type = DAtisType.DEPARTURE;
  if (body.includes("ARR INFO") && !body.includes("DEP/ARR INFO"))
    type = DAtisType.ARRIVAL;

  await saveDAtis({ airport, type, body });
};
