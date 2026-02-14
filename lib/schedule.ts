export function parseYMD(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isWeekend(d: Date) {
  const day = d.getDay(); // 0 Sun ... 6 Sat
  return day === 0 || day === 6;
}

export function weekdayIndex(shipDate: Date, today: Date) {
  const start = new Date(shipDate.getFullYear(), shipDate.getMonth(), shipDate.getDate());
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (end < start) return 1;

  let count = 0;
  const cur = new Date(start);

  while (cur <= end) {
    if (!isWeekend(cur)) count++;
    cur.setDate(cur.getDate() + 1);
  }

  return Math.max(1, count);
}

export function sequenceForToday(dayIndex: number, totalCuts: number) {
  return ((dayIndex - 1) % totalCuts) + 1;
}