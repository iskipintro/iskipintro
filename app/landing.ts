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

    /* Hero */
    .hero { text-align: center; padding: 4rem 1rem 3rem; }
    .hero h1 {
      font-size: 3.5rem; font-weight: 800;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; margin-bottom: 0.75rem;
    }
    .hero .subtitle { font-size: 1.2rem; color: #888; margin-bottom: 2rem; }
    .hero-buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }

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
    .btn-ghost { background: none; color: #f59e0b; border: 1px solid #f59e0b; }
    .btn-ghost:hover { background: rgba(245,158,11,0.1); }

    /* Cards */
    .card {
      background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 0.75rem;
      padding: 1.5rem; margin-bottom: 1.5rem;
    }
    .card h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #f59e0b; }
    .card h3 { font-size: 1rem; margin-bottom: 0.75rem; color: #ccc; }

    /* Form */
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-size: 0.875rem; color: #999; margin-bottom: 0.3rem; font-weight: 500; }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; padding: 0.6rem 0.8rem; border-radius: 0.4rem;
      background: #0f0f0f; border: 1px solid #333; color: #e0e0e0;
      font-size: 0.95rem; font-family: inherit;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      outline: none; border-color: #f59e0b;
    }
    .form-group textarea { resize: vertical; min-height: 60px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .marker-type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
    .marker-type-btn {
      padding: 0.5rem; text-align: center; border-radius: 0.4rem;
      background: #0f0f0f; border: 1px solid #333; color: #888;
      cursor: pointer; font-size: 0.8rem; font-weight: 500; transition: all 0.15s;
    }
    .marker-type-btn:hover { border-color: #555; color: #ccc; }
    .marker-type-btn.active { border-color: #f59e0b; color: #f59e0b; background: rgba(245,158,11,0.1); }

    /* Search */
    .search-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .search-bar input { flex: 1; padding: 0.6rem 0.8rem; border-radius: 0.4rem;
      background: #0f0f0f; border: 1px solid #333; color: #e0e0e0; font-size: 0.95rem; }
    .search-bar input:focus { outline: none; border-color: #f59e0b; }
    .search-results { list-style: none; }
    .search-results li { padding: 0.6rem 0; border-bottom: 1px solid #2a2a2a; cursor: pointer; }
    .search-results li:hover { color: #f59e0b; }
    .search-results li:last-child { border-bottom: none; }
    .search-type { font-size: 0.75rem; color: #666; text-transform: uppercase; }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; }
    .stat-value { font-size: 2rem; font-weight: 800; color: #f59e0b; }
    .stat-label { font-size: 0.8rem; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }

    /* Sections */
    .section { margin-bottom: 2rem; }
    .section-title { font-size: 1.1rem; color: #f59e0b; margin-bottom: 1rem; border-bottom: 1px solid #2a2a2a; padding-bottom: 0.5rem; }

    /* Messages */
    .msg { padding: 0.75rem 1rem; border-radius: 0.4rem; margin-bottom: 1rem; font-size: 0.9rem; display: none; }
    .msg-success { background: rgba(5,150,105,0.15); border: 1px solid #059669; color: #6ee7b7; display: block; }
    .msg-error { background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #fca5a5; display: block; }
    .msg-info { background: rgba(37,99,235,0.15); border: 1px solid #2563eb; color: #93c5fd; display: block; }

    /* Footer */
    .footer { text-align: center; padding: 2rem; color: #444; font-size: 0.875rem; }
    .footer a { color: #f59e0b; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    /* GitHub badge */
    .gh-user { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #1a1a1a; border-radius: 2rem; font-size: 0.85rem; }
    .gh-user img { width: 24px; height: 24px; border-radius: 50%; }
    .hidden { display: none; }

    @media (max-width: 600px) {
      .hero h1 { font-size: 2rem; }
      .form-row { grid-template-columns: 1fr; }
      .marker-type-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Hero -->
    <div class="hero">
      <h1>iSkipIntro</h1>
      <p class="subtitle">The Open Playback Metadata Database — powering Skip Intro for every media player.</p>
      <div class="hero-buttons">
        <button class="btn btn-primary" onclick="showTab('submit')">➕ Submit Marker</button>
        <button class="btn btn-secondary" onclick="showTab('search')">🔍 Search</button>
        <a href="/docs" class="btn btn-secondary">📖 API Docs</a>
        <a href="https://github.com/anomalyco/iskipintro-data" class="btn btn-ghost" target="_blank">⭐ Contribute</a>
      </div>
    </div>

    <!-- Stats -->
    <div class="card">
      <div class="stats-grid">
        <div><div class="stat-value" id="series-count">-</div><div class="stat-label">Series</div></div>
        <div><div class="stat-value" id="episodes-count">-</div><div class="stat-label">Episodes</div></div>
        <div><div class="stat-value" id="markers-count">-</div><div class="stat-label">Markers</div></div>
        <div><div class="stat-value" id="contributors-count">-</div><div class="stat-label">Contributors</div></div>
      </div>
    </div>

    <!-- GitHub Login -->
    <div id="gh-section" class="card" style="text-align:center;padding:1rem;">
      <div id="gh-logged-out">
        <p style="color:#888;margin-bottom:0.75rem;">Sign in with GitHub to submit markers</p>
        <button class="btn btn-secondary" onclick="loginWithGitHub()">Sign in with GitHub</button>
      </div>
      <div id="gh-logged-in" class="hidden">
        <div style="display:flex;align-items:center;justify-content:center;gap:1rem;">
          <div class="gh-user">
            <img id="gh-avatar" src="" alt="" />
            <span id="gh-name"></span>
          </div>
          <button class="btn btn-ghost" onclick="logout()" style="font-size:0.8rem;padding:0.4rem 1rem;">Sign out</button>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div id="msg" class="msg"></div>

    <!-- Submit Marker Tab -->
    <div id="tab-submit" class="card hidden">
      <h2>Submit Marker</h2>
      <p style="color:#666;font-size:0.9rem;margin-bottom:1rem;">
        Your submission will be saved as a YAML file and opened as a pull request on GitHub. You get credit, maintainers review it.
      </p>

      <div id="submit-source" class="form-row">
        <div class="form-group">
          <label>Source</label>
          <select id="submit-source-type" onchange="toggleSourceFields()">
            <option value="series">TV Series / Anime</option>
            <option value="movie">Movie</option>
          </select>
        </div>
      </div>

      <div id="series-fields">
        <div class="form-row">
          <div class="form-group">
            <label>Series</label>
            <input id="submit-series" type="text" placeholder="Breaking Bad" list="series-list" />
            <datalist id="series-list"></datalist>
          </div>
          <div class="form-row" style="gap:0.5rem;">
            <div class="form-group">
              <label>Season</label>
              <input id="submit-season" type="number" min="1" placeholder="1" />
            </div>
            <div class="form-group">
              <label>Episode</label>
              <input id="submit-episode" type="number" min="1" placeholder="1" />
            </div>
          </div>
        </div>
      </div>

      <div id="movie-fields" class="hidden">
        <div class="form-group">
          <label>Movie</label>
          <input id="submit-movie" type="text" placeholder="Pulp Fiction" list="movie-list" />
          <datalist id="movie-list"></datalist>
        </div>
      </div>

      <div class="form-group">
        <label>Marker Type</label>
        <div class="marker-type-grid" id="marker-types">
          <div class="marker-type-btn" data-type="INTRO" onclick="selectType(this)">🎬 Intro</div>
          <div class="marker-type-btn" data-type="RECAP" onclick="selectType(this)">🔄 Recap</div>
          <div class="marker-type-btn" data-type="OPENING" onclick="selectType(this)">🎵 Opening</div>
          <div class="marker-type-btn" data-type="ENDING" onclick="selectType(this)">🎵 Ending</div>
          <div class="marker-type-btn" data-type="CREDITS" onclick="selectType(this)">📜 Credits</div>
          <div class="marker-type-btn" data-type="POST_CREDIT" onclick="selectType(this)">🍿 Post Credit</div>
          <div class="marker-type-btn" data-type="LOGO" onclick="selectType(this)">🏷️ Logo</div>
          <div class="marker-type-btn" data-type="OTHER" onclick="selectType(this)">❓ Other</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Start</label>
          <input id="submit-start" type="text" placeholder="00:01:30.0 or 90" />
        </div>
        <div class="form-group">
          <label>End</label>
          <input id="submit-end" type="text" placeholder="00:02:11.8 or 131.8" />
        </div>
      </div>

      <div class="form-group">
        <label>Comment (optional)</label>
        <textarea id="submit-comment" placeholder="e.g. Classic cold open with the RV in the desert"></textarea>
      </div>

      <button class="btn btn-primary" onclick="submitMarker()" id="submit-btn">Submit</button>
    </div>

    <!-- Search Tab -->
    <div id="tab-search" class="card hidden">
      <h2>Search</h2>
      <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search series and movies..." onkeydown="if(event.key==='Enter')doSearch()" />
        <button class="btn btn-secondary" onclick="doSearch()">Search</button>
      </div>
      <div id="search-results"></div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <a href="https://github.com/anomalyco/iskipintro" target="_blank">GitHub</a> &middot;
      <a href="/docs">API Docs</a> &middot;
      <a href="/v1/stats">Statistics</a> &middot;
      <a href="https://github.com/anomalyco/iskipintro-data" target="_blank">Data Repository</a> &middot;
      MIT License
    </div>

  </div>

  <script>
    // Tab switching
    function showTab(name) {
      document.getElementById('tab-submit').classList.add('hidden');
      document.getElementById('tab-search').classList.add('hidden');
      document.getElementById('tab-' + name).classList.remove('hidden');
    }

    // Marker type selection
    let selectedType = null;
    function selectType(el) {
      document.querySelectorAll('.marker-type-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      selectedType = el.dataset.type;
    }

    // Source toggle
    function toggleSourceFields() {
      const val = document.getElementById('submit-source-type').value;
      document.getElementById('series-fields').classList.toggle('hidden', val !== 'series');
      document.getElementById('movie-fields').classList.toggle('hidden', val !== 'movie');
    }

    // Timestamp parsing
    function parseTimestamp(s) {
      s = s.trim();
      if (!isNaN(s)) return parseFloat(s);
      const parts = s.split(':');
      if (parts.length === 3) {
        const [h, m, sec] = parts;
        return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(sec);
      }
      if (parts.length === 2) {
        const [m, sec] = parts;
        return parseInt(m) * 60 + parseFloat(sec);
      }
      return NaN;
    }

    // GitHub login
    let ghToken = localStorage.getItem('gh_token');
    let ghUser = JSON.parse(localStorage.getItem('gh_user') || 'null');

    function updateGhUI() {
      if (ghToken && ghUser) {
        document.getElementById('gh-logged-out').classList.add('hidden');
        document.getElementById('gh-logged-in').classList.remove('hidden');
        document.getElementById('gh-avatar').src = ghUser.avatar_url;
        document.getElementById('gh-name').textContent = ghUser.login;
      } else {
        document.getElementById('gh-logged-out').classList.remove('hidden');
        document.getElementById('gh-logged-in').classList.add('hidden');
      }
    }
    updateGhUI();

    function loginWithGitHub() {
      // Redirect to GitHub OAuth (configured in your GitHub App)
      const clientId = 'YOUR_GITHUB_CLIENT_ID';
      const redirectUri = window.location.origin + '/auth/github/callback';
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=public_repo';
    }

    function logout() {
      localStorage.removeItem('gh_token');
      localStorage.removeItem('gh_user');
      ghToken = null;
      ghUser = null;
      updateGhUI();
    }

    // Submit marker
    async function submitMarker() {
      if (!ghToken || !ghUser) {
        showMsg('Please sign in with GitHub first', 'error');
        return;
      }
      if (!selectedType) {
        showMsg('Please select a marker type', 'error');
        return;
      }

      const sourceType = document.getElementById('submit-source-type').value;
      let series, season, episode, movieTitle;

      if (sourceType === 'series') {
        series = document.getElementById('submit-series').value.trim();
        season = parseInt(document.getElementById('submit-season').value);
        episode = parseInt(document.getElementById('submit-episode').value);
        if (!series || !season || !episode) {
          showMsg('Please fill in series, season, and episode', 'error');
          return;
        }
      } else {
        movieTitle = document.getElementById('submit-movie').value.trim();
        if (!movieTitle) {
          showMsg('Please enter a movie title', 'error');
          return;
        }
      }

      const startStr = document.getElementById('submit-start').value;
      const endStr = document.getElementById('submit-end').value;
      const start = parseTimestamp(startStr);
      const end = parseTimestamp(endStr);

      if (isNaN(start) || isNaN(end)) {
        showMsg('Invalid start or end time', 'error');
        return;
      }
      if (start >= end) {
        showMsg('Start must be before end', 'error');
        return;
      }

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.textContent = 'Submitting...';

      try {
        const body = {
          token: ghToken,
          series: series,
          season: season,
          episode: episode,
          markers: [{ type: selectedType, start, end, source: 'manual' }]
        };

        const res = await fetch('/v1/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        if (res.ok && data.pr_url) {
          showMsg(
            'Pull request created! <a href="' + data.pr_url + '" target="_blank" style="color:#f59e0b;">View on GitHub</a>',
            'success'
          );
        } else {
          showMsg(data.error || 'Submission failed', 'error');
        }
      } catch (e) {
        showMsg('Network error: ' + e.message, 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Submit';
      }
    }

    // Search
    async function doSearch() {
      const q = document.getElementById('search-input').value.trim();
      if (!q) return;

      const res = await fetch('/v1/search?q=' + encodeURIComponent(q));
      const data = await res.json();
      const container = document.getElementById('search-results');

      if (data.length === 0) {
        container.innerHTML = '<p style="color:#666;">No results found.</p>';
        return;
      }

      container.innerHTML = '<ul class="search-results">' + data.map(item =>
        '<li onclick="showTab(\'submit\')">' +
          '<div class="search-type">' + item.type + '</div>' +
          '<div>' + item.title + (item.year ? ' (' + item.year + ')' : '') + '</div>' +
        '</li>'
      ).join('') + '</ul>';
    }

    // Message
    function showMsg(text, type) {
      const el = document.getElementById('msg');
      el.className = 'msg msg-' + type;
      el.innerHTML = text;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 10000);
    }

    // Load stats
    fetch('/v1/stats').then(r => r.json()).then(s => {
      document.getElementById('series-count').textContent = s.series;
      document.getElementById('episodes-count').textContent = s.episodes;
      document.getElementById('markers-count').textContent = s.markers;
      document.getElementById('contributors-count').textContent = s.contributors;
    }).catch(() => {});

    // Load series list for autocomplete
    async function loadSeriesList() {
      try {
        const res = await fetch('/v1/search?q=a');
        const data = await res.json();
        const seriesList = document.getElementById('series-list');
        data.filter(i => i.type === 'series').forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.title;
          seriesList.appendChild(opt);
        });
      } catch {}
    }
    loadSeriesList();
  </script>
</body>
</html>`;
