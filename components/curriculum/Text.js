import React from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CurriculumText({ value }) {
  switch (value.type) {
    case 'instruction':
      return <InstructionText html={value.html} />;
    case 'reference':
      return <ReferenceText html={value.html} />;
    case 'script':
    default:
      return <ScriptText html={value.html} />;
  }
}

function InstructionText({ html }) {
  return <Text>{html}</Text>;
}

function ReferenceText({ html }) {
  return <Text>{html}</Text>;
}

function ScriptText({ html }) {
  return <WebViewContainer body={html} />;
}

function WebViewContainer({ body }) {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            ${body} 
          </body>
        </html>`,
      }}
    />
  );
}
