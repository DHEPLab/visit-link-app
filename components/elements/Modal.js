import React from 'react';
import { Modal } from 'react-native';

import { styled } from '../../utils/styled';
import Button from './Button';

export default function ElementModal({
  visible,
  title,
  content,
  contentText,
  onCancel,
  onOk,
  okText,
  cancelText,
  disableOk,
}) {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
      <Container>
        <Box>
          <Title>{title}</Title>
          {content}
          {contentText && <ContentText>{contentText}</ContentText>}
          <Footer>
            <CancelButtonContainer>
              <Button ghost type="primary" title={cancelText || '放弃'} onPress={onCancel} />
            </CancelButtonContainer>
            <Button disabled={disableOk} type="primary" title={okText || '提交'} onPress={onOk} />
          </Footer>
        </Box>
      </Container>
    </Modal>
  );
}

const ContentText = styled.Text`
  color: 10px;
  color: #4a4a4a;
  text-align: left;
  width: 100%;
  font-weight: bold;
`;

const CancelButtonContainer = styled.View`
  margin-right: 12px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
`;

const Box = styled.View`
  width: 308px;
  padding: 16px 24px;
  background: #fff;
  border-radius: 8px;
  align-items: center;
`;

const Title = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Footer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
