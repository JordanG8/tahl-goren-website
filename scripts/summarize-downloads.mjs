import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/downloads-structure.json", "utf8"));

console.log(`Total top-level items: ${data.length}\n`);

for (const item of data) {
  if (item.type === "directory") {
    const fileCount = item.children.filter(c => c.type === "file").length;
    const subDirCount = item.children.filter(c => c.type === "directory").length;
    const fileExtensions = [...new Set(item.children.filter(c => c.type === "file").map(c => c.name.split(".").pop().toLowerCase()))];
    console.log(`Directory: "${item.name}"`);
    console.log(`  Files: ${fileCount} (${fileExtensions.join(", ")})`);
    console.log(`  Subdirectories: ${subDirCount}`);
  } else {
    console.log(`File: "${item.name}" (${item.size} bytes)`);
  }
}
