import React, { type FC } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { use2dImageUrl } from '../hooks/use-2d-image-url';
import { Avatar2DConfig } from '../app/types';

interface AvatarPageProps {
  avatarId: string;
  clearAvatar: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

const avatarConf: Avatar2DConfig = {
  expression: 'happy',
  pose: 'thumbs-up',
};

const AvatarPage: FC<AvatarPageProps> = ({ avatarId, clearAvatar }) => {
  const url = use2dImageUrl(avatarId, avatarConf);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `${url}?${new Date().toISOString()}` }} />
      <Button title="Change avatar" onPress={clearAvatar} />
    </View>
  );
};

export default AvatarPage;
