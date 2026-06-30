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
    }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }

    .hero { text-align: center; padding: 4rem 1rem 3rem; }
    .hero h1 {
      font-size: 3.5rem; font-weight: 800;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; margin-bottom: 0.75rem;
    }
    .hero .subtitle { font-size: 1.2rem; color: #888; margin-bottom: 2rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.7rem 1.5rem; border-radius: 0.5rem;
      font-size: 0.95rem; font-weight: 600; text-decoration: none;
      cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn-primary {
      background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(245,158,11,0.4); }
    .btn-secondary { background: #1e1e1e; color: #e0e0e0; border: 1px solid #333; }
    .btn-secondary:hover { background: #2a2a2a; border-color: #555; }

    .buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem; }

    .card {
      background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 0.75rem;
      padding: 1.5rem; margin-bottom: 1.5rem;
    }
    .card h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #f59e0b; }

    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
    .step { text-align: center; padding: 1rem; }
    .step-num { font-size: 2rem; font-weight: 800; color: #f59e0b; margin-bottom: 0.5rem; }
    .step p { color: #888; font-size: 0.9rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
    .stat-value { font-size: 2rem; font-weight: 800; color: #f59e0b; }
    .stat-label { font-size: 0.8rem; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }

    .footer { text-align: center; padding: 2rem; color: #444; font-size: 0.875rem; }
    .footer a { color: #f59e0b; text-decoration: none; }

    @media (max-width: 600px) {
      .hero h1 { font-size: 2rem; }
      .steps { grid-template-columns: 1fr; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
  <body>
    <div class="container">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
        <div></div>
        <div style="display:flex;gap:0.4rem;">
          <a href="/" style="font-size:0.8rem;color:#888;padding:0.3rem 0.6rem;border:1px solid #333;border-radius:0.3rem;">Home</a>
          <a href="/player" style="font-size:0.8rem;color:#888;padding:0.3rem 0.6rem;border:1px solid #333;border-radius:0.3rem;">Player</a>
          <a href="/docs" style="font-size:0.8rem;color:#888;padding:0.3rem 0.6rem;border:1px solid #333;border-radius:0.3rem;">Docs</a>
        </div>
      </div>
      <div class="hero">
      <h1>iSkipIntro</h1>
      <p class="subtitle">The Open Playback Metadata Database — powering Skip Intro for every media player.</p>
      <div style="margin-bottom:1.5rem;">
        <a href="https://github.com/iskipintro/iskipintro/actions/workflows/submit-marker.yml" style="
          display:inline-block; padding:1.2rem 4rem; border-radius:0.75rem;
          background:linear-gradient(135deg, #f59e0b, #ef4444); color:#fff;
          font-size:1.5rem; font-weight:800; text-decoration:none;
          box-shadow:0 0 40px rgba(245,158,11,0.3);
          transition:all 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          SUBMIT
        </a>
      </div>
      <div class="buttons">
        <a href="https://github.com/iskipintro/iskipintro/issues/new?template=submit-marker.yml" class="btn btn-secondary">📝 Submit via Issue</a>
        <a href="https://github.com/iskipintro/iskipintro/tree/main/data" class="btn btn-secondary">📂 Browse Data</a>
        <a href="/docs" class="btn btn-secondary">📖 API Docs</a>
        <a href="/player" class="btn btn-secondary">🎬 Player Test</a>
        <a href="https://github.com/iskipintro/iskipintro" class="btn btn-secondary">⭐ GitHub</a>
      </div>
    </div>

    <div class="card">
      <h2>How to contribute</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <h3>Fill the form</h3>
          <p>Click "Submit Marker" — a GitHub form opens. Enter series, episode, and timestamps.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h3>Workflow creates a PR</h3>
          <p>No forks, no Git. The YAML file is created and a pull request is opened automatically.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h3>Merged & deployed</h3>
          <p>Maintainer reviews and merges. Your contribution goes live. You get credit on GitHub.</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="stats-grid">
        <div><div class="stat-value" id="series-count">-</div><div class="stat-label">Series</div></div>
        <div><div class="stat-value" id="episodes-count">-</div><div class="stat-label">Episodes</div></div>
        <div><div class="stat-value" id="markers-count">-</div><div class="stat-label">Markers</div></div>
        <div><div class="stat-value" id="contributors-count">-</div><div class="stat-label">Contributors</div></div>
      </div>
    </div>

    <div class="footer">
      <a href="https://github.com/iskipintro/iskipintro">GitHub</a> &middot;
      <a href="/docs">API Docs</a> &middot;
      <a href="/player">Player Test</a> &middot;
      <a href="/v1/stats">Statistics</a> &middot;
      MIT License
    </div>
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
