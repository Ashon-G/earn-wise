import { IFrameEvent } from '../app/types';

export type UserSetEventPayload = {
  id: string;
};

export type UserSetEvent = IFrameEvent<UserSetEventPayload>;
