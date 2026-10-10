const { app, db, dbPath, dbReady, getAuthStorageInfo } = require('./app');

const PORT = Number(process.env.PORT || 8001);
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  try {
    await dbReady;
    app.listen(PORT, HOST, () => {
      console.log(`Urban Gold backend running on http://${HOST}:${PORT}`);
      const storageInfo = typeof getAuthStorageInfo === 'function'
        ? getAuthStorageInfo()
        : { mode: 'unknown', persistent: false };
      if (storageInfo.mode === 'postgres') {
        console.log('Storage backend: Postgres (persistent)');
      } else if (storageInfo.mode === 'sqlite') {
        console.log(`Storage backend: SQLite (${dbPath})`);
      } else {
        console.log('Storage backend: In-memory (ephemeral)');
      }
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  if (db && typeof db.close === 'function') {
    db.close(() => {
      process.exit(0);
    });
    return;
  }

  process.exit(0);
});

startServer();
