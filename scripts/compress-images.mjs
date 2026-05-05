import sharp from 'sharp'
import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

const MAX_WIDTH = 1920
const WEBP_QUALITY = 82

let totalBefore = 0
let totalAfter = 0
let count = 0

function walk(dir) {
  readdirSync(dir).forEach(file => {
    const full = join(dir, file)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full)
    } else {
      const ext = extname(file).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        processImage(full, stat.size)
      }
    }
  })
}

async function processImage(src, originalSize) {
  const dir = dirname(src)
  const name = basename(src, extname(src))
  const dest = join(dir, name + '.webp')

  // Skip if WebP already exists and is newer
  if (existsSync(dest)) {
    const destStat = statSync(dest)
    if (destStat.mtimeMs > statSync(src).mtimeMs) {
      console.log(`  SKIP  ${src.replace(PUBLIC, '')}`)
      return
    }
  }

  try {
    const info = await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(dest)

    totalBefore += originalSize
    totalAfter += info.size
    count++

    const ratio = ((1 - info.size / originalSize) * 100).toFixed(0)
    const before = (originalSize / 1024 / 1024).toFixed(1)
    const after = (info.size / 1024).toFixed(0)
    console.log(`  ✓  ${src.replace(PUBLIC, '').padEnd(70)} ${before}MB → ${after}KB  (-${ratio}%)`)
  } catch (err) {
    console.error(`  ✗  ${src.replace(PUBLIC, '')}: ${err.message}`)
  }
}

console.log('Compressing images to WebP...\n')
walk(PUBLIC)

// Wait for all async ops (walk is sync but sharp is async — re-do with async walk)
import { readdir, stat as fsStat } from 'fs/promises'

async function walkAsync(dir) {
  const entries = await readdir(dir)
  await Promise.all(entries.map(async file => {
    const full = join(dir, file)
    const s = await fsStat(full)
    if (s.isDirectory()) {
      await walkAsync(full)
    } else {
      const ext = extname(file).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await processImage(full, s.size)
      }
    }
  }))
}

totalBefore = 0
totalAfter = 0
count = 0

walkAsync(PUBLIC).then(() => {
  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)
  const savedPct = ((1 - totalAfter / totalBefore) * 100).toFixed(0)
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`Processed: ${count} images`)
  console.log(`Before:    ${(totalBefore / 1024 / 1024).toFixed(1)} MB`)
  console.log(`After:     ${(totalAfter / 1024 / 1024).toFixed(1)} MB`)
  console.log(`Saved:     ${savedMB} MB  (-${savedPct}%)`)
}).catch(err => console.error(err))
