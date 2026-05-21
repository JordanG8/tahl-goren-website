import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const DOWNLOADS_DIR = "C:\\Users\\yospe\\Downloads\\לאתר 2026";
const PUBLIC_PROJECTS_DIR = join("public", "images", "projects");
const GALLERIES_JSON_PATH = join("src", "data", "projectGalleries.json");

const MAPPING = {
  "בית משפחת ה אור עקיבא": "h-or-akiva",
  "בית משפחת ג בנימינה": "g-binyamina",
  "בית משפחת ו גבעת עדה": "v-givat-ada-2",
  "בית משפחת ו זכרון יעקב": "v-zichron",
  "בית משפחת וו גבעת עדה": "v-givat-ada",
  "בית משפחת ז זכרון יעקב": "z-zichron",
  "בית משפחת ט מאור": "t-maor",
  "בית משפחת מ מאור": "ma-maor",
  "בית משפחת מנ במאור": "m-maor",
  "בית משפחת נ זכרון יעקב": "ni-zichron",
  "בית משפחת נו זכרון יעקב": "n-zichron-2",
  "בית משפחת נכ גן שומרון": "n-gan-shomron",
  "בית משפחת ס בנימינה": "s-binyamina",
  "בית משפחת ע משמרות": "e-mishmarot",
  "בית משפחת פ בנימינה": "p-binyamina",
  "בית משפחת פ פרדס חנה": "p-pardes-hanna",
  "בית משפחת ר אור עקיבא": "r-or-akiva",
  "בית משפחת ש מאור": "sh-maor",
  "בית משפחת ש קציר": "sh-katzir",
  "בית משפחת שב פרדס חנה": "sh-pardes-hanna",
  "בית משפחת שי מאור": "shai-maor",
  "בית משפחת שק מאור": "shak-maor"
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getAllImages(dirPath) {
  const files = [];
  try {
    const items = readdirSync(dirPath);
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...getAllImages(fullPath));
      } else {
        const ext = extname(item).toLowerCase();
        if (IMAGE_EXTS.has(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err.message);
  }
  return files;
}

async function processProject(folderName, slug) {
  const srcDirPath = join(DOWNLOADS_DIR, folderName);
  if (!existsSync(srcDirPath)) {
    console.log(`Skipping folder "${folderName}" as it doesn't exist.`);
    return [];
  }

  const imagePaths = getAllImages(srcDirPath);
  if (imagePaths.length === 0) {
    console.log(`No images found in folder "${folderName}" for project "${slug}".`);
    return [];
  }

  console.log(`Processing project "${slug}" from "${folderName}" (${imagePaths.length} images)...`);

  const destFullDir = join(PUBLIC_PROJECTS_DIR, slug, "full");
  const destOptDir = join(PUBLIC_PROJECTS_DIR, slug, "optimized");

  mkdirSync(destFullDir, { recursive: true });
  mkdirSync(destOptDir, { recursive: true });

  const galleryItems = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const originalPath = imagePaths[i];
    const originalFilename = basename(originalPath);
    const originalExt = extname(originalFilename);
    const baseNameWithoutExt = basename(originalFilename, originalExt);

    // Unoptimized full destination path
    const destFullFilename = `${baseNameWithoutExt}${originalExt}`;
    const destFullPath = join(destFullDir, destFullFilename);

    // Optimized WebP destination path
    const destOptFilename = `${baseNameWithoutExt}.webp`;
    const destOptPath = join(destOptDir, destOptFilename);

    try {
      // 1. Copy the full image as-is
      copyFileSync(originalPath, destFullPath);

      // 2. Compress and optimize image using sharp
      await sharp(originalPath)
        .resize({ width: 1920, withoutEnlargement: true }) // Max 1920 width, don't enlarge
        .webp({ quality: 80 }) // WebP format with 80% quality
        .toFile(destOptPath);

      // 3. Web URL paths
      const srcUrl = `/images/projects/${slug}/optimized/${encodeURIComponent(destOptFilename)}`;
      const fullSrcUrl = `/images/projects/${slug}/full/${encodeURIComponent(destFullFilename)}`;

      galleryItems.push({
        src: srcUrl,
        fullSrc: fullSrcUrl,
        alt: `${slug} - Image ${i + 1}`
      });

      console.log(`  [${i + 1}/${imagePaths.length}] Processed: ${originalFilename}`);
    } catch (err) {
      console.error(`  [${i + 1}/${imagePaths.length}] Failed to process "${originalFilename}":`, err.message);
    }
  }

  return galleryItems;
}

async function main() {
  const projectGalleries = {};

  for (const [folderName, slug] of Object.entries(MAPPING)) {
    const items = await processProject(folderName, slug);
    if (items.length > 0) {
      projectGalleries[slug] = items;
    }
  }

  writeFileSync(GALLERIES_JSON_PATH, JSON.stringify(projectGalleries, null, 2) + "\n");
  console.log(`\nSuccessfully wrote gallery mapping to ${GALLERIES_JSON_PATH}`);
}

main().catch(err => {
  console.error("Main execution failed:", err);
  process.exit(1);
});
