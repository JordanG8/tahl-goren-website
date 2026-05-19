import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/downloads-structure.json", "utf8"));

function searchFiles(children, query) {
  const matches = [];
  for (const child of children) {
    if (child.type === "directory") {
      matches.push(...searchFiles(child.children || [], query));
    } else {
      if (child.name.toLowerCase().includes(query.toLowerCase())) {
        matches.push(child.name);
      }
    }
  }
  return matches;
}

for (const item of data) {
  if (item.type === "directory") {
    const matches = searchFiles(item.children || [], "מיכאלי");
    const matches2 = searchFiles(item.children || [], "טל");
    if (matches.length > 0 || matches2.length > 0) {
      console.log(`Folder "${item.name}" has matches:`, { מיכאלי: matches, טל: matches2 });
    }
  }
}
