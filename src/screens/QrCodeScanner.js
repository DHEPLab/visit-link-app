import { Image, Modal, TouchableHighlight, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { useBoolState } from "../utils";
import { QrType } from "../constants/enums";

export default function QrCodeScanner({ navigation }) {
  const [scanVisible, openScan, closeScan] = useBoolState(false);
  const [permission, requestPermission] = useCameraPermissions();

  function onBarCodeScanned(v) {
    closeScan();
    const { data } = v;
    if (!v) {
      return;
    }
    try {
      const json = JSON.parse(data);
      switch (json.type) {
        case QrType.MODULE_ID:
          navigation.navigate("Module", {
            id: json.data,
            originId: json.data,
            preview: true,
          });
          break;
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  return (
    <View>
      {permission && permission.granted && scanVisible ? (
        <Modal visible={true} onRequestClose={scanVisible ? closeScan : null}>
          <CameraView
            onBarCodeScanned={scanVisible ? onBarCodeScanned : undefined}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Modal>
      ) : (
        <TouchableHighlight
          onPressIn={() => {
            requestPermission().then(() => openScan());
          }}
        >
          <Image
            source={require("../assets/images/qrBorder.png")}
            style={{ width: 35, height: 35 }}
          />
        </TouchableHighlight>
      )}
    </View>
  );
}
