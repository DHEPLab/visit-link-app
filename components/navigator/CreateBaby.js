import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Ghost from './Ghost';
import BottomRightBackground from '../BottomRightBackground';

import { Colors } from '../../constants';
import { styled, px2dp } from '../../utils/styled';
import { Image } from 'react-native';
import {useTranslation} from "react-i18next";

export default function CreateBabyNavigator({ navigation, active = 1 }) {
    const { t } = useTranslation('CreateBabyNavigator');

    return (
        <Container {...Colors.linearGradient}>
            <BottomRightBackground
                width={px2dp(90)}
                height={px2dp(38)}
                source={require('../../assets/images/create-baby-bg.png')}
            />
            <Ghost navigation={navigation} title={t('addBaby')} />
            <Steps>
                <Step>
                    <Number active={active > 0}>1</Number>
                    <Name active={active > 0}>{t('babyInfo')}</Name>
                </Step>
                <ArrowImage
                    source={
                        active > 1
                            ? require('../../assets/images/step-arrow-active.png')
                            : require('../../assets/images/step-arrow.png')
                    }
                />
                <Step>
                    <Number active={active > 1}>2</Number>
                    <Name active={active > 1}>{t('caregiverInfo')}</Name>
                </Step>
                <ArrowImage
                    source={
                        active > 2
                            ? require('../../assets/images/step-arrow-active.png')
                            : require('../../assets/images/step-arrow.png')
                    }
                />
                <Step>
                    <Number active={active > 2}>3</Number>
                    <Name active={active > 2}>{t('addressInfo')}</Name>
                </Step>
            </Steps>
        </Container>
    );
}

const ArrowImage = styled(Image)`
  height: 10px;
  width: 39px;
`;

const Container = styled(LinearGradient)`
  height: 84px;
`;

const Steps = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
`;

const Step = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Number = styled.Text`
  color: #fff;
  border-width: 1px;
  border-color: #fff;
  width: 20px;
  height: 20px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;

  ${({ active }) =>
    active &&
    `
    background: #fff;
    color: #FF794F;
  `}
`;

const Name = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-left: 8px;
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
  `}
`;
