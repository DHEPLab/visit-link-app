import React, { useState } from 'react';
import { Image } from 'react-native';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';

import { styled, px2dp } from '../../utils/styled';
import { useBoolState } from '../../utils';
import AutoHideStatusBarModal from '../elements/AutoHideStatusBarModal';

export default function CurriculumMedia({ value }) {
  return (
    <Container>
      {value.type === 'VIDEO' ? (
        <VideoMedia uri={`${FileSystem.documentDirectory}${value.file}`} />
      ) : (
        <PictureMedia uri={`${FileSystem.documentDirectory}${value.file}`} />
      )}
      <Title>{value.text}</Title>
    </Container>
  );
}

function VideoMedia({ uri }) {
  const [inFullscreen, switchToLandscape, switchToPortrait] = useBoolState();
  // Use state to resolve unnecessary calculations when the screen direction changes
  const [width] = useState(px2dp(272));
  const [height] = useState(px2dp(136));

  return (
    <StyledVideo
      source={{ uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      useNativeControls
      resizeMode={inFullscreen ? Video.RESIZE_MODE_CONTAIN : Video.RESIZE_MODE_COVER}
      style={{ width, height }}
      onFullscreenUpdate={async ({ fullscreenUpdate }) => {
        switch (fullscreenUpdate) {
          case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            switchToLandscape();
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            break;
          case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
            switchToPortrait();
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            break;
        }
      }}
    />
  );
}

function PictureMedia({ uri }) {
  const [visible, openModal, closeModal] = useBoolState();
  return (
    <>
      <TouchableOpacity onPress={openModal} activeOpacity={0.8}>
        <StyledImage source={{ uri }} />
      </TouchableOpacity>
      <AutoHideStatusBarModal visible={visible}>
        <ImageViewer renderIndicator={() => {}} onClick={closeModal} imageUrls={[{ url: uri }]} />
      </AutoHideStatusBarModal>
    </>
  );
}

const StyledVideo = styled(Video)`
  border-radius: 4px;
`;

const StyledImage = styled(Image)`
  width: 272px;
  height: 136px;
  border-radius: 4px;
`;

const Title = styled.Text`
  color: #ff794f;
  font-size: 10px;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
`;

const Container = styled.View`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  border-width: 2px;
  border-color: #ffede2;
`;
