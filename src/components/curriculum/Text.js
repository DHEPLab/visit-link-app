import React from "react";
import { styled } from "../../utils/styled";
import HtmlView from "react-native-htmlview";

export default function CurriculumText({ value }) {
  console.log("CurriculumText value:", value); // 打印整个value对象，每次组件渲染时

  switch (value.type) {
    case "script":
      console.log("Rendering script type with html:", value.html); // 专门针对script类型的详细日志
      return (
        <Container>
          <Script html={value.html} />
        </Container>
      );
    case "reference":
      console.log("Rendering reference type with html:", value.html); // 专门针对reference类型的详细日志
      return (
        <Container>
          <ReferenceText html={value.html} />
        </Container>
      );
    case "instruction":
    default:
      console.log("Rendering instruction/default type with html:", value.html); // 专门针对instruction类型的详细日志
      return (
        <Container>
          <InstructionText html={value.html} />
        </Container>
      );
  }
}

function InstructionText({ html }) {
  console.log("InstructionText html:", html); // 更细粒度的日志在具体函数中
  return <WebViewContainer html={html} />;
}

function ReferenceText({ html }) {
  console.log("ReferenceText html:", html); // 在具体函数中的详细日志
  return (
    <ReferenceContainer>
      <WebViewContainer html={html} />
    </ReferenceContainer>
  );
}

function Script({ html }) {
  console.log("Script html:", html); // 在具体函数中的详细日志
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
  const customCSS = `
    ol[data-list="ordered"] {
      list-style-type: decimal;
      padding-left: 20px;
    }
    ol[data-list="bullet"] {
      list-style-type: disc;
      padding-left: 20px;
    }
    ol[data-list="ordered"] li, ol[data-list="bullet"] li {
      display: list-item;
    }
  `;

  const modifiedHtml = `<style>${customCSS}</style>${html}`;

  console.log("WebViewContainer modifiedHtml:", modifiedHtml); // 在WebViewContainer中打印修改后的HTML
  return (
    <HtmlView
      value={modifiedHtml}
      stylesheet={styles}
      style={{ width: "auto", ...customStyle }}
    />
  );
}

const styles = {
  p: {
    margin: 0,
    padding: 0,
  },
  li: {
    marginBottom: 5,
  },
};
