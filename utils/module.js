function pageable(components) {
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
