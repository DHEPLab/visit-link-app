import React from "react";
import { styled } from "@/utils/styled";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * A customizable button component that wraps a `TouchableOpacity` and handles button presses.
 *
 * @param {Object} props - The properties passed to the button component.
 * @param {() => void} props.onPress - The function to call when the button is pressed.
 * @param {string} props.title - The title or label for the button.
 * @param {boolean} [props.ghost] - If true, the button is styled as a ghost button with a transparent background (optional).
 * @param {"large" | "small"} [props.size] - The size of the button, can be "large" or "small" (optional).
 * @param {boolean} [props.disabled] - If true, the button is disabled and cannot be pressed (optional).
 * @param {Object} [props.rest] - Any additional properties passed to the button component.
 *
 * @returns {JSX.Element} A button element that can be pressed unless disabled.
 */
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
      <GhostButton type={type} size={size}>
        <Text type={type}>{title}</Text>
      </GhostButton>
    );
  }

  switch (type) {
    case "weaken":
      return (
        <WeakenButton>
          <Text>{title}</Text>
        </WeakenButton>
      );
    case "info":
      return (
        <InfoButton>
          <InfoButtonText>{title}</InfoButtonText>
        </InfoButton>
      );
    case "text":
      return <Text>{title}</Text>;
    case "delete":
      return <DeleteText>{title}</DeleteText>;
    case "link":
      return <LinkButton>{title}</LinkButton>;
    case "primary":
      return (
        <PrimaryButton disabled={disabled}>
          <Text>{title}</Text>
        </PrimaryButton>
      );
    case "shade":
    default:
      return (
        <ShadeButton
          disabled={disabled}
          block
          size={size}
          start={[1, 0]}
          end={[0, 1]}
          colors={["#F2709C", "#FF9472"]}
        >
          <Text>{title}</Text>
        </ShadeButton>
      );
  }
}

const GhostButton = styled.View`
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 4px;
  width: ${(props) => (props.size === "large" ? "260px" : "auto")};
  min-width: 80px;
  ${({ type }) =>
    type === "primary" &&
    `
    border-color: #FF794F;
  `}
  ${({ type }) =>
    type === "error" &&
    `
    border-color: #FF2E2E;
  `}
`;

const PrimaryButton = styled.View`
  border-radius: 25px;
  padding: 4px;
  min-width: 80px;
  background: #ff794f;
  ${({ disabled }) => disabled && "opacity: 0.5;"}
`;

const LinkButton = styled.Text`
  color: #ff794f;
  font-size: 10px;
  font-weight: bold;
  /* text-decoration: underline; */
`;

const WeakenButton = styled.View`
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

const ShadeButton = styled(LinearGradient)`
  width: ${(props) => (props.size === "large" ? "260px" : "auto")};
  padding: ${(props) => (props.size === "large" ? "7px" : "4px")} 16px;
  margin-bottom: ${(props) => (props.size === "large" ? "10px" : 0)};
  border-radius: 270px;
  ${({ disabled }) => disabled && "opacity: 0.5;"}
  align-self: center;
`;

const Text = styled.Text`
  font-size: 10px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  ${({ type }) =>
    type === "primary" &&
    `
    color: #FF794F;
  `}
  ${({ type }) =>
    type === "error" &&
    `
    color: #FF2E2E;
  `}
`;

const DeleteText = styled(Text)`
  color: #8e8e93;
`;

const InfoButtonText = styled(Text)`
  color: #f2709c;
`;
