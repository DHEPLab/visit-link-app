import React from 'react';
import { styled } from '../../utils/styled';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Checkbox({ label, value, onChange }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(!value)}>
      <Container>
        <Box
          source={
            value
              ? require('../../assets/images/checked.png')
              : require('../../assets/images/unchecked.png')
          }
        />
        <Label>{label}</Label>
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Box = styled(Image)`
  height: 12px;
  width: 12px;
`;
