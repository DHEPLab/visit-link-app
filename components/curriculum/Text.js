import React, { useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

import { styled } from '../../utils/styled';

export default function CurriculumText({ value }) {
  switch (value.type) {
    case 'script':
      return <ScriptText html={value.html} />;
    case 'reference':
      return <ReferenceText html={value.html} />;
    case 'instruction':
    default:
      return <InstructionText html={value.html} />;
  }
}

function InstructionText({ html }) {
  return <WebViewContainer body={html} />;
}

function ReferenceText({ html }) {
  return <WebViewContainer body={html} />;
}

function ScriptText({ html }) {
  return <WebViewContainer body={html} />;
}

const ScriptContainer = styled.View`
  border-radius: 4px;
  background: #ffede2;
`;

function WebViewContainer({ body }) {
  const [height, setHeight] = useState(0);

  return (
    <WebView
      originWhitelist={['*']}
      onNavigationStateChange={(state) => setHeight(Number(state.title) || 0)}
      style={{ height }}
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
