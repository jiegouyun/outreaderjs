import electron from 'electron';
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs';
import { message } from 'antd';

export function initDb(db: string = 'outreader') {
  return lowdb(
    new FileSync(
      path.join(
        (electron.app || electron.remote.app).getPath('userData'),
        db + '.json'
      )
    )
  );
}

export function deleteDb(db: string) {
  const filePath = path.join(
    (electron.app || electron.remote.app).getPath('userData'),
    db + '.json'
  );
  fs.unlink(filePath, (error) => {
    if (error) {
      message.error('数据删除失败');
      console.log(error);
    }
  });
}
