const assert = require('assert');

const {xml2js, js2xml} = require('xml-js');

const getRootTag = doc => doc.elements.filter(el => el.type === 'element')[0] || {};
const looseXmlEscape = text => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const escapeAttributes = element => {
  if (element.attributes !== undefined) {
    Object.keys(element.attributes).forEach(key => {
      element.attributes[key] = looseXmlEscape(element.attributes[key]);
    });
  }
};

module.exports = function (...files) {
  const nonEmptyFiles = files.filter(file => typeof file === 'string' && file !== '');

  assert(nonEmptyFiles.length > 0, 'At least one non-empty argument expected');

  if (nonEmptyFiles.length === 1) {
    return nonEmptyFiles[0];
  }

  const [targetDoc, ...docs] = files.map(str => xml2js(str));

  assert(targetDoc.elements !== undefined, 'Target document is empty');

  const targetRootTag = getRootTag(targetDoc);
  const targetRootTagName = targetRootTag.name;

  assert(targetRootTagName !== undefined, `Target document doesn't contain root tag`);

  const docsToMerge = docs.filter(doc => {
    if (doc.elements === undefined) {
      return false;
    }

    const rootTagName = getRootTag(doc).name;

    return rootTagName !== undefined && rootTagName === targetRootTagName;
  });

  assert(docsToMerge.length === docs.length, `Not all files have expected root tag "${targetRootTagName}"`);

  if (targetRootTag.elements === undefined) {
    targetRootTag.elements = [];
  }

  docsToMerge.forEach(doc => {
    const rootTag = getRootTag(doc);
    targetRootTag.elements.push(...rootTag.elements);
  });

  // Limited workaround for https://github.com/nashwaan/xml-js/issues/22
  escapeAttributes(targetRootTag);
  targetRootTag.elements.forEach(escapeAttributes);

  return js2xml(targetDoc);
};

