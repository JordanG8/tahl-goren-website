import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/downloads-structure.json", "utf8"));

for (const item of data) {
  if (item.type === "directory" && item.children && item.children.length > 0) {
    console.log(`\nDirectory: "${item.name}"`);
    const files = item.children.filter(c => c.type === "file").map(c => c.name);
    console.log(`  Files:`, files.slice(0, 5), files.length > 5 ? `...and ${files.length - 5} more` : "");
  }
}
