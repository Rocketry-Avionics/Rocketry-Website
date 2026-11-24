import { news } from "@/content/news";

export default function NewsList({ limit = 7 }: { limit?: number }) {
  const items = news.slice(0, limit);

  return (
    <section
      aria-labelledby="news-heading"
      className="mx-auto w-full max-w-4xl px-4 py-16"
    >
      <div className="text-center">
        <h2 id="news-heading" className="text-3xl font-bold text-paper">
          News
        </h2>
        <p className="mt-2 text-sm text-muted">Latest updates from the team</p>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-line/50 bg-surface px-5 py-4 text-center text-sm text-muted">
          No latest updates
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 rounded-xl border border-line/50 bg-surface px-5 py-4 text-sm sm:flex-row sm:gap-4"
            >
              <span className="w-24 shrink-0 font-semibold text-sky">
                [{item.date}]
              </span>
              <span className="text-paper">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}