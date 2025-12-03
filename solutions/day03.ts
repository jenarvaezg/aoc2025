function pickDigits(line: string, count: number): number {
  const digits = line.split('').map(Number);
  const picked: number[] = [];

  let startIndex = 0;
  for (let remaining = count; remaining > 0; remaining--) {
    const lastPossibleStart = digits.length - remaining;
    let maxIndex = startIndex;

    for (let i = startIndex + 1; i <= lastPossibleStart; i++) {
      if (digits[i] > digits[maxIndex]) {
        maxIndex = i;
      }
    }

    picked.push(digits[maxIndex]);
    startIndex = maxIndex + 1;
  }

  return Number(picked.join(''));
}

export function part1(input: string): number {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => pickDigits(line, 2))
    .reduce((a, b) => a + b, 0);
}

export function part2(input: string): number {
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => pickDigits(line, 12))
    .reduce((a, b) => a + b, 0);
}
