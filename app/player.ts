export const playerPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>iSkipIntro Player Test</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f0f; color: #e0e0e0; line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 2rem; }

    h1 { font-size: 1.6rem; margin-bottom: 0.25rem; }
    h1 span { background: linear-gradient(135deg, #f59e0b, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .subtitle { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }

    .card {
      background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 0.75rem;
      padding: 1.5rem; margin-bottom: 1.5rem;
    }

    .form-row { display: flex; gap: 0.5rem; margin-bottom: 0; flex-wrap: wrap; align-items: center; }
    .form-row select, .form-row input {
      padding: 0.5rem 0.75rem; border-radius: 0.4rem;
      background: #0f0f0f; border: 1px solid #333; color: #e0e0e0;
      font-size: 0.85rem;
    }
    .form-row select { flex: 1; min-width: 160px; }
    .form-row input { width: 80px; }
    .form-row button {
      padding: 0.5rem 1rem; border-radius: 0.4rem;
      background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff;
      border: none; font-weight: 600; cursor: pointer; font-size: 0.85rem;
    }
    .form-row button:hover { opacity: 0.9; }
    .btn-outline { background: #333 !important; color: #e0e0e0 !important; }
    .btn-outline:hover { background: #444 !important; }

    .player-container { position: relative; }
    .player-wrapper {
      position: relative; width: 100%; aspect-ratio: 16 / 9;
      background: #000; border-radius: 0.5rem; overflow: hidden;
    }
    .player-wrapper video { width: 100%; height: 100%; display: block; }

    .skip-btn-overlay {
      position: absolute; bottom: 80px; right: 20px;
      padding: 0.6rem 1.2rem; border-radius: 0.4rem; border: none;
      background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff;
      font-weight: 700; font-size: 0.95rem; cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      transition: opacity 0.3s, transform 0.2s;
      opacity: 0; pointer-events: none;
      z-index: 10;
      display: flex; align-items: center; gap: 0.5rem;
    }
    .skip-btn-overlay.visible { opacity: 1; pointer-events: auto; }
    .skip-btn-overlay:hover { transform: scale(1.05); }
    .skip-btn-overlay .key {
      display: inline-block; padding: 0.1rem 0.4rem; border-radius: 0.2rem;
      background: rgba(255,255,255,0.2); font-size: 0.7rem; font-family: monospace;
    }

    .marker-bar {
      display: flex; height: 6px; margin-top: 0.4rem; border-radius: 3px; overflow: hidden;
    }
    .marker-segment { height: 100%; cursor: pointer; transition: opacity 0.2s; }
    .marker-segment:hover { opacity: 0.8; }
    .marker-intro { background: #10b981; }
    .marker-recap { background: #f59e0b; }
    .marker-credits { background: #ef4444; }
    .marker-opening { background: #8b5cf6; }
    .marker-ending { background: #ec4899; }
    .marker-other { background: #6b7280; }

    .marker-legend { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; }
    .marker-legend-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; color: #666; }
    .marker-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

    .time-display {
      font-family: monospace; font-size: 1.2rem; color: #f59e0b;
      text-align: center; margin-top: 0.5rem;
    }
    .time-display span { color: #666; }

    .marker-table { width: 100%; border-collapse: collapse; margin-top: 0.75rem; font-size: 0.85rem; }
    .marker-table th, .marker-table td { text-align: left; padding: 0.4rem 0.5rem; border-bottom: 1px solid #222; }
    .marker-table th { color: #f59e0b; font-size: 0.7rem; text-transform: uppercase; }
    .marker-table td { font-family: monospace; }
    .marker-table .skip-btn-sm {
      padding: 0.2rem 0.6rem; border-radius: 0.3rem; border: none;
      background: #2563eb; color: #fff; font-size: 0.75rem; cursor: pointer;
    }

    .status { color: #666; font-size: 0.85rem; }
    a { color: #f59e0b; text-decoration: none; }
    .footer { text-align: center; padding: 1.5rem; color: #333; font-size: 0.8rem; }
  </style>
</head>
<body>
  <div class="container">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
      <div><h1><span>iSkipIntro</span> Player</h1><p class="subtitle" style="margin:0">Test marker data against real video.</p></div>
      <div style="display:flex;gap:0.4rem;">
        <a href="/" style="font-size:0.8rem;color:#666;padding:0.3rem 0.6rem;border:1px solid #333;border-radius:0.3rem;">Home</a>
        <a href="/docs" style="font-size:0.8rem;color:#666;padding:0.3rem 0.6rem;border:1px solid #333;border-radius:0.3rem;">Docs</a>
      </div>
    </div>

    <div class="card" style="padding:0.75rem 1rem;">
      <div class="form-row">
        <select id="videoSelect">
          <option value="sintel">Sintel Trailer (W3C)</option>
          <option value="bbb">Big Buck Bunny Trailer (W3C)</option>
        </select>
        <button onclick="loadVideo()">Load Video</button>
        <button class="btn-outline" onclick="loadDemo()">Load Demo</button>
        <input id="episodeId" type="text" placeholder="ID" value="1" />
        <button class="btn-outline" onclick="loadFromApi()">Load API</button>
      </div>
    </div>

    <div class="card" style="padding:1rem;">
      <div class="player-container">
        <div class="player-wrapper">
          <video id="videoPlayer" controls preload="metadata">
            <source id="videoSource" src="" type="video/mp4" />
          </video>
          <button id="skipBtn" class="skip-btn-overlay" onclick="skipCurrent()">
            Skip <span id="skipLabel">Intro</span> <span class="key">S</span>
          </button>
        </div>
        <div id="markerBar" class="marker-bar"></div>
        <div class="marker-legend">
          <div class="marker-legend-item"><span class="marker-legend-dot marker-intro"></span> Intro</div>
          <div class="marker-legend-item"><span class="marker-legend-dot marker-recap"></span> Recap</div>
          <div class="marker-legend-item"><span class="marker-legend-dot marker-credits"></span> Credits</div>
          <div class="marker-legend-item"><span class="marker-legend-dot marker-opening"></span> Opening</div>
          <div class="marker-legend-item"><span class="marker-legend-dot marker-ending"></span> Ending</div>
          <div class="marker-legend-item"><span class="marker-legend-dot marker-other"></span> Other</div>
        </div>
        <div class="time-display">
          <span id="currentTime">0:00.0</span> / <span id="totalTime">0:00.0</span>
        </div>
      </div>
    </div>

    <div class="card" style="padding:1rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
        <h2 style="font-size:1rem;color:#f59e0b;margin:0;">Episode Info</h2>
        <div id="sourceBadge" style="font-size:0.7rem;color:#666;"></div>
      </div>
      <div id="episodeInfo" class="status" style="margin-top:0.5rem;">Click <strong>Load Demo</strong> or enter an ID and click <strong>Load API</strong>.</div>
      <div id="markerInfo" class="status" style="margin-top:0.25rem;"></div>
      <table class="marker-table">
        <thead><tr><th>Type</th><th>Start</th><th>End</th><th>Dur</th><th></th></tr></thead>
        <tbody id="markerBody"></tbody>
      </table>
    </div>

    <div class="footer">
      <a href="https://github.com/iskipintro/iskipintro">GitHub</a> &middot; MIT License
    </div>
  </div>

  <script>
    const DEMO = {
      sintel: {
        name: 'Sintel Trailer',
        video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        duration: 52,
        markers: [
          { type: 'intro', start_time: 0, end_time: 5 },
          { type: 'opening', start_time: 5, end_time: 12 },
          { type: 'recap', start_time: 30, end_time: 38 }
        ]
      },
      bbb: {
        name: 'Big Buck Bunny Trailer',
        video: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
        duration: 30,
        markers: [
          { type: 'intro', start_time: 0, end_time: 3 },
          { type: 'credits', start_time: 26, end_time: 30 }
        ]
      },
    };

    const VIDEO_URLS = {
      sintel: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      bbb: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    };

    const video = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const skipBtn = document.getElementById('skipBtn');
    const skipLabel = document.getElementById('skipLabel');
    let currentMarkers = [];
    let markersSource = '';
    let activeMarker = null;

    function fmt(s) {
      if (s == null || isNaN(s)) return '0:00.0';
      const m = Math.floor(s / 60);
      const sec = (s % 60).toFixed(1);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function shortFmt(s) { return s != null ? s.toFixed(1) + 's' : '-'; }

    function classForType(t) {
      const m = { intro: 'marker-intro', recap: 'marker-recap', credits: 'marker-credits', opening: 'marker-opening', ending: 'marker-ending' };
      return m[t] || 'marker-other';
    }

    function getActiveMarker(time) {
      if (!currentMarkers.length) return null;
      for (const m of currentMarkers) {
        if (time >= m.start_time && time < m.end_time) return m;
      }
      return null;
    }

    function updateSkipButton() {
      const marker = getActiveMarker(video.currentTime);
      activeMarker = marker;
      if (marker) {
        skipLabel.textContent = (marker.type || marker.marker_type || 'segment').replace(/_/g, ' ');
        skipBtn.classList.add('visible');
      } else {
        skipBtn.classList.remove('visible');
      }
    }

    function skipCurrent() {
      if (activeMarker) {
        video.currentTime = activeMarker.end_time;
        if (video.paused) video.play();
      }
    }

    function renderMarkers(markers, source) {
      currentMarkers = markers;
      markersSource = source || 'api';
      const body = document.getElementById('markerBody');
      const bar = document.getElementById('markerBar');

      body.innerHTML = '';
      if (!markers || !markers.length) {
        document.getElementById('markerInfo').textContent = 'No markers.';
        bar.innerHTML = '';
        document.getElementById('sourceBadge').textContent = '';
        return;
      }

      document.getElementById('sourceBadge').textContent = source === 'demo' ? 'Demo data' : 'From API';
      document.getElementById('markerInfo').textContent = markers.length + ' marker(s)';

      const dur = video.duration || Math.max(...markers.map(m => m.end_time || 0));

      let barHtml = '';
      markers.forEach(m => {
        const left = ((m.start_time || 0) / dur) * 100;
        const w = ((m.end_time - m.start_time) / dur) * 100;
        const type = (m.type || m.marker_type || 'other').toLowerCase();
        barHtml += '<div class="marker-segment ' + classForType(type) + '" style="margin-left:' + left + '%;width:' + w + '%;" title="' + type + ': ' + fmt(m.start_time) + ' - ' + fmt(m.end_time) + '" onclick="seekTo(' + m.start_time + ')"></div>';

        const tr = document.createElement('tr');
        tr.innerHTML = '<td style="text-transform:capitalize;color:#e0e0e0">' + (m.type || m.marker_type || 'unknown').replace(/_/g, ' ') + '</td>' +
          '<td>' + fmt(m.start_time) + '</td>' +
          '<td>' + fmt(m.end_time) + '</td>' +
          '<td>' + shortFmt(m.end_time - m.start_time) + '</td>' +
          '<td><button class="skip-btn-sm" onclick="seekTo(' + m.start_time + ')">Jump</button></td>';
        body.appendChild(tr);
      });
      bar.innerHTML = barHtml;
      updateSkipButton();
    }

    function seekTo(t) {
      video.currentTime = t;
      video.play();
      updateSkipButton();
    }

    function loadVideo() {
      const id = document.getElementById('videoSelect').value;
      const url = VIDEO_URLS[id];
      if (!url) return;
      videoSource.src = url;
      video.load();
      document.getElementById('episodeInfo').textContent = 'Video loaded: ' + document.getElementById('videoSelect').selectedOptions[0].text;
    }

    function loadDemo() {
      const id = document.getElementById('videoSelect').value;
      const demo = DEMO[id];
      if (!demo) return;
      videoSource.src = demo.video;
      video.load();
      document.getElementById('episodeInfo').innerHTML = '<strong>' + demo.name + '</strong>';
      renderMarkers(demo.markers, 'demo');
    }

    async function loadFromApi() {
      const epId = document.getElementById('episodeId').value.trim();
      if (!epId) return;

      const id = document.getElementById('videoSelect').value;
      videoSource.src = VIDEO_URLS[id];
      video.load();

      document.getElementById('episodeInfo').textContent = 'Loading episode ' + epId + '...';

      let epData = null, markerData = null;
      try {
        const r = await fetch('/v1/episode/' + epId);
        if (r.ok) {
          epData = await r.json();
          document.getElementById('episodeInfo').innerHTML = '<strong>' + (epData.title || 'Episode ' + epData.id) + '</strong>' +
            (epData.series_title ? ' \u2014 ' + epData.series_title : '') +
            (epData.season_number && epData.episode_number ? ' (S' + epData.season_number + 'E' + epData.episode_number + ')' : '');
        } else {
          document.getElementById('episodeInfo').textContent = 'Episode ' + epId + ' not found.';
        }
      } catch { document.getElementById('episodeInfo').textContent = 'Error loading episode.'; }

      try {
        const r = await fetch('/v1/markers/' + epId);
        if (r.ok) {
          markerData = await r.json();
          const markers = Array.isArray(markerData) ? markerData : markerData.markers || [markerData];
          renderMarkers(markers);
        } else {
          document.getElementById('markerInfo').textContent = 'No markers for this episode.';
          document.getElementById('markerBody').innerHTML = '';
          document.getElementById('markerBar').innerHTML = '';
        }
      } catch { document.getElementById('markerInfo').textContent = 'Error loading markers.'; }
    }

    video.addEventListener('timeupdate', () => {
      document.getElementById('currentTime').textContent = fmt(video.currentTime);
      document.getElementById('totalTime').textContent = fmt(video.duration);
      updateSkipButton();
    });

    video.addEventListener('loadedmetadata', () => {
      document.getElementById('totalTime').textContent = fmt(video.duration);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 's' || e.key === 'S') {
        if (activeMarker) { e.preventDefault(); skipCurrent(); }
      }
    });

    loadDemo();
  </script>
</body>
</html>`;
