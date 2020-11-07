function logCounterType(name) {

    const counters = 'counters';
    
    const faunadb = require('faunadb');
    const client = new faunadb.Client({ secret: process.env.HIPSTALOG_FAUNADB_KEY, keepAlive: false });
    const query = faunadb.query;

    return client.query(
        query.Create(
            query.Collection(counters),
            { data: { counterType: name }}
        )
    );
}

module.exports = { logCounterType };