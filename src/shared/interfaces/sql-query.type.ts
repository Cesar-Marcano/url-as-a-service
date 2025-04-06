import { Pool, QueryResult } from "pg";

export type SqlQuery = (db: Pool, params?: any[]) => Promise<QueryResult>
