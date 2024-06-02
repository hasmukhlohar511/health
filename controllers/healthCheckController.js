async function healthCheck(req, res) {
    try {
        res.status(200).json({ status: 'OK', message: 'Service is healthy' });
    } catch (error) {
        res.status(500).json({ status: 'FAIL', message: 'Service is not healthy', error: error.message });
    }
}

module.exports = {
    healthCheck
};
