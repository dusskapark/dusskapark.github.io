import ts from "typescript";

// Metadata stays next to the React component and may use ordinary, readable
// object syntax. Evaluate only literals; never execute project code at build time.
export function contentMetadata(source, filename) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
  const statements = file.statements.filter((statement) =>
    ts.isVariableStatement(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
  );
  const declarations = statements.flatMap((statement) => statement.declarationList.declarations)
    .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === "frontmatter");
  if (declarations.length !== 1 || !declarations[0].initializer) throw new Error(`${filename}: expected one exported frontmatter object`);
  function literal(node) {
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literal(node.expression);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) return -Number(node.operand.text);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
    if (ts.isObjectLiteralExpression(node)) {
      const value = Object.create(null);
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property) || !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) throw new Error(`${filename}: metadata requires literal property assignments`);
        const name = property.name.text;
        if (Object.hasOwn(value, name)) throw new Error(`${filename}: duplicate metadata field ${name}`);
        value[name] = literal(property.initializer);
      }
      return value;
    }
    throw new Error(`${filename}: metadata must contain only literal values`);
  }
  const data = literal(declarations[0].initializer);
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`${filename}: frontmatter must be an object`);
  return data;
}
