import { IFrameEvent } from '../app/types';

export type UserAuthorizedEventPayload = {
  id: string;
};

export type UserAuthorizedEvent = IFrameEvent<UserAuthorizedEventPayload>;
