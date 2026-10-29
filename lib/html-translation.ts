// Keep each text node small enough for slower AI-compatible proxies.
const MAX_TEXT_BYTES = 2400;
const SKIP_TAGS = new Set(["script", "style", "pre", "code", "svg", "noscript"]);
const encoder = new TextEncoder();

/** AI output is plain text; never allow it to create markup inside a post. */
export function escapeHtmlText(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function splitTranslationText(text: string): string[] {
  if (encoder.encode(text).length <= MAX_TEXT_BYTES) return [text];
  const parts: string[] = [];
  let rest = text;
  while (rest) {
    let low = 1;
    let high = Math.min(rest.length, MAX_TEXT_BYTES);
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (encoder.encode(rest.slice(0, middle)).length <= MAX_TEXT_BYTES) low = middle;
      else high = middle - 1;
    }
    let end = low;
    if (end < rest.length && /[\uD800-\uDBFF]/.test(rest[end - 1])) end--;
    if (end < rest.length) {
      const boundary = Math.max(rest.lastIndexOf("。", end), rest.lastIndexOf(". ", end), rest.lastIndexOf(" ", end));
      if (boundary > end / 2) end = boundary + (rest[boundary] === " " ? 1 : rest[boundary] === "." ? 2 : 1);
    }
    parts.push(rest.slice(0, end));
    rest = rest.slice(end);
  }
  return parts;
}

export function prepareHtmlTranslation(html: string): { tokens: string[]; indices: number[] } {
  const tokens = html.match(/<!--[\s\S]*?-->|<[^>]*>|[^<]+|</g) || [];
  const indices: number[] = [];
  const skipStack: string[] = [];
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.startsWith("<")) {
      const closing = /^<\s*\/\s*([\w:-]+)/.exec(token);
      if (closing && skipStack.at(-1) === closing[1].toLowerCase()) skipStack.pop();
      const opening = /^<\s*([\w:-]+)/.exec(token);
      if (opening && SKIP_TAGS.has(opening[1].toLowerCase()) && !token.endsWith("/>")) {
        skipStack.push(opening[1].toLowerCase());
      }
    } else if (skipStack.length === 0 && token.trim()) {
      indices.push(index);
    }
  }
  return { tokens, indices };
}
