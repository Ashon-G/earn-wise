import { IFrameEvent } from '../app/types';

export type AssetUnlockedEventPayload = {
  userId: string;
  assetId: string;
};

export type AssetUnlockedEvent = IFrameEvent<AssetUnlockedEventPayload>;
