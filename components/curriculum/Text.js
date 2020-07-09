import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

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
  return <WebViewContainer body={html} />;
}

function ReferenceText({ html }) {
  return (
    <ReferenceContainer>
      <WebViewContainer body={html} />
    </ReferenceContainer>
  );
}

function Script({ html }) {
  return (
    <ScriptContainer>
      <WebViewContainer body={html} style={{ backgroundColor: '#ffede2' }} />
    </ScriptContainer>
  );
}

const Container = styled.View`
  margin-bottom: 20px;
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

function WebViewContainer({ body, style = {} }) {
  const [height, setHeight] = useState(0);

  return (
    <WebView
      originWhitelist={['*']}
      onNavigationStateChange={(state) => setHeight(Number(state.title) || 0)}
      style={{ height, ...style }}
      source={{
        html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            ${body} 
          </body>
          <script>
            window.location.hash = 1;
            document.title = document.body.scrollHeight;
          </script>
        </html>`,
      }}
    />
  );
}
