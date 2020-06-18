import { readStructure } from '@outreader/yjk';
import { Button, Divider, message, Row, Space, Table } from 'antd';
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
  const [loading, setLoading] = useState(false);
  const readYjkOutputs = async () => {
    setLoading(true);
    try {
      const res = await readStructure(dir);
      if (!db.get('structures').find({ hash: res.hash }).value()) {
        db.get('structures').push({ hash: res.hash }).write();
      }
      const structure = initDb(res.hash);
      structure.defaults(res).write();
      message.success('读取成功');
      history.push(`/structures/${res.hash}`);
    } catch (error) {
      message.error('读取失败，请选择正确的模型目录');
      console.error(error);
    }
    setLoading(false);
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
          loading={loading}
          onClick={() => readYjkOutputs()}
        >
          开始读取
        </Button>
      </Row>
    </div>
  );
}
