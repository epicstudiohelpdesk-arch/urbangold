const { app, dbReady } = require('../app');

module.exports = async (req, res) => {
  try {
    await dbReady;
    return app(req, res);
  } catch (error) {
    console.error('Backend initialization failed:', error);
    return res.status(500).json({ detail: 'Backend initialization failed' });
  }
};
