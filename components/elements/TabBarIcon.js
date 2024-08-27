import * as React from "react";
import Icons from "./Icons";
import { styled } from "../../utils/styled";
import { LinearGradient } from "expo-linear-gradient";

export default function TabBarIcon({ name, focused }) {
  const size = 25;
  return (
    <TabBarIconContainer focused={focused}>
      {focused ? (
        <FocusedIcon
          start={[1, 0]}
          end={[0, 1]}
          colors={["#FF9472", "#F2709C"]}
        >
          <Icons name={`${name}-focused`} size={size} />
        </FocusedIcon>
      ) : (
        <Icons name={name} size={size} />
      )}
    </TabBarIconContainer>
  );
}

const TabBarIconContainer = styled.View`
  margin-top: 4px;
  ${({ focused }) => !focused && "margin-top: 8px;"}
`;

const FocusedIcon = styled(LinearGradient)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
