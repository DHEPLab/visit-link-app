import {Image, Modal, TouchableHighlight, View} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import React from "react";
import {useBoolState} from "../utils";

export default function QrCodeScanner({onScanned}) {
    const [scanVisible, openScan, closeScan] = useBoolState(false)
    function onBarCodeScanned(v) {
        closeScan()
        onScanned && onScanned(v)
    }
    return (
        <View>
            {scanVisible?
                <Modal visible={true} onRequestClose={scanVisible? closeScan : null}>
                    <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                                    onBarCodeScanned={scanVisible ? onBarCodeScanned : undefined}
                                    style={{width:1000,
                                        height:1000}}
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