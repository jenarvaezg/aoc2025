import { execSync } from "child_process";

// Obtén el argumento del día (ej: day01)
const args = process.argv.slice(2);
if (!args[0]) {
    console.error("Usage: npm run day -- day01");
    process.exit(1);
}
const day = args[0];

// Ejecuta el archivo TypeScript correspondiente
try {
    execSync(`npx ts-node solutions/${day}.ts`, { stdio: "inherit" });
} catch (e) {
    console.error(`Error ejecutando solutions/${day}.ts`);
    process.exit(1);
}