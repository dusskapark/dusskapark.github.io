import ts from "typescript";

// Inspect static JSX attributes without executing project code. Dynamic
// expressions need an explicit asset or preview entry and are not evaluated.
export function jsxAttributes(source, filename) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX);
  const attributes = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      for (const attribute of node.attributes.properties) {
        if (!ts.isJsxAttribute(attribute) || !attribute.initializer) continue;
        const initial = ts.isJsxExpression(attribute.initializer) ? attribute.initializer.expression : attribute.initializer;
        if (initial && (ts.isStringLiteral(initial) || ts.isNoSubstitutionTemplateLiteral(initial))) {
          attributes.push({ tag: node.tagName.getText(file), name: attribute.name.getText(file), value: initial.text });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return attributes;
}
