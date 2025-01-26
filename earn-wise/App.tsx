import React, { useRef, useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useAvatarCreatorUrl } from '../../hooks/use-avatar-creator-url';
import {
  AssetUnlockedEvent,
  AvatarCreatorEvent,
  AvatarExportedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
  UserUpdatedEvent,
  UserLoggedOutEvent
} from './events';
import { Alert } from 'react-native';
import AvatarPage from './components/avatar';

const RPM_TARGET = 'readyplayerme';

// Replace with your custom subdomain
const subdomain = 'demo';

export default function App() {
  const webView = useRef<WebView | null>();
  const url = useAvatarCreatorUrl(subdomain, {});

  const [avatarId, setAvatarId] = useState<string>();

  const supportedEvents = {
    'v1.avatar.exported': onAvatarExported,
    'v1.user.set': onUserSet,
    'v1.user.authorized': onUserAuthorized,
    'v1.asset.unlock': onAssetUnlocked,
    'v1.user.updated': onUserUpdated,
    'v1.user.logout': onUserLoggedOut
  } as Record<string, any>;

  function onAvatarExported(message: AvatarExportedEvent) {
    setAvatarId(message.data.avatarId);
  }

  function onAssetUnlocked(message: AssetUnlockedEvent) {
    Alert.alert(`Asset Unlocked | Asset ID = ${message.data?.assetId}`);
  }

  function onUserAuthorized(message: UserAuthorizedEvent) {
    Alert.alert(`User Authorized | User ID = ${message.data?.id}`);
  }

  function onUserSet(message: UserSetEvent) {
    Alert.alert(`User Set | User ID = ${message.data?.id}`);
  }

  function onUserUpdated(message: UserUpdatedEvent) {
    Alert.alert(`User Updated | User ID = ${message.data?.id}`);
  }

  function onUserLoggedOut(message: UserLoggedOutEvent) {
    Alert.alert(`User Logged Out`);
  }

  function onWebViewLoaded() {
    webView.current?.postMessage(
      JSON.stringify({
        target: 'readyplayerme',
        type: 'subscribe',
        eventName: 'v1.**',
      })
    );
  }

  function onMessageReceived(message: WebViewMessageEvent) {
    try {
      const data = message.nativeEvent.data;
      const event = JSON.parse(data) as AvatarCreatorEvent;

      if (event?.source !== RPM_TARGET || !event.eventName) {
        return;
      }

      supportedEvents[event.eventName]?.(event);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  if (avatarId) {
    return <AvatarPage clearAvatar={() => setAvatarId(undefined)} avatarId={avatarId} />;
  }

  return (
    <WebView
      ref={webView} // Assign the ref correctly
      style={{ marginTop: 30 }}
      onLoad={onWebViewLoaded}
      onMessage={onMessageReceived}
      source={{ uri: url }}
    />
  );
}