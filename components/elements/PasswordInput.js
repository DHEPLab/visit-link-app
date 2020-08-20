import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { styled } from '../../utils/styled';

import SpecialInput from './SpecialInput';
import Input from './Input';

export default function PasswordInput({ type, ...props }) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const height = type === 'special' ? 38 : 26;

  return (
    <Container>
      {type === 'special' ? (
        <SpecialInput secureTextEntry={secureTextEntry} {...props} />
      ) : (
        <Input secureTextEntry={secureTextEntry} {...props} />
      )}
      {secureTextEntry ? (
        <CloseEyesContainer height={height}>
          <TouchableOpacity onPress={() => setSecureTextEntry(false)}>
            <CloseEyes source={require('../../assets/images/close-eyes.png')} />
          </TouchableOpacity>
        </CloseEyesContainer>
      ) : (
        <OpenEyesContainer height={height}>
          <TouchableOpacity onPress={() => setSecureTextEntry(true)}>
            <OpenEyes source={require('../../assets/images/open-eyes.png')} />
          </TouchableOpacity>
        </OpenEyesContainer>
      )}
    </Container>
  );
}

const Container = styled.View`
  position: relative;
`;

const OpenEyesContainer = styled.View`
  position: absolute;
  top: ${({ height }) => height / 2 - 3}px;
  right: 16px;
`;

const CloseEyesContainer = styled.View`
  position: absolute;
  top: ${({ height }) => height / 2 - 1}px;
  right: 16px;
`;

const CloseEyes = styled(Image)`
  width: 8px;
  height: 5px;
`;

const OpenEyes = styled(Image)`
  width: 8px;
  height: 7px;
`;
