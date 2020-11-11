import { logCounterType } from '../modules/faunadblogger.js';

function theCallerIsAllowedToUseTheLog(secretKey) {
    return secretKey === process.env.HIPSTALOG_CALLER_KEY;
}

// function theQueryParameterIsCorrect(queryParameter) {
// }

module.exports = (req, res) => {
    const doh = `D'oh. ಠ_ಠ`;
    const xLoggerSecret = 'x-logger-secret';
    
    if (theCallerIsAllowedToUseTheLog(req.headers[xLoggerSecret])) {
        const name = req.query.counterType;
        const now = new Date();
        logCounterType(name).then(ret => {
            res.status(200).json({ 'message': `Created new '${name}' entry (${now})` });
        });
        return;
    }
    res.status(403).json({ 'error': doh });
}