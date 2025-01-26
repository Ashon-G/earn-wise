import { IFrameEvent } from '../app/types';

export type UserUpdatedEventPayload = {
  id: string;
};

export type UserUpdatedEvent = IFrameEvent<UserUpdatedEventPayload>;
