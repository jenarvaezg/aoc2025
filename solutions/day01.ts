const MOD = 100;

export function part1(input: string): number {
  const movements = input.split('\n');
  let zero_count = 0;
  let position = 50;
  movements.forEach((move) => {
    const direction = move[0] == 'L' ? -1 : 1;
    const steps = parseInt(move.slice(1));
    position = (position + direction * steps + MOD) % MOD;
    if (position == 0) {
      zero_count += 1;
    }
  });
  return zero_count;
}

export function part2(input: string): number {
  const movements = input.split('\n');
  let zero_count = 0;
  let position = 50;

  movements.forEach((move) => {
    const direction = move[0] === 'L' ? -1 : 1;
    const steps = parseInt(move.slice(1));

    let steps_to_first_zero: number;

    if (direction === 1) {
      steps_to_first_zero = MOD - position;
    } else {
      steps_to_first_zero = position === 0 ? MOD : position;
    }

    if (steps >= steps_to_first_zero) {
      zero_count += 1;
      const remaining_steps = steps - steps_to_first_zero;
      zero_count += Math.floor(remaining_steps / MOD);
    }

    position = (position + direction * steps) % MOD;
    if (position < 0) {
      position += MOD;
    }
  });
  return zero_count;
}
