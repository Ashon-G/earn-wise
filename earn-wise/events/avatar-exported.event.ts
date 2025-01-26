import { IFrameEvent } from '../app/types';

export type AvatarExportedEventPayload = {
  url: string;
  avatarId: string;
  userId: string;
};

export type AvatarExportedEvent = IFrameEvent<AvatarExportedEventPayload>;
