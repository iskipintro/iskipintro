import { Hono } from "hono";
import type { AppBindings, AppVariables } from "../types/hono";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const authRoute = new Hono<Env>();

authRoute.get("/github/callback", async (c) => {
  const code = c.req.query("code");
  if (!code) {
    return c.html(`<html><body style="background:#0f0f0f;color:#e0e0e0;font-family:sans-serif;padding:2rem;">
      <h2>Authorization failed</h2>
      <p>No authorization code received.</p>
      <a href="/" style="color:#f59e0b;">Go back</a>
    </body></html>`);
  }

  const clientId = c.env.GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID";
  const clientSecret = c.env.GITHUB_CLIENT_SECRET || "YOUR_GITHUB_CLIENT_SECRET";

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };

    if (!tokenData.access_token) {
      return c.html(`<html><body style="background:#0f0f0f;color:#e0e0e0;font-family:sans-serif;padding:2rem;">
        <h2>Authorization failed</h2>
        <p>${tokenData.error || "Could not get access token"}</p>
        <a href="/" style="color:#f59e0b;">Go back</a>
      </body></html>`);
    }

    const token = tokenData.access_token;

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "iskipintro",
      },
    });

    const user = (await userRes.json()) as { login: string; avatar_url: string; id: number };

    return c.html(`<!DOCTYPE html>
<html><body style="background:#0f0f0f;color:#e0e0e0;font-family:sans-serif;padding:2rem;">
<script>
  localStorage.setItem('gh_token', '${token}');
  localStorage.setItem('gh_user', JSON.stringify(${JSON.stringify({ login: user.login, avatar_url: user.avatar_url })}));
  window.location.href = '/';
</script>
<p>Signed in as ${user.login}. Redirecting...</p>
</body></html>`);
  } catch (err) {
    return c.html(`<html><body style="background:#0f0f0f;color:#e0e0e0;font-family:sans-serif;padding:2rem;">
      <h2>Authorization failed</h2>
      <p>Network error during authentication.</p>
      <a href="/" style="color:#f59e0b;">Go back</a>
    </body></html>`);
  }
});

export default authRoute;
