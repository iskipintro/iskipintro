import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "../db/schema";

export type AppBindings = {
  DB: D1Database;
};

export type AppVariables = {
  db: DrizzleD1Database<typeof schema>;
};

export type AppEnv = {
  Bindings: AppBindings;
  Variables: AppVariables;
};
