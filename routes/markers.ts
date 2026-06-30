import { Hono } from "hono";
import type { AppBindings, AppVariables } from "../types/hono";
import { getMarkersForEpisode } from "../utils/helpers";

type Env = { Bindings: AppBindings; Variables: AppVariables };

const markersRoute = new Hono<Env>();

markersRoute.get("/:episode_id", async (c) => {
  const episode_id = Number(c.req.param("episode_id"));
  if (isNaN(episode_id)) {
    return c.json({ error: "Invalid episode ID" }, 400);
  }
  const db = c.var.db;

  const markers = await getMarkersForEpisode(db, episode_id);

  return c.json(markers);
});

export default markersRoute;
