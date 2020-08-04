import React from 'react';
import { Image, Modal } from 'react-native';
import { Video } from 'expo-av';
import ImageViewer from 'react-native-image-zoom-viewer';

import * as FileSystem from 'expo-file-system';
import { styled, px2dp } from '../../utils/styled';
import { useBoolState } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  return (
    <StyledVideo
      source={{ uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{ width: px2dp(272), height: px2dp(136) }}
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
      <Modal visible={visible}>
        <ImageViewer renderIndicator={() => {}} onClick={closeModal} imageUrls={[{ url: uri }]} />
      </Modal>
    </>
  );
}

const StyledVideo = styled(Video)`
  width: 272px;
  height: 136px;
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
