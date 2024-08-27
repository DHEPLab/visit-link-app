import React, { useState } from "react";
import { ScrollView, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useBoolState } from "../../utils";
import { px2dp, styled } from "../../utils/styled";

export default function Cascader({ value, onChange, options, placeholder }) {
  const [visible, open, close] = useBoolState();
  const [data, setData] = useState(options);
  const [values, setValues] = useState([]);

  function handlePressItem(item) {
    if (item.children && item.children.length > 0) {
      setData(item.children);
      setValues((v) => [...v, item]);
    } else {
      onChange([...values, item].map((i) => i.name).join("/"));
      close();
    }
  }

  function handlePress() {
    setValues([]);
    setData(options);
    open();
  }

  function backTo(item, index) {
    if (index === -1) {
      setValues([]);
      setData(options);
      return;
    }
    setValues((v) => {
      const clone = [...v];
      clone.splice(index + 1, 4);
      return clone;
    });
    setData(item.children);
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {value ? (
          <Value>{value}</Value>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
      </TouchableOpacity>
      <Modal visible={visible} transparent={true} statusBarTranslucent={true}>
        <Shadow>
          <CardContainer>
            <Header>
              <Title>请选择</Title>
              <CloseButton>
                <TouchableOpacity onPress={close} activeOpacity={0.8}>
                  <MaterialIcons name="close" size={px2dp(16)} color="white" />
                </TouchableOpacity>
              </CloseButton>
            </Header>
            <CurrentPick>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => backTo(null, -1)}
              >
                <Picked>当前选择：</Picked>
              </TouchableOpacity>
              {values.map((v, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={v.name}
                  onPress={() => backTo(v, index)}
                >
                  <Picked key={v.name}>{`${v.name}/`}</Picked>
                </TouchableOpacity>
              ))}
            </CurrentPick>
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
          </CardContainer>
        </Shadow>
      </Modal>
    </>
  );
}

const CloseButton = styled.View`
  position: absolute;
  right: 10px;
`;

const Header = styled.View`
  height: 30px;
  background: #ff794f;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.View`
  margin-bottom: 50px;
  width: 300px;
  border-radius: 4px;
  overflow: hidden;
`;

const Title = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

const CurrentPick = styled.View`
  background: #fff;
  padding: 6px;
  flex-direction: row;
`;

const Picked = styled.Text`
  font-size: 10px;
`;

const Placeholder = styled.Text`
  color: #ff794f;
  font-size: 10px;
  line-height: 16px;
`;

const Value = styled.Text`
  font-size: 10px;
  line-height: 16px;
`;

const Shadow = styled.View`
  flex: 1;
  padding: 50px 0;
  align-items: center;
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
