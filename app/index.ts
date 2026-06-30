import { Hono } from "hono";
import { cors } from "hono/cors";
import { getDb } from "../db";
import type { AppBindings, AppVariables } from "../types/hono";
import { landingPage } from "./landing";

import searchRoute from "../routes/search";
import movieRoute from "../routes/movie";
import seriesRoute from "../routes/series";
import seasonRoute from "../routes/season";
import episodeRoute from "../routes/episode";
import markersRoute from "../routes/markers";
import popularRoute from "../routes/popular";
import recentRoute from "../routes/recent";
import statsRoute from "../routes/stats";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const app = new Hono<Env>();

app.use("*", cors());

app.use("*", async (c, next) => {
  const db = getDb(c.env.DB);
  c.set("db", db);
  await next();
});

app.get("/", (c) => c.html(landingPage));

app.get("/docs", (c) => {
  return c.html(`<!DOCTYPE html>
<html><head><title>iSkipIntro API Docs</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; color: #e0e0e0; max-width: 800px; margin: 0 auto; padding: 2rem; }
  h1 { font-size: 2.5rem; margin-bottom: 1rem; }
  h2 { margin-top: 2rem; color: #f59e0b; }
  code { background: #1e1e1e; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; }
  pre { background: #1e1e1e; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  .endpoint { margin: 1rem 0; padding: 1rem; background: #1a1a1a; border-radius: 8px; }
  .method { display: inline-block; padding: 0.2em 0.6em; border-radius: 4px; font-weight: 700; font-size: 0.8em; }
  .get { background: #2563eb; color: #fff; }
  .post { background: #059669; color: #fff; }
  table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
  th, td { text-align: left; padding: 0.5rem; border-bottom: 1px solid #333; }
  th { color: #f59e0b; }
  a { color: #f59e0b; }
</style></head><body>
<h1>iSkipIntro API v1</h1>
<p>The open playback metadata database API.</p>

<h2>Authentication</h2>
<p>Pass your API key in the <code>x-api-key</code> header.</p>
<pre>curl -H "x-api-key: YOUR_API_KEY" https://api.iskipintro.com/v1/search?q=breaking</pre>

<h2>Rate Limits</h2>
<table>
  <tr><th>Plan</th><th>Limit</th></tr>
  <tr><td>Guest</td><td>100 requests/day</td></tr>
  <tr><td>Developer</td><td>10,000 requests/day</td></tr>
  <tr><td>Enterprise</td><td>Unlimited</td></tr>
</table>

<h2>Endpoints</h2>

<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/search?q=</code>
  <p>Search for series and movies.</p>
  <pre>curl /v1/search?q=breaking+bad</pre>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/movie/{id}</code>
  <p>Get movie details. Accepts TMDB ID (number) or IMDb ID (<code>tt...</code>).</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/series/{id}</code>
  <p>Get series details with seasons list. Accepts TMDB ID or IMDb ID.</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/season/{id}</code>
  <p>Get season details with episode list.</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/episode/{id}</code>
  <p>Get episode details.</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/markers/{episode_id}</code>
  <p>Get verified markers for an episode.</p>
  <pre>{
  "intro": { "start": 41.2, "end": 132.4 },
  "recap": { "start": 0, "end": 41 },
  "credits": { "start": 3021, "end": 3101 }
}</pre>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/popular</code>
  <p>Get popular series and movies.</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/recent</code>
  <p>Get recently added markers.</p>
</div>
<div class="endpoint">
  <span class="method get">GET</span> <code>/v1/stats</code>
  <p>Get platform statistics.</p>
  <pre>{
  "series": 250,
  "episodes": 5800,
  "markers": 9100,
  "contributors": 212
}</pre>
</div>

<h2>Errors</h2>
<pre>{ "error": "Not found" }</pre>

<h2>SDK</h2>
<p>Coming soon: JavaScript, Python, Go, Rust, Swift, Kotlin</p>
</body></html>`);
});

const v1 = new Hono<Env>();

v1.route("/search", searchRoute);
v1.route("/movie", movieRoute);
v1.route("/series", seriesRoute);
v1.route("/season", seasonRoute);
v1.route("/episode", episodeRoute);
v1.route("/markers", markersRoute);
v1.route("/popular", popularRoute);
v1.route("/recent", recentRoute);
v1.route("/stats", statsRoute);

app.route("/v1", v1);

export default app;
