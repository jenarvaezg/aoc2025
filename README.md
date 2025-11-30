# Advent of Code 2025 - TypeScript Solutions

This repository contains my personal attempt at solving the [Advent of Code 2025](https://adventofcode.com/) programming challenges using **TypeScript**.

## Project Structure

- All solution files are in the `solutions/` directory, named as `dayXX.ts` (e.g. `day01.ts`, `day02.ts`, etc).
- Each solution file exports two functions:
  - `part1(input: string): any`
  - `part2(input: string): any`
- Puzzle inputs should be placed in the `inputs/` directory, named as `dayXX.txt` (e.g. `inputs/day01.txt`).
- **Note:** The input files are not included in this repository as requested by the Advent of Code creators.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run a day's solution (both parts):
   ```bash
   npm run run:day -- day01
   ```

3. Run only one part:
   ```bash
   npm run run:day -- day01 part1
   npm run run:day -- day01 part2
   ```

Replace `day01` with any day you wish to run.

## Inputs

- Place your input files in `inputs/dayXX.txt`.
- These files are *not* present in the repository in respect of [Advent of Code's policy](https://adventofcode.com/2025/about#faq).
