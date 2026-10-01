import { readFileSync } from "node:fs";
import path from "node:path";

// Small markdown reader for the legal pages. Supports: # ## ### headings,
// paragraphs, "- " bullet lists, *italic*, and two trailing spaces for a line break.
// Returns simple blocks that the page turns into HTML.

export function readContent(file) {
  return readFileSync(path.join(process.cwd(), "content", file), "utf8");
}

export function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let para = null;
  let list = null;

  const flush = () => {
    if (para) blocks.push({ type: "p", lines: para });
    if (list) blocks.push({ type: "ul", items: list });
    para = null;
    list = null;
  };

  for (const raw of lines) {
    const heading = raw.match(/^(#{1,3})\s+(.*)$/);
    const bullet = raw.match(/^-\s+(.*)$/);

    if (!raw.trim()) {
      flush();
    } else if (heading) {
      flush();
      blocks.push({ type: "h" + heading[1].length, text: heading[2].trim() });
    } else if (bullet) {
      if (para) flush();
      list = list || [];
      list.push(bullet[1].trim());
    } else {
      if (list) flush();
      para = para || [];
      para.push({ text: raw.trim(), br: / {2,}$/.test(raw) });
    }
  }
  flush();
  return blocks;
}

// Splits "some *italic* text" into [{text, em}] pieces.
export function inline(text) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 2
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    );
}
