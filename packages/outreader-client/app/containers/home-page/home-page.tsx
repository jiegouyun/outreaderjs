import { readYJKStructure } from '@outreader/yjk';
import { readPKPMStructure } from '@outreader/pkpm';
import { checkSoftware, IStructure } from '@outreader/core';
import { Button, Divider, message, Row, Space } from 'antd';
import { remote } from 'electron';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { initDb } from '../../database';
import { useDb } from '../../hooks';
import { IStyles } from '../../interfaces';
const { dialog } = remote;

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};

export function HomePage() {
  const db = useDb();
  const history = useHistory();
  const [dir, setDir] = useState('');
  const [strLoading, setStrLoading] = useState(false);
  const readStrOutputs = async () => {
    setStrLoading(true);
    try {
      console.log(checkSoftware(dir));
      let res: any;
      switch (checkSoftware(dir)) {
        case 'YJK':
          res = await readYJKStructure(dir);
          break;
        case 'PKPM':
          res = await readPKPMStructure(dir);
          break;
        case 'unknwn':
          message.info('无法确认计算软件，请提供完整文件信息');
      }
      const strRes = res as IStructure;
      // const strRes = await readYJKStructure(dir);
      if (!db.has('structures').value()) {
        db.set('structures', []).write();
      }
      if (!db.get('structures').find({ hash: strRes.hash }).value()) {
        db.get('structures')
          .push({
            hash: strRes.hash,
            name: strRes.name,
            software: strRes.software,
            dir: strRes.dir,
          })
          .write();
      }
      const structure = initDb(strRes.hash);
      structure.defaults(strRes).write();
      message.success('读取成功');
      history.push(`/structures/${strRes.hash}`);
    } catch (error) {
      if (error) {
        message.error('读取失败，请选择正确的模型目录');
        console.error(error);
      }
    }
    setStrLoading(false);
  };
  return (
    <div style={styles.container}>
      <Row>
        <Space>
          <Button
            onClick={() => {
              const path = dialog.showOpenDialogSync({
                properties: ['openDirectory'],
              });
              if (path) {
                setDir(path[0]);
              } else {
                setDir('');
              }
            }}
          >
            选择模型
          </Button>
          {dir || '还没选择模型'}
        </Space>
      </Row>
      <Divider />
      <Row>
        <Button
          type="primary"
          disabled={!Boolean(dir)}
          loading={strLoading}
          onClick={() => readStrOutputs()}
        >
          开始读取
        </Button>
      </Row>
    </div>
  );
}
