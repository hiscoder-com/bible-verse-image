export const parseText = (text) => {
  const parts = [];
  const regex = /<\/?selected(\s+[^>]+)?>|\S+|\s+/g;
  const regexSelected = /<selected(?=\s|>)/g;
  let match;

  let selectedAttributes = null;
  let findAttribute = false;

  while ((match = regex.exec(text)) !== null) {
    const [tag, attributes] = match;
    if ((match = regexSelected.exec(tag)) !== null) {
      selectedAttributes = parseAttributes(attributes);
      findAttribute = true;
    } else if (tag === '<selected/>') {
      selectedAttributes = null;
    } else if (findAttribute) {
      parts.push({ text: tag, selected: true, attributes: selectedAttributes });
      findAttribute = false;
    } else {
      parts.push({ text: tag, selected: false });
    }
  }

  return parts;
};

const parseAttributes = (attributeString) => {
  const attributes = {};
  const regex = /(\S+)\s*=\s*"([^"]*)"/g;
  let match;

  while ((match = regex.exec(attributeString)) !== null) {
    const attributeName = match[1];
    const attributeValue = match[2];
    attributes[attributeName] = attributeValue;
  }
  return attributes;
};

export const addWidthToParts = (ctx, parts) => {
  for (const word of parts) {
    word.width = ctx.measureText(word.text).width;
  }
  return;
};
