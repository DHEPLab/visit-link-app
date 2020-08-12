import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { setStatusBarHidden } from 'expo-status-bar';

export default function AutoHideStatusBarModal({ visible, children }) {
  useEffect(() => {
    setStatusBarHidden(visible, 'none');
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true}>
      {children}
    </Modal>
  );
}
