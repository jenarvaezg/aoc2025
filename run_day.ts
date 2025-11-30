const { execSync } = require("child_process");

// Obtén el argumento del día: npm run run:day -- day01
const args = process.argv.slice(2);
if (!args[0]) {
    console.error("Usage: npm run run:day -- day01");
    process.exit(1);
}
const day = args[0];

// Ejecuta el .ts correspondiente en solutions (¡ajusta si tienes otro nombre de carpeta!)
try {
    execSync(`npx ts-node solutions/${day}.ts`, { stdio: "inherit" });
} catch (e) {
    console.error(`Error ejecutando solutions/${day}.ts`);
    process.exit(1);
}