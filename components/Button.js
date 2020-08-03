import React from 'react';
import { styled } from '../utils/styled';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ({ onPress, disabled, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <RenderButton disabled={disabled} {...props} />
    </TouchableOpacity>
  );
}

function RenderButton({ title, link, text, size, ghost, logout, info, disabled }) {
  if (logout) {
    return (
      <LogoutButton>
        <Text>{title}</Text>
      </LogoutButton>
    );
  }

  if (info) {
    return (
      <InfoButton>
        <InfoButtonText>{title}</InfoButtonText>
      </InfoButton>
    );
  }

  if (text) {
    return <Text>{title}</Text>;
  }

  if (link) {
    return <LinkButton>{title}</LinkButton>;
  }

  if (ghost) {
    return (
      <GhostButton>
        <Text>{title}</Text>
      </GhostButton>
    );
  }

  return (
    <PrimaryButton
      disabled={disabled}
      block
      size={size}
      start={[1, 0]}
      end={[0, 1]}
      colors={['#F2709C', '#FF9472']}
    >
      <Text>{title}</Text>
    </PrimaryButton>
  );
}

const GhostButton = styled.View`
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 4px;
  min-width: 80px;
`;

const LinkButton = styled.Text`
  color: #ffc3a0;
  font-size: 10px;
  font-weight: bold;
  text-decoration: underline;
`;

const LogoutButton = styled.View`
  width: 260px;
  align-self: center;
  padding: 7px;
  background-color: #ffc3a0;
  border-radius: 270px;
`;

const InfoButton = styled.View`
  width: 260px;
  align-self: center;
  padding: 7px;
  background-color: #fff;
  border-radius: 270px;
`;

const PrimaryButton = styled(LinearGradient)`
  width: ${(props) => (props.size === 'large' ? '260px' : 'auto')};
  padding: ${(props) => (props.size === 'large' ? '7px' : '4px')} 16px;
  margin-bottom: ${(props) => (props.size === 'large' ? '10px' : 0)};
  border-radius: 270px;
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
  align-self: center;
`;

const Text = styled.Text`
  font-size: 10px;
  text-align: center;
  color: #fff;
  font-weight: bold;
`;

const InfoButtonText = styled(Text)`
  color: #f2709c;
`;
