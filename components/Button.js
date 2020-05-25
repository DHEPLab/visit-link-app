import React from 'react';
import styled from '../config/styled';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ({ onPress, title, size }) {
  return (
    <TouchableOpacity
      style={{ elevation: 11 }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Button
        size={size}
        start={[1, 0]}
        end={[0, 1]}
        colors={['#F2709C', '#FF9472']}
      >
        <ButtonText>{title}</ButtonText>
      </Button>
    </TouchableOpacity>
  );
}

const Button = styled(LinearGradient)`
  width: ${(props) => (props.size === 'large' ? '260px' : 'auto')};
  min-width: 100px;
  padding: 7px;
  border-radius: 270px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
