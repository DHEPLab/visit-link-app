import React from 'react';
import { styled } from '../../utils/styled';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Button({ onPress, disabled, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <RenderButton disabled={disabled} {...props} />
    </TouchableOpacity>
  );
}

function RenderButton({ title, type, size, ghost, disabled }) {
  if (ghost) {
    return (
      <GhostButton>
        <Text>{title}</Text>
      </GhostButton>
    );
  }

  switch (type) {
    case 'logout':
      return (
        <LogoutButton>
          <Text>{title}</Text>
        </LogoutButton>
      );
    case 'info':
      return (
        <InfoButton>
          <InfoButtonText>{title}</InfoButtonText>
        </InfoButton>
      );
    case 'text':
      return <Text>{title}</Text>;
    case 'delete':
      return <DeleteText>{title}</DeleteText>;
    case 'link':
      return <LinkButton>{title}</LinkButton>;
    case 'primary':
    default:
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
}

const GhostButton = styled.View`
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 4px;
  min-width: 80px;
`;

const LinkButton = styled.Text`
  color: #ff794f;
  font-size: 10px;
  font-weight: bold;
  /* text-decoration: underline; */
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

const DeleteText = styled(Text)`
  color: #8e8e93;
`;

const InfoButtonText = styled(Text)`
  color: #f2709c;
`;
