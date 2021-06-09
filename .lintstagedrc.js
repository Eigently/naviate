const applyPrettier = (filenames) =>
  filenames.map((filename) => `npx prettier --write ${filename}`);

const applyRustFmt = (filenames) =>
  filenames.map((filename) => `rustfmt ${filename}`);

module.exports = {
  "*.js": applyPrettier,
  "*.json": applyPrettier,
  "*.ts": applyPrettier,
  "*.tsx": applyPrettier,
  "*.html": applyPrettier,
  "*.css": applyPrettier,
  "*.md": applyPrettier,
  "*.rs": applyRustFmt,
};
