import { Pool, QueryResult, QueryResultRow } from "pg";

export type SqlQuery<T extends QueryResultRow> = (db: Pool, params: any[]) => Promise<QueryResult<T>>
