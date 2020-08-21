class ComponentValue {}

class TextValue extends ComponentValue {
  type: 'instruction' | 'script' | 'reference';
  html: string;
}

class MediaValue {
  type: 'VIDEO' | 'PHOTO';
  file: string;
  text: string;
}

class Case {
  key: number;
  text: string;
  finishAction: string[];
  components: Component[];
}

class SwitchValue {
  question: TextValue;
  cases: Case[];
}

export class Component {
  type: 'Text' | 'Media' | 'Switch' | 'PageFooter';
  key: number;
  value: ComponentValue | null;

  constructor(type: 'Text' | 'Media' | 'Switch' | 'PageFooter', key: number) {
    this.type = type;
    this.key = key;
  }
}

function pageable(components: Component[]) {
  const page = [];
  let pageNumber = 0;
  components.forEach((component) => {
    if (!page[pageNumber]) page[pageNumber] = [];
    page[pageNumber].push(component);

    if (component.type === 'PageFooter' || component.type === 'Switch') {
      pageNumber++;
    }
  });
  return page;
}

export default {
  pageable,
};
