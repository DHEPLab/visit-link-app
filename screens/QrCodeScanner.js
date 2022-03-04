import {Image, Modal, Text, TouchableHighlight, View} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import React from "react";
import {useBoolState} from "../utils";
import {QrType} from "../constants/enums";

export default function QrCodeScanner({navigation}) {
    const [scanVisible, openScan, closeScan] = useBoolState(false)
    function onBarCodeScanned(v) {
        closeScan()
        const {data} = v
        if (!v) {
            return
        }
        try {
            const json = JSON.parse(data)
            switch (json.type) {
                case QrType.MODULE_ID:
                    navigation.navigate('Module', { id: json.data, originId: json.data, preview: true });
                    break;
            }
            // setComponent({comp, props:compProps})
        } catch (e) {
            console.error(e)
            return
        }
    }
    return (
        <View>
            {scanVisible?
                <Modal visible={true} onRequestClose={scanVisible? closeScan : null}>
                    <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                                    onBarCodeScanned={scanVisible ? onBarCodeScanned : undefined}
                                    style={{width:"100%", height:"100%"}}
                    />
                </Modal>
                :
                <TouchableHighlight onPressIn={openScan} >
                    <Image source={require("../assets/images/qrBorder.png")}
                           style={{width:35, height:35}}/>
                </TouchableHighlight>
            }
        </View>
    )
}