import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

const HEADING = "PRAGMA foreign_keys = OFF;\n\n";
const FOOTER = "\nPRAGMA foreign_keys = ON;\n";

const sql = [HEADING];

sql.push(
  "DELETE FROM markers WHERE source IS NOT NULL AND source IN ('manual','jikan','anilist','kitsu','tmdb','imdb','ai');\n\n"
);

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".yaml") || entry.name.endsWith(".yml"))
      parseFile(full);
  }
}

function esc(val) {
  if (val == null) return "NULL";
  if (typeof val === "number") return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

function parseFile(file) {
  const doc = yaml.load(readFileSync(file, "utf8"));
  sql.push(`-- ${file}\n`);

  if (file.startsWith("data/series")) {
    const title = esc(doc.series);
    const slug = doc.series
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    sql.push(
      `INSERT OR IGNORE INTO series (title, slug, tmdb_id, imdb_id, mal_id, anilist_id, kitsu_id) VALUES (${title}, '${slug}', ${esc(doc.tmdb_id)}, ${esc(doc.imdb_id)}, ${esc(doc.mal_id)}, ${esc(doc.anilist_id)}, ${esc(doc.kitsu_id)});\n`
    );
    sql.push(
      `INSERT OR IGNORE INTO seasons (series_id, season_number) SELECT id, ${doc.season} FROM series WHERE title = ${title};\n`
    );
    const epTitle = esc(doc.title || "");
    sql.push(
      `INSERT OR IGNORE INTO episodes (season_id, episode_number, title) SELECT s.id, ${doc.episode}, ${epTitle} FROM seasons s JOIN series se ON s.series_id = se.id WHERE se.title = ${title} AND s.season_number = ${doc.season};\n`
    );

    for (const m of doc.markers || []) {
      const mType = esc(m.type);
      const src = esc(m.source || "manual");
      sql.push(
        `INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified, source) SELECT e.id, ${mType}, ${m.start}, ${m.end}, ${m.confidence ?? 1.0}, 1, ${src} FROM episodes e JOIN seasons s ON e.season_id = s.id JOIN series se ON s.series_id = se.id WHERE se.title = ${title} AND s.season_number = ${doc.season} AND e.episode_number = ${doc.episode};\n`
      );
    }
  }

  if (file.startsWith("data/movies")) {
    const title = esc(doc.title);
    const slug = doc.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    sql.push(
      `INSERT OR IGNORE INTO movies (title, slug, tmdb_id, imdb_id, mal_id, anilist_id, kitsu_id, year) VALUES (${title}, '${slug}', ${esc(doc.tmdb_id)}, ${esc(doc.imdb_id)}, ${esc(doc.mal_id)}, ${esc(doc.anilist_id)}, ${esc(doc.kitsu_id)}, ${esc(doc.year)});\n`
    );

    for (const m of doc.markers || []) {
      const mType = esc(m.type);
      const src = esc(m.source || "manual");
      sql.push(
        `INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified, source) SELECT m.id, ${mType}, ${m.start}, ${m.end}, ${m.confidence ?? 1.0}, 1, ${src} FROM movies m WHERE m.title = ${title};\n`
      );
    }
  }
}

walk("data/series");
walk("data/movies");

sql.push(FOOTER);

writeFileSync("deploy.sql", sql.join(""));
console.log(`Generated deploy.sql (${(sql.join("").length / 1024).toFixed(1)} KB)`);
