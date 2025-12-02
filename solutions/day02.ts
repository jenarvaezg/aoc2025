interface IdRange {
  first: string;
  last: string;
}
function extractIds(input: string): IdRange[] {
  return input
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [first, last] = part.split('-');
      if (!first || !last) throw new Error(`Bad id: ${part}`);
      return { first, last };
    });
}

export function part1(input: string): number {
  const uniqueIds = extractIds(input).reduce((set, { first, last }) => {
    for (let step = Number(first); step <= Number(last); step++) {
      set.add(String(step));
    }
    return set;
  }, new Set<string>());

  return Array.from(uniqueIds)
    .filter((id) => {
      if (id.length % 2 !== 0) {
        return false;
      }
      const midpoint = id.length / 2;
      const firstPart = id.slice(0, midpoint);
      const secondPart = id.slice(midpoint);
      return firstPart === secondPart;
    })
    .reduce((count, value) => count + Number(value), 0);
}

export function part2(input: string): number {
  const uniqueIds = extractIds(input).reduce((set, { first, last }) => {
    for (let step = Number(first); step <= Number(last); step++) {
      set.add(String(step));
    }
    return set;
  }, new Set<string>());

  return Array.from(uniqueIds)
    .filter((id) => {
      // window sizes from half length down to 1
      for (let size = Math.floor(id.length / 2); size >= 1; size--) {
        if (id.length % size !== 0) continue;
        const chunk = id.slice(0, size);
        if (chunk.repeat(id.length / size) === id) {
          return true;
        }
      }
      return false;
    })
    .reduce((count, value) => count + Number(value), 0);
}
