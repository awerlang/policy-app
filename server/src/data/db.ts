import pg from 'pg-promise'

const pgConn = process.env.PG_CONN
if (!pgConn) {
    throw new Error('Missing database connection: $PG_CONN')
}
const db = pg()(pgConn)

export default db
