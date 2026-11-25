import { Fragment } from 'react';

/* Renders a title line pre-split into word > clip > char spans (what main.js
   built at runtime), so GSAP can reveal it letter by letter. Screen readers
   get the plain text via aria-label on the heading. Every character is in
   the same font and style. */
export function SplitLine({ text, className }: { text: string; className: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <span className={className} aria-hidden="true">
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="word">
            {Array.from(w).map((ch, ci) => (
              <span className="clip" key={ci}>
                <span className="char">{ch}</span>
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}
