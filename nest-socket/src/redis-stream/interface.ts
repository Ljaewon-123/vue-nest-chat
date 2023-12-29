import { RedisClient } from "ioredis/built/connectors/SentinelConnector/types";

export interface AddToStreamParams {
  fieldsToStore: any;
  streamName: string;
}

export interface ReadStreamParams {
  streamName: string;
  blockMs: number;
  lastMessageId: string;
  count?: number
}
