import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/downloads-structure.json", "utf8"));

const targets = [
  "בית משפחת מנ במאור",
  "בית משפחת פ פרדס חנה",
  "בית משפחת ר אור עקיבא",
  "בית משפחת ג בנימינה",
  "בית משפחת ע משמרות",
  "בית משפחת שי מאור",
];

for (const target of targets) {
  const item = data.find(c => c.name === target);
  if (!item) {
    console.log(`Not found: ${target}`);
    continue;
  }
  console.log(`\n=== Folder: ${target} ===`);
  printChildren(item.children || [], "  ");
}

function printChildren(children, indent) {
  if (children.length === 0) {
    console.log(`${indent}(empty)`);
    return;
  }
  for (const child of children) {
    if (child.type === "directory") {
      console.log(`${indent}Dir: ${child.name}`);
      printChildren(child.children || [], indent + "  ");
    } else {
      console.log(`${indent}File: ${child.name} (${child.size} bytes)`);
    }
  }
}
