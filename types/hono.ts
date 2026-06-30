import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "../db/schema";

export type AppBindings = {
  DB: D1Database;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_TOKEN?: string;
  GITHUB_APP_ID?: string;
  GITHUB_APP_PRIVATE_KEY?: string;
};

export type AppVariables = {
  db: DrizzleD1Database<typeof schema>;
};

export type AppEnv = {
  Bindings: AppBindings;
  Variables: AppVariables;
};
