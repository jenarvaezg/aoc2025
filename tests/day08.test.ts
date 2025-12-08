import { part1, part2 } from '../solutions/day08';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('day08', () => {
  const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;
  const realInput = readFileSync(join('inputs', 'day08.txt'), 'utf8');

  test('part1 - example', () => {
    expect(part1(exampleInput, 10)).toBe(40);
  });

  test('part2 - example', () => {
    expect(part2(exampleInput)).toBe(25272);
  });

  test('part1 - real input', () => {
    expect(part1(realInput)).toBe(52668);
  });

  test('part2 - real input', () => {
    expect(part2(realInput)).toBe(1474050600);
  });
});
