import type { ReactNode } from "react";

export function emphasize(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <b key={i} className="font-semibold text-paper">
          {part.slice(1, -1)}
        </b>
      );
    }
    return part;
  });
}
