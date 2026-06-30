const GITHUB_API = "https://api.github.com";
const OWNER = "anomalyco";
const DATA_REPO = "iskipintro-data";

interface CreatePROptions {
  series: string;
  season: number;
  episode: number;
  episodeTitle?: string;
  markers: Array<{
    type: string;
    start: number;
    end: number;
    confidence?: number;
    source?: string;
  }>;
  contributor: string;
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 10);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${ms}`;
}

function generateYaml(opts: CreatePROptions): string {
  const lines: string[] = [];
  lines.push(`series: ${opts.series}`);
  lines.push(`season: ${opts.season}`);
  lines.push(`episode: ${opts.episode}`);
  if (opts.episodeTitle) lines.push(`title: ${opts.episodeTitle}`);
  lines.push("markers:");

  for (const m of opts.markers) {
    lines.push(`  - type: ${m.type}`);
    lines.push(`    start: ${m.start}`);
    lines.push(`    end: ${m.end}`);
    if (m.confidence !== undefined) lines.push(`    confidence: ${m.confidence}`);
    if (m.source) lines.push(`    source: ${m.source}`);
  }

  return lines.join("\n") + "\n";
}

async function ghFetch(path: string, token: string, options: Record<string, unknown> = {}) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "iskipintro",
      Accept: "application/vnd.github.v3+json",
      ...(options.headers || {}),
    },
  } as RequestInit);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${body}`);
  }

  return res.json();
}

export async function createPullRequest(
  token: string,
  opts: CreatePROptions
): Promise<{ html_url: string; number: number }> {
  const seriesSlug = slug(opts.series);
  const filePath = `data/series/${seriesSlug}/season-${String(opts.season).padStart(2, "0")}/episode-${String(opts.episode).padStart(2, "0")}.yaml`;
  const branchName = `markers/${seriesSlug}/s${opts.season}e${opts.episode}/${opts.contributor.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
  const content = generateYaml(opts);
  const encoded = btoa(content);

  // Get default branch SHA
  const repo = await ghFetch(`/repos/${OWNER}/${DATA_REPO}`, token) as { default_branch: string };
  const defaultBranch = repo.default_branch;

  const ref = await ghFetch(`/repos/${OWNER}/${DATA_REPO}/git/refs/heads/${defaultBranch}`, token) as { object: { sha: string } };
  const baseSha = ref.object.sha;

  // Create branch
  try {
    await ghFetch(`/repos/${OWNER}/${DATA_REPO}/git/refs`, token, {
      method: "POST",
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      }),
    });
  } catch {
    // Branch may already exist — continue
  }

  // Create or update file
  let existingSha: string | undefined;
  try {
    const existing = await ghFetch(`/repos/${OWNER}/${DATA_REPO}/contents/${filePath}`, token) as { sha: string };
    existingSha = existing.sha;
  } catch {
    // File doesn't exist yet — that's fine
  }

  await ghFetch(`/repos/${OWNER}/${DATA_REPO}/contents/${filePath}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add markers for ${opts.series} S${opts.season}E${opts.episode}`,
      content: encoded,
      branch: branchName,
      sha: existingSha,
    }),
  });

  // Create PR
  const pr = await ghFetch(`/repos/${OWNER}/${DATA_REPO}/pulls`, token, {
    method: "POST",
    body: JSON.stringify({
      title: `Add markers for ${opts.series} S${opts.season}E${opts.episode}`,
      body: [
        `## Marker Submission`,
        ``,
        `**Series:** ${opts.series}`,
        `**Season:** ${opts.season}`,
        `**Episode:** ${opts.episode}`,
        opts.episodeTitle ? `**Title:** ${opts.episodeTitle}` : null,
        ``,
        `**Markers:**`,
        ...opts.markers.map(
          (m) => `- **${m.type}:** ${toTimestamp(m.start)} → ${toTimestamp(m.end)}`
        ),
        ``,
        `**Submitted by:** ${opts.contributor}`,
        ``,
        `---`,
        `_Created automatically by iSkipIntro_`,
      ]
        .filter(Boolean)
        .join("\n"),
      head: branchName,
      base: defaultBranch,
    }),
  }) as { html_url: string; number: number };

  return { html_url: pr.html_url, number: pr.number };
}
