import React from 'react';
import { styled } from '../config/styled';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ({ onPress, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <RenderButton {...props} />
    </TouchableOpacity>
  );
}

function RenderButton({ title, size, ghost, logout }) {
  if (logout) {
    return (
      <LogoutButton>
        <Text>{title}</Text>
      </LogoutButton>
    );
  }

  if (ghost) {
    return (
      <GhostButton>
        <Text>{title}</Text>
      </GhostButton>
    );
  }

  return (
    <Button
      block
      size={size}
      start={[1, 0]}
      end={[0, 1]}
      colors={['#F2709C', '#FF9472']}
    >
      <Text>{title}</Text>
    </Button>
  );
}

const GhostButton = styled.View`
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 4px;
  min-width: 80px;
`;

const LogoutButton = styled.View`
  width: 260px;
  align-self: center;
  padding: 7px;
  background-color: #ffc3a0;
  border-radius: 270px;
`;

const Button = styled(LinearGradient)`
  width: ${(props) => (props.size === 'large' ? '260px' : 'auto')};
  padding: ${(props) => (props.size === 'large' ? '7px' : '4px')} 16px;
  border-radius: 270px;
  align-self: center;
`;

const Text = styled.Text`
  font-size: 10px;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;
