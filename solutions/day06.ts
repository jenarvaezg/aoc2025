export function part1(input: string): number {
  const lines = input.split('\n').map((line) => line.split(/\s/).filter((x) => x != ''));
  const operations = lines.pop()!;
  let total = 0;
  for (let i = 0; i < lines[0]?.length!; i++) {
    const numbers = lines.map((line) => Number(line[i]));
    const operation = operations[i]!;
    total += numbers.reduce(
      (acc, curr) => (operation === '+' ? acc + curr : acc * curr),
      operation === '+' ? 0 : 1
    );
  }

  return total;
}

function processProblem(problem: string[][]): number {
  const operation = problem.map((line) => line.pop()).filter((v) => v != ' ')[0]!;

  return problem
    .map((line) => Number(line.join('')))
    .reduce(
      (acc, curr) => (operation === '+' ? acc + curr : acc * curr),
      operation === '+' ? 0 : 1
    );
}

export function part2(input: string): number {
  const lines = input.split('\n');

  let currentProblemColumns: string[][] = [];
  let total = 0;
  for (let i = 0; i < lines[0]!.length; i++) {
    const currentColumn = lines.map((line) => line[i]!);
    if (currentColumn.every((v) => v == ' ')) {
      total += processProblem(currentProblemColumns);
      currentProblemColumns = [];
    } else {
      currentProblemColumns.push(currentColumn);
    }
  }
  if (currentProblemColumns.length) {
    total += processProblem(currentProblemColumns);
  }

  return total;
}
