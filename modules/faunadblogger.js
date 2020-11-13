function logCounterType(name) {

    const counters = 'counters';
    var error;
    try {
        const faunadb = require('faunadb');
        const client = new faunadb.Client({ secret: process.env.HIPSTALOG_FAUNADB_KEY, keepAlive: false });
        const query = faunadb.query;
        
        return client.query(
            query.Create(
                query.Collection(counters),
                { data: { counterType: name }}
            )
        );   
    } catch (thisError) {
        error = thisError;
    }

    return Promise.reject({ 'error' : `D'oh: ${error}`});
}

module.exports = { logCounterType };