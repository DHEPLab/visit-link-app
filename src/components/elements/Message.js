import React from "react";
import { Modal, Image } from "react-native";

import { styled } from "../../utils/styled";
import Button from "./Button";

/**
 * A component that displays a message with optional error and informational content, and a button for user actions.
 *
 * @param {Object} props - The properties passed to the Message component.
 * @param {boolean} [props.error] - If true, the message is displayed as an error (optional).
 * @param {boolean} [props.info] - If true, the message is displayed as informational (optional).
 * @param {boolean} [props.visible] - If true, the message is visible. If false, it is hidden (optional).
 * @param {string} [props.title] - The title of the message (optional).
 * @param {string} [props.content] - The main content or body of the message (optional).
 * @param {string} [props.buttonText] - The text to be displayed on the action button (optional).
 * @param {() => void} [props.onButtonPress] - The function to be called when the action button is pressed (optional).
 *
 * @returns {JSX.Element} A component that displays a message with optional styling and an action button.
 */
export default function Message({
  error,
  info,
  visible,
  title,
  content,
  buttonText,
  onButtonPress,
}) {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
      <Container>
        <Box>
          {info && (
            <StyledImage
              source={require("../../assets/images/info-message.png")}
            />
          )}
          {!info &&
            (error ? (
              <StyledImage
                source={require("../../assets/images/error-message.png")}
              />
            ) : (
              <StyledImage
                source={require("../../assets/images/success.png")}
              />
            ))}
          <Title error={error}>{title}</Title>
          {content && <Content>{content}</Content>}
          {buttonText && (
            <ButtonContainer>
              <Button
                ghost
                title={buttonText}
                type={error ? "error" : "primary"}
                onPress={onButtonPress}
              />
            </ButtonContainer>
          )}
        </Box>
      </Container>
    </Modal>
  );
}

const ButtonContainer = styled.View`
  margin-top: 10px;
`;

const StyledImage = styled(Image)`
  width: 32px;
  height: 32px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
`;

const Box = styled.View`
  width: 180px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ error }) => (error ? "#FF2E2E" : "#ff794f")};
  font-size: 8px;
  font-weight: bold;
  margin-top: 10px;
`;

const Content = styled.Text`
  margin-top: 10px;
  font-size: 7px;
  color: #8e8e93;
`;
