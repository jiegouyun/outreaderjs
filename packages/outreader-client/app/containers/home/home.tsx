import { Button, Divider, Row, Space, message } from 'antd';
import { remote } from 'electron';
import React, { useState } from 'react';
import { IStyles } from '../../utils';
import { readOutputs } from '@outreader/yjk';
const { dialog } = remote;

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};

export function Home() {
  const [dir, setDir] = useState('');
  const [loading, setLoading] = useState(false);
  const readYjkOutputs = async () => {
    setLoading(true);
    const res = await readOutputs(dir);
    setLoading(false);
    message.success('读取成功');
    console.log(res);
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
              console.log(dir);
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
