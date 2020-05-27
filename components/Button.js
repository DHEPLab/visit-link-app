import React from 'react';
import { styled } from '../config/styled';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ({ onPress, title, size, ghost }) {
  return (
    <TouchableOpacity
      style={{ elevation: 11 }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {ghost ? (
        <GhostButton>
          <ButtonText>{title}</ButtonText>
        </GhostButton>
      ) : (
        <Button
          size={size}
          start={[1, 0]}
          end={[0, 1]}
          colors={['#F2709C', '#FF9472']}
        >
          <ButtonText>{title}</ButtonText>
        </Button>
      )}
    </TouchableOpacity>
  );
}

const GhostButton = styled.View`
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 4px;
  min-width: 80px;
`;

const Button = styled(LinearGradient)`
  width: ${(props) => (props.size === 'large' ? '260px' : 'auto')};
  min-width: 100px;
  padding: 7px;
  border-radius: 270px;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 10px;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
