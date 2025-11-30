import { readFileSync } from "fs";
import { join } from "path";

// Arguments: npm run run:day -- dayXX [part1|part2]
const args = process.argv.slice(2);
if (!args[0]) {
    console.error("Usage: npm run run:day -- dayXX [part1|part2]");
    process.exit(1);
}
const day = args[0];
const part = args[1]; // Optional: 'part1' or 'part2'

const inputPath = join("inputs", `${day}.txt`);
let input: string;
try {
    input = readFileSync(inputPath, "utf-8");
} catch (e) {
    console.error(`Could not read input file (${inputPath})`);
    process.exit(1);
}

// Dynamically require the day module; works well with ts-node
let mod;
try {
    mod = require(`./solutions/${day}.ts`);
    if (part === "part1" || !part) {
        if (typeof mod.part1 === "function") {
            const result1 = mod.part1(input);
            console.log(`[${day} - Part 1]:`, result1);
        } else {
            console.error(`Function 'part1' is not exported from ${day}.ts`);
        }
    }
    if (part === "part2" || !part) {
        if (typeof mod.part2 === "function") {
            const result2 = mod.part2(input);
            console.log(`[${day} - Part 2]:`, result2);
        } else {
            console.error(`Function 'part2' is not exported from ${day}.ts`);
        }
    }
} catch (e) {
    console.error(`Failed to import or execute ./solutions/${day}.ts`);
    console.error(e);
    process.exit(1);
}