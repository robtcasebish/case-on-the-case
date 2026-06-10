/** Shared formatting + content helpers. */

const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(d: Date): string {
  return DATE_FMT.format(d);
}

/** Machine-readable date for <time datetime>. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Estimate reading time from raw markdown body (~225 wpm). */
export function readingTimeFromText(text: string, override?: number): number {
  if (override) return override;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/** Collapse the story collection id (which may be a file path) to a slug. */
export function storySlug(id: string): string {
  return id.replace(/\.(md|mdx)$/i, '').replace(/^.*\//, '');
}

/** Truncate to a sentence boundary near `max` chars for clean meta text. */
export function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastStop = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
  if (lastStop > max * 0.5) return slice.slice(0, lastStop + 1);
  return slice.slice(0, slice.lastIndexOf(' ')) + '…';
}
