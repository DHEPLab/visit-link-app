import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import StaticField from './StaticField';
import BabyLine from './BabyLine';
import StaticForm from './StaticForm';
import { styled, px2dp } from '../utils/styled';

export default function BabyCard({ id, carerName, carerPhone, onPress, ...props }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        onPress({
          id,
          ...props,
        })
      }
    >
      <Card>
        <BabyLine {...props} />
        <Carer>
          <StaticForm>
            <StaticField label="主要看护人">{carerName || '无'}</StaticField>
            <StaticField label="联系方式">{carerPhone || '无'}</StaticField>
          </StaticForm>
          <ArrowRight name="keyboard-arrow-right" size={px2dp(18)} color="#FF794F" />
        </Carer>
      </Card>
    </TouchableOpacity>
  );
}

const ArrowRight = styled(MaterialIcons)`
  position: absolute;
  top: 9px;
  right: -5px;
`;

const Card = styled.View`
  padding: 16px 24px;
  width: 344px;
  border-radius: 8px;
  align-self: center;
  background: #fff;
  margin-bottom: 8px;
`;

const Carer = styled.View`
  margin-top: 14px;
`;
