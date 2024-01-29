import { __, divide, join, juxt, map, modulo, pipe } from "ramda";

export function formatDuration(duration: number) {
  const TIME_60 = 60;
  return pipe(
    juxt([divide(__, TIME_60), modulo(__, TIME_60)]),
    data => map(operation => Math.trunc(operation).toString().padStart(2, "0"), data),
    join(":")
  )(duration)
}