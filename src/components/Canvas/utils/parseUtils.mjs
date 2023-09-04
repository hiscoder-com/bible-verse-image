export const parseText = (text) => {
  const parts = [];
  const regex = /<\/?selected(\s+[^>]+)?>|\s+|[\p{L}-]+/gu;
  const regexSelected = /<selected(?=\s|>)/g;
  let match;

  let selectedAttributes = null;
  let findAttribute = false;

  while ((match = regex.exec(text)) !== null) {
    const [text, attributes] = match;

    if (regexSelected.test(text)) {
      selectedAttributes = parseAttributes(attributes);
      findAttribute = true;
    } else if (text === '</selected>') {
      selectedAttributes = null;
      findAttribute = false;
    } else if (findAttribute) {
      parts.push({ text: text, selected: true, attributes: selectedAttributes });
    } else {
      parts.push({ text: text, selected: false });
    }
  }

  return parts;
};

const parseAttributes = (attributeString) => {
  const attributes = {};
  const regex = /(\S+)\s*=\s*"([^"]*)"/g;
  let match;

  while ((match = regex.exec(attributeString)) !== null) {
    const [, name, value] = match;
    attributes[name] = value;
  }
  return attributes;
};
