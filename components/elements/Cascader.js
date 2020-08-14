import React, { useState } from 'react';
import { ScrollView, Modal, TouchableOpacity } from 'react-native';

import { useBoolState } from '../../utils';
import { styled } from '../../utils/styled';

export default function Cascader({ value, onChange, options, placeholder }) {
  const [visible, open, close] = useBoolState();
  const [data, setData] = useState(options);
  const [values, setValues] = useState([]);

  function handlePressItem(item) {
    if (item.children && item.children.length > 0) {
      setData(item.children);
      setValues((v) => [...v, item.name]);
    } else {
      close();
      onChange([...values, item.name].join('/'));
    }
  }

  function handlePress() {
    setValues([]);
    setData(options);
    open();
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {value ? <Value>{value}</Value> : <Placeholder>{placeholder}</Placeholder>}
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
        <Container>
          <ScrollView>
            <DataContainer>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.8}
                  onPress={() => handlePressItem(item)}
                >
                  <Item>
                    <Label>{item.name}</Label>
                  </Item>
                </TouchableOpacity>
              ))}
            </DataContainer>
          </ScrollView>
        </Container>
      </Modal>
    </>
  );
}

const Placeholder = styled.Text`
  color: #ff794f;
  font-size: 10px;
  line-height: 16px;
`;

const Value = styled.Text`
  font-size: 10px;
  line-height: 16px;
`;

const Container = styled.View`
  flex: 1;
  padding: 50px 20px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const DataContainer = styled.View`
  width: 300px;
  background: #000;
`;

const Label = styled.Text`
  font-size: 12px;
  padding: 6px 4px;
  padding-left: 10px;
`;

const Item = styled.View`
  color: #000;
  width: 100%;
  background: #fff;
`;
