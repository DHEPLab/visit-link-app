import React, { useState } from "react";
import { Image, Modal } from "react-native";
import { Video, ResizeMode, VideoFullscreenUpdate } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";

import { px2dp, styled } from "../../utils/styled";
import { useBoolState } from "../../utils";
import { Config } from "../../constants";

export default function CurriculumMedia({ value }) {
  let uri =
    value.mode === "REVIEW"
      ? `${Config.apiHost}/api/files${value.file}`
      : `${FileSystem.documentDirectory}${value.file}`;
  return (
    <Container>
      {value.type === "VIDEO" ? (
        <VideoMedia uri={uri} />
      ) : (
        <PictureMedia uri={uri} />
      )}
      <Title>{value.text}</Title>
    </Container>
  );
}

function VideoMedia({ uri }) {
  const [inFullscreen, switchToLandscape, switchToPortrait] = useBoolState();
  // Use state to resolve unnecessary calculations when the screen direction changes
  const [width] = useState(px2dp(272));
  const [height] = useState(px2dp(170));

  return (
    <StyledVideo
      source={{ uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      useNativeControls
      resizeMode={inFullscreen ? ResizeMode.CONTAIN : ResizeMode.COVER}
      style={{ width, height }}
      onFullscreenUpdate={async ({ fullscreenUpdate }) => {
        switch (fullscreenUpdate) {
          case VideoFullscreenUpdate.PLAYER_DID_PRESENT:
            switchToLandscape();
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
            );
            break;
          case VideoFullscreenUpdate.PLAYER_DID_DISMISS:
            switchToPortrait();
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP,
            );
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
        <StyledImage
          source={{ uri }}
          resizeMode="contain"
          onError={({ nativeEvent: { error } }) => {
            console.error("image load error：", error);
          }}
        />
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
        <ImageViewer
          renderIndicator={() => {}}
          onClick={closeModal}
          imageUrls={[{ url: uri }]}
        />
      </Modal>
    </>
  );
}

const StyledVideo = styled(Video)`
  border-radius: 4px;
`;

const StyledImage = styled(Image)`
  width: 272px;
  height: 170px;
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
