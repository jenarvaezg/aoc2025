export function part1(input: string): number {
  const [ranges, ingredients] = input.split('\n\n');
  const numberRanges = ranges
    ?.split('\n')
    .map((line) => [Number(line.split('-')[0]), Number(line.split('-')[1])]);

  return ingredients
    ?.split('\n')
    .map(Number)
    .filter((id) => numberRanges?.some(([low, high]) => id >= low && id <= high)).length;
}

type Range = Number[];

function mergeRanges(ranges: Range[], range: Range): Range[] {
  const lastEnd = ranges.at(-1)[1];

  // If range end is below last end, do nothing
  if (range[1] <= lastEnd) return ranges;
  // If range start is over last end, concat new range
  if (range[0] > lastEnd) return ranges.concat([range]);

  // Otherwise, extend current last range
  ranges.at(-1)[1] = range[1];

  return ranges;
}

export function part2(input: string): number {
  const orderedRanges = input
    .split('\n\n')[0]
    ?.split('\n')
    .map((line) => [Number(line.split('-')[0]), Number(line.split('-')[1])])
    .sort((a, b) => a[0] - b[0]);

  return orderedRanges
    .reduce((ranges, range) => mergeRanges(ranges, range), [orderedRanges.shift()])
    .reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);
}
