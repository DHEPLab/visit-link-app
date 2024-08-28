export function pullAt<T>(array: T[], indexes: number | number[]): T[] {
  const removedIndexes = typeof indexes === "number" ? [indexes] : indexes;

  return array.filter((_, i) => !removedIndexes.includes(i));
}
