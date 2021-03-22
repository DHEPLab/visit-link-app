import React from 'react';
import { styled } from '../../utils/styled';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from './Input'

export default function CheckBoxGroup({ value = [], onChange, options = [] }) {

  function checkChange (label, input, from) {
    const resultArray = value
    const before = value.findIndex(n => label === n?.check)
    if (before === -1) {
      resultArray.push({check: label, input: input})
      onChange({ target: { value: resultArray } })
    } else {
      if (from === 'input') {
        resultArray.splice(before, 1, {...value[before], input: input})
      } else {
        resultArray.splice(before, 1)
      }
      onChange({ target: { value: resultArray } })
    }
  }

  return (
    <Container>
      {options.map((option) => {
        const item = value.find(n => option.label === n?.check)
        return (
          <TouchableOpacity
            key={option.label}
            activeOpacity={0.8}
            onPress={() => checkChange(option.label, value?.input, 'check')}
          >
            <Line>
              <Box source={
                  item
                    ? require('../../assets/images/checked.png')
                    : require('../../assets/images/unchecked.png')
                }
              />
              <Label>{option.label}</Label>
              {option.needEnter && <Input
                placeholder="请输入"
                value={item?.input}
                onChangeText={text => checkChange(option.label, text, 'input')}
              />}
            </Line>
          </TouchableOpacity>
        )}
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -10px;
`;

const Box = styled(Image)`
  height: 12px;
  width: 12px;
`;

const Label = styled.Text`
  margin-left: 8px;
  margin-right: 8px;
  color: #8e8e93;
  font-size: 10px;
`;

const Line = styled.View`
  flex-direction: row;
  align-items: center;
`;