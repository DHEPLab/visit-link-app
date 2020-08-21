class ComponentValue {}

export class TextValue extends ComponentValue {
  type: 'instruction' | 'script' | 'reference';
  html: string;
}

export class MediaValue {
  type: 'VIDEO' | 'PHOTO';
  file: string;
  text: string;
}

export class Case {
  key: number;
  text: string;
  finishAction: ['Continue'] | ['Redirect_End', number] | ['Redirect_Continue', number];
  components: Component[];
  pageComponents: Component[][];

  constructor(
    key: number,
    text: string,
    finishAction: ['Continue'] | ['Redirect_End', number] | ['Redirect_Continue', number],
    components: Component[]
  ) {
    this.key = key;
    this.text = text;
    this.finishAction = finishAction;
    this.components = components;
  }

  setPageComponents(pageComponents: Component[][]): Case {
    this.pageComponents = pageComponents;
    return this;
  }
}

export class SwitchValue {
  question: TextValue;
  cases: Case[];

  constructor(question: TextValue, cases: Case[]) {
    this.question = question;
    this.cases = cases;
  }
}

export class Component {
  type: 'Text' | 'Media' | 'Switch' | 'PageFooter';
  key: number;
  value?: ComponentValue;

  constructor(
    type: 'Text' | 'Media' | 'Switch' | 'PageFooter',
    key: number,
    value?: ComponentValue
  ) {
    this.type = type;
    this.key = key;
    this.value = value;
  }
}

function pageable(components: Component[]): Component[][] {
  const page: Component[][] = [];
  let pageNumber = 0;
  components.forEach((component: Component) => {
    if (!page[pageNumber]) page[pageNumber] = [];
    if (component.type === 'Switch' && component.value) {
      const switchValue = component.value as SwitchValue;
      switchValue.cases.forEach((_case) => {
        _case.pageComponents = pageable(_case.components);
        _case.components = [];
      });
    }

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
