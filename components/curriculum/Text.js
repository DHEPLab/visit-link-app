import React from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';

import { styled } from '../../utils/styled';

export default function CurriculumText({ value }) {
  switch (value.type) {
    case 'script':
      return (
        <Container>
          <Script html={value.html} />
        </Container>
      );
    case 'reference':
      return (
        <Container>
          <ReferenceText html={value.html} />
        </Container>
      );
    case 'instruction':
    default:
      return (
        <Container>
          <InstructionText html={value.html} />
        </Container>
      );
  }
}

function InstructionText({ html }) {
  return <WebViewContainer html={html} />;
}

function ReferenceText({ html }) {
  return (
    <ReferenceContainer>
      <WebViewContainer html={html} />
    </ReferenceContainer>
  );
}

function Script({ html }) {
  return (
    <ScriptContainer>
      <WebViewContainer html={html} style={{ backgroundColor: '#ffede2' }} />
    </ScriptContainer>
  );
}

const Container = styled.View`
  margin-bottom: 15px;
`;

const ScriptContainer = styled.View`
  padding: 10px;
  border-radius: 4px;
  background: #ffede2;
`;

const ReferenceContainer = styled.View`
  padding: 10px;
  border-radius: 4px;
  border-width: 2px;
  border-color: #ffede2;
`;

function WebViewContainer({ html, style = {} }) {
  return <AutoHeightWebView style={{ width: 'auto' }} customStyle={style} source={{ html }} />;
}
