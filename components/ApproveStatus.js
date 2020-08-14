import React from 'react';

import { styled } from '../utils/styled';

export default function ApproveStatus({ approved, gray }) {
  return <Status gray={!approved && gray}>{approved ? '已审核' : '待审核'}</Status>;
}

const Status = styled.Text`
  padding: 1px 4px;
  font-size: 8px;
  color: #ff794f;
  background: #ffede2;
  border-radius: 2px;

  ${({ gray }) =>
    gray &&
    `
    background: #EEEEEE;
    color: #B2B2B2;
  `}
`;
