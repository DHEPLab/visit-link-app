import React from 'react';
import { styled } from '../../utils/styled';

export default function Form({ children, labelWidth, labelAlign }) {
  return (
    <Container>
      {labelWidth
        ? children?.map((child, index) =>
            React.cloneElement(child, {
              key: index,
              labelWidth,
              labelAlign,
            })
          )
        : children}
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 0 24px;
`;
