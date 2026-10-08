/**
 * Calcul des creneaux libres d'une salle sur une journee.
 *
 * Faute d'horaires d'ouverture dans le modele de salle, la journee couvre
 * [00:00:00Z, 00:00:00Z le lendemain[. La fenetre est un choix de conception :
 * si des horaires arrivent un jour, c'est ici qu'il faudra les appliquer.
 */

export interface Slot {
  startsAt: string;
  endsAt: string;
}

export interface DayRange {
  ok: boolean;
  value: { start: number; end: number };
  error?: string;
}

/** Convertit une date `YYYY-MM-DD` en bornes UTC de la journee, ou explique pourquoi elle est invalide. */
export function parseDay(date: string): DayRange {
  const invalid: DayRange = {
    ok: false,
    value: { start: 0, end: 0 },
    error: `date invalide : ${date}`
  };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return invalid;
  }
  const [year, month, day] = date.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);
  const probe = new Date(start);
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== month - 1 ||
    probe.getUTCDate() !== day
  ) {
    return invalid;
  }
  return { ok: true, value: { start, end: Date.UTC(year, month - 1, day + 1) } };
}

/** Rend un instant en ISO 8601 UTC a la seconde, comme le reste du depot. */
function toIso(ms: number): string {
  return new Date(ms).toISOString().replace(/\.\d{3}Z$/, "Z");
}

/** Renvoie les creneaux libres d'une journee, complement des creneaux occupes (recouvrements et bornes mitoyennes fusionnes). */
export function computeFreeSlots(
  dayStart: number,
  dayEnd: number,
  busy: ReadonlyArray<{ startsAt: string; endsAt: string }>
): Slot[] {
  const clipped = busy
    .map((b) => ({ start: Date.parse(b.startsAt), end: Date.parse(b.endsAt) }))
    .filter((b) => Number.isFinite(b.start) && Number.isFinite(b.end))
    .map((b) => ({ start: Math.max(b.start, dayStart), end: Math.min(b.end, dayEnd) }))
    .filter((b) => b.start < b.end)
    .sort((a, b) => a.start - b.start);

  const free: Slot[] = [];
  let cursor = dayStart;
  for (const b of clipped) {
    if (b.start > cursor) {
      free.push({ startsAt: toIso(cursor), endsAt: toIso(b.start) });
    }
    cursor = Math.max(cursor, b.end);
  }
  if (cursor < dayEnd) {
    free.push({ startsAt: toIso(cursor), endsAt: toIso(dayEnd) });
  }
  return free;
}

export default computeFreeSlots;
