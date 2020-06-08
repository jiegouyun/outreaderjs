import electron from 'electron';
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export async function initDb() {
  const filename = path.join(
    (electron.app || electron.remote.app).getPath('userData'),
    'db.json'
  );
  console.log(filename);
  return lowdb(new FileSync(filename));
}
