import React from 'react';
import { Modal, Image } from 'react-native';

import { styled } from '../../utils/styled';
import Button from './Button';

export default function Message({ error, visible, title, content, buttonText, onButtonPress }) {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
      <Container>
        <Box>
          {error ? (
            <StyledImage source={require('../../assets/images/error-message.png')} />
          ) : (
            <StyledImage source={require('../../assets/images/success.png')} />
          )}
          <Title error={error}>{title}</Title>
          {content && <Content>{content}</Content>}
          {buttonText && (
            <ButtonContainer>
              <Button
                ghost
                title={buttonText}
                type={error ? 'error' : 'primary'}
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
  color: ${({ error }) => (error ? '#FF2E2E' : '#ff794f')};
  font-size: 8px;
  font-weight: bold;
  margin-top: 10px;
`;

const Content = styled.Text`
  margin-top: 10px;
  font-size: 7px;
  color: #8e8e93;
`;
