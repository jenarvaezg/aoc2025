import { readFileSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);
if (!args[0]) {
    console.error("Usage: npm run run:day -- dayXX [part1|part2]");
    process.exit(1);
}
const day = args[0];
const part = args[1];

(async () => {
    const dayModulePath = join(process.cwd(), "solutions", `${day}.ts`);
    const inputPath = join(process.cwd(), "inputs", `${day}.txt`);
    let input: string;
    try {
        input = readFileSync(inputPath, "utf-8");
    } catch (e) {
        console.error(`No se pudo leer el archivo de input (${inputPath})`);
        process.exit(1);
    }

    try {
        // @ts-ignore
        const mod = await import(dayModulePath);

        if (part === "part1" || !part) {
            if (typeof mod.part1 === "function") {
                const result1 = mod.part1(input);
                console.log(`[${day} - Part 1]:`, result1);
            } else {
                console.error(`La función part1 no está exportada desde ${day}.ts`);
            }
        }
        if (part === "part2" || !part) {
            if (typeof mod.part2 === "function") {
                const result2 = mod.part2(input);
                console.log(`[${day} - Part 2]:`, result2);
            } else {
                console.error(`La función part2 no está exportada desde ${day}.ts`);
            }
        }
    } catch (e) {
        console.error(`No se pudo importar o ejecutar ${dayModulePath}`);
        console.error(e);
        process.exit(1);
    }
})();