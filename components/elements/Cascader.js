import React, { useState } from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';

import { useBoolState } from '../../utils';
import { styled } from '../../utils/styled';

export default function Cascader({ value, onChange, options }) {
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
        {value ? <Value>{value}</Value> : <Placeholder>请选择</Placeholder>}
      </TouchableOpacity>
      <Modal visible={visible} transparent={true}>
        <Container>
          <StyledFlatList
            data={data}
            keyExtractor={(item) => item.code + ''}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} onPress={() => handlePressItem(item)}>
                <Item>
                  <Label>{item.name}</Label>
                </Item>
              </TouchableOpacity>
            )}
          />
        </Container>
      </Modal>
    </>
  );
}

const Placeholder = styled.Text`
  font-size: 10px;
`;

const Value = styled.Text`
  font-size: 10px;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledFlatList = styled(FlatList)`
  width: 100%;
  background: #fff;
`;

const Label = styled.Text`
  font-size: 12px;
  padding: 4px;
  padding-left: 10px;
`;

const Item = styled.View`
  color: #000;
  width: 100%;
  background: #fff;
`;
