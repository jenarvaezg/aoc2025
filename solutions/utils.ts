import { readFileSync } from 'fs';
import { join } from 'path';

export function readDayInput(day: string): string {
  const filename = join(__dirname, '..', 'inputs', `${day}.txt`);
  return readFileSync(filename, 'utf8');    
}
