import { inline, parseMarkdown, readContent } from "@/lib/markdown";

function Inline({ text }) {
  return inline(text).map((part, i) => (part.em ? <em key={i}>{part.text}</em> : <span key={i}>{part.text}</span>));
}

export default function LegalPage({ file }) {
  const blocks = parseMarkdown(readContent(file));

  return (
    <section className="legal-page">
      <div className="wrap">
        <article className="legal">
          {blocks.map((b, i) => {
            if (b.type === "h1") return <h1 key={i}>{b.text}</h1>;
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
            if (b.type === "ul")
              return (
                <ul key={i}>
                  {b.items.map((item, j) => (
                    <li key={j}>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i}>
                {b.lines.map((line, j) => (
                  <span key={j}>
                    <Inline text={line.text} />
                    {line.br ? <br /> : j < b.lines.length - 1 ? " " : null}
                  </span>
                ))}
              </p>
            );
          })}
        </article>
      </div>
    </section>
  );
}
