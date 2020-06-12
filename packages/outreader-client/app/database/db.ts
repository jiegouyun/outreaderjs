import electron from 'electron';
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export async function initDb(db: string = 'outreader') {
  return lowdb(
    new FileSync(
      path.join(
        (electron.app || electron.remote.app).getPath('userData'),
        db + '.json'
      )
    )
  );
}
