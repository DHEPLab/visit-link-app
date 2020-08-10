import React from 'react';
import { styled, px2dp } from '../../utils/styled';

export default function ({ label, children, labelWidth = 50 }) {
  return (
    <StaticField>
      {label && <Label labelWidth={labelWidth}>{label}</Label>}
      <Value>{children}</Value>
    </StaticField>
  );
}

const StaticField = styled.View`
  flex-direction: row;
  margin-bottom: 6px;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  width: ${({ labelWidth }) => px2dp(labelWidth)}px;
  text-align: right;
  margin-right: 12px;
`;

const Value = styled.Text`
  color: #4a4a4a;
  font-size: 10px;
  font-weight: bold;
  flex: 1;
  flex-wrap: wrap;
`;
