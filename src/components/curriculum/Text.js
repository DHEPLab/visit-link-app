import React from "react";
import { styled } from "../../utils/styled";
import HtmlView from "react-native-htmlview";

export default function CurriculumText({ value }) {
  switch (value.type) {
    case "script":
      return (
        <Container>
          <Script html={value.html} />
        </Container>
      );
    case "reference":
      return (
        <Container>
          <ReferenceText html={value.html} />
        </Container>
      );
    case "instruction":
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
      <WebViewContainer html={html} customStyle="background-color: #ffede2" />
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

function WebViewContainer({ html, customStyle }) {
  const modifiedHtml = html.replace(
    /<ol>([\s\S]*?)<\/ol>/g,
    (match, listItems) => {
      const liTags = Array.from(listItems.matchAll(/<li[^>]*>/g));

      const allBullets =
        liTags.length > 0 &&
        liTags.every((liTag) => liTag[0].includes('data-list="bullet"'));

      return allBullets ? `<ul>${listItems}</ul>` : match;
    },
  );

  const styles = {
    p: {
      margin: 0,
      padding: 0,
    },
    li: {
      marginBottom: 5,
      display: "list-item",
    },
    ul: {
      paddingLeft: 20,
    },
    ol: {
      paddingLeft: 20,
    },
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
  };

  return (
    <HtmlView
      value={modifiedHtml}
      stylesheet={styles}
      style={{ width: "auto", ...customStyle }}
    />
  );
}
