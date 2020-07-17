import React from 'react';
import { styled } from '../utils/styled';
import BottomRightBackground from './BottomRightBackground';

export default function Card({
  title,
  children,
  right,
  background,
  backgroundWidth = 88,
  backgroundHeight = 88,
  hideBody,
}) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {right}
      </Header>
      {!hideBody && (
        <>
          {background && (
            <BottomRightBackground
              width={backgroundWidth}
              height={backgroundHeight}
              source={background}
            />
          )}

          <Body>{children}</Body>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Header = styled.View`
  height: 39px;
  padding: 0 24px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const Title = styled.Text`
  color: #ff794f;
  font-size: 12px;
  font-weight: bold;
`;

const Body = styled.View`
  border-top-width: 1px;
  border-color: #ffede2;
  padding: 12px 24px;
`;
