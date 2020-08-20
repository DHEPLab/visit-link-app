import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { styled } from '../../utils/styled';

import SpecialInput from './SpecialInput';

export default function PasswordInput(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <Container>
      <SpecialInput secureTextEntry={secureTextEntry} {...props} />
      {secureTextEntry ? (
        <CloseEyesContainer>
          <TouchableOpacity onPress={() => setSecureTextEntry(false)}>
            <CloseEyes source={require('../../assets/images/close-eyes.png')} />
          </TouchableOpacity>
        </CloseEyesContainer>
      ) : (
        <OpenEyesContainer>
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
  top: 11px;
  right: 16px;
`;

const CloseEyesContainer = styled.View`
  position: absolute;
  top: 13px;
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
