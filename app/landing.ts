export const landingPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>iSkipIntro - The Open Playback Metadata Database</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f0f;
      color: #e0e0e0;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }
    p.subtitle {
      font-size: 1.25rem;
      color: #888;
      margin-bottom: 2.5rem;
      max-width: 600px;
    }
    .buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .btn {
      display: inline-block;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4); }
    .btn-secondary {
      background: #1e1e1e;
      color: #e0e0e0;
      border: 1px solid #333;
    }
    .btn-secondary:hover { background: #2a2a2a; border-color: #555; }
    .stats {
      display: flex;
      gap: 3rem;
      margin-top: 3rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .stat h2 { font-size: 2rem; color: #f59e0b; }
    .stat p { color: #666; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .footer {
      margin-top: 4rem;
      color: #444;
      font-size: 0.875rem;
    }
    .footer a { color: #f59e0b; text-decoration: none; }
    @media (max-width: 600px) {
      h1 { font-size: 2rem; }
      p.subtitle { font-size: 1rem; }
    }
  </style>
</head>
<body>
  <h1>iSkipIntro</h1>
  <p class="subtitle">The Open Playback Metadata Database — powering Skip Intro for every media player.</p>
  <div class="buttons">
    <a href="/docs" class="btn btn-primary">API Docs</a>
    <a href="/v1/search" class="btn btn-secondary">Search</a>
    <a href="/v1/stats" class="btn btn-secondary">Dashboard</a>
  </div>
  <div class="stats" id="stats">
    <div class="stat"><h2 id="series-count">-</h2><p>Series</p></div>
    <div class="stat"><h2 id="episodes-count">-</h2><p>Episodes</p></div>
    <div class="stat"><h2 id="markers-count">-</h2><p>Markers</p></div>
    <div class="stat"><h2 id="contributors-count">-</h2><p>Contributors</p></div>
  </div>
  <div class="footer">
    <a href="https://github.com/anomalyco/iskipintro" target="_blank">GitHub</a> &middot;
    <a href="/v1/stats">API v1</a> &middot;
    MIT License
  </div>
  <script>
    fetch('/v1/stats').then(r => r.json()).then(s => {
      document.getElementById('series-count').textContent = s.series;
      document.getElementById('episodes-count').textContent = s.episodes;
      document.getElementById('markers-count').textContent = s.markers;
      document.getElementById('contributors-count').textContent = s.contributors;
    }).catch(() => {});
  </script>
</body>
</html>`;
