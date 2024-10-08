import React from "react";
import { Image } from "react-native";
import { styled, px2dp } from "../utils/styled";

export default function BottomRightBackground({
  source,
  width = 100,
  height = 100,
}) {
  return <BackgroundImage source={source} width={width} height={height} />;
}

const BackgroundImage = styled(Image)`
  position: absolute;
  width: ${({ width }) => px2dp(width)}px;
  height: ${({ height }) => px2dp(height)}px;
  right: 0;
  bottom: 0;
`;
