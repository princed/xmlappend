const xmlappend = require('../index.js');

const target = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <child/>
  <child/>
</root>`;

const doc1 = `<root>
<child-doc11/>
<child-doc12/>
</root>`;

const doc2 = `<!-- comment --><root>
<child-doc21/>
<child-doc22/>
</root>`;

describe('xmlappend', function () {
  it('should throw without params', function () {
    expect(() => xmlappend()).toThrow('At least one non-empty argument expected');
  });

  it('should throw with wrong params', function () {
    expect(() => xmlappend('', '')).toThrow('At least one non-empty argument expected');
  });

  it('should throw with wrong root xml', function () {
    expect(() => xmlappend('<!-- comment -->', '<!-- comment -->')).toThrow(`Target document doesn't contain root tag`);
  });

  it('should return the only non-empty document', function () {
    expect(xmlappend('', '<root></root>', '')).toEqual('<root></root>');
  });

  it('should throw with wrong docs xml', function () {
    expect(() => xmlappend('<root></root>', '<another></another>')).toThrow(`Not all files have expected root tag "root"`);
  });

  it('should append 1 doc', function () {
    expect(xmlappend(target, doc1)).toMatchSnapshot();
  });

  it('should append 1 doc with comment', function () {
    expect(xmlappend(target, doc2)).toMatchSnapshot();
  });

  it('should append 2 docs', function () {
    expect(xmlappend(target, doc1, doc2)).toMatchSnapshot();
  });

  it('should append 2 docs in different order', function () {
    expect(xmlappend(target, doc2, doc1)).toMatchSnapshot();
  });
});
