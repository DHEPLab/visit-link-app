import React from 'react';
import { styled } from '../../utils/styled';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';

export default function CheckBoxGroup({ value = [], onChange, options = [] }) {

  function checkChange (label, input, from) {
    const resultArray = [...value]
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
                    ? require('../../assets/images/checkbox-check.png')
                    : require('../../assets/images/checkbox-uncheck.png')
                }
              />
              <Label>{option.label.trim()}</Label>
            </Line>
            {option.needEnter && <StyledTextInput
              placeholder="请输入内容"
              value={item?.input}
              border={true}
              onChangeText={text => checkChange(option.label, text, 'input')}
            />}
          </TouchableOpacity>
        )}
      )}
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: -10px;
  margin-top: -10px;
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
  height: 25px;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  margin-top: -3px;
  width: 90%;
  margin-left: 18px;
  font-size: 10px;
  ${({ border }) =>
    border &&
    `
    height: 20px;
    border-radius: 13px;
    padding-left: 12px;
    border: 1px solid #FFEDE2;
  `}
`;
