import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DOWNLOADS_DIR = "C:\\Users\\yospe\\Downloads\\לאתר 2026";

function mapDirectory(dirPath) {
  try {
    const items = readdirSync(dirPath);
    const result = [];
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        result.push({
          name: item,
          type: "directory",
          children: mapDirectory(fullPath),
        });
      } else {
        result.push({
          name: item,
          type: "file",
          size: stat.size,
        });
      }
    }
    return result;
  } catch (err) {
    return { error: err.message };
  }
}

const structure = mapDirectory(DOWNLOADS_DIR);
import { writeFileSync as writeJsonFile } from "node:fs";
writeJsonFile("c:\\Users\\yospe\\OneDrive\\Documents\\GitHub\\tahl-goren-website\\scripts\\downloads-structure.json", JSON.stringify(structure, null, 2));
console.log("Wrote mapping to downloads-structure.json");

