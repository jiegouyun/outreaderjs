import { Button, Divider, Row, Space, message, Descriptions } from 'antd';
import { remote } from 'electron';
import React, { useState } from 'react';
import { IStyles } from '../../interfaces';
import { readOutputs } from '@outreader/yjk';
import { IWmass } from '@outreader/core';
import { useDb } from '../../hooks';
const { dialog } = remote;

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};

export function Home() {
  const db = useDb();
  console.log(db.structures.query());
  const [dir, setDir] = useState('');
  const [wmass, setWmass] = useState<IWmass | null>(null);
  const [loading, setLoading] = useState(false);
  const readYjkOutputs = async () => {
    setLoading(true);
    try {
      const res = await readOutputs(dir);
      setWmass(res.wmass);
      message.success('读取成功');
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
      <Divider />
      {wmass && (
        <Row>
          <Descriptions title="模型概况" bordered>
            <Descriptions.Item label="计算软件">
              {wmass?.basicInformation.software}(
              {wmass.basicInformation.softwareVersion})
            </Descriptions.Item>
            <Descriptions.Item label="计算日期">
              {wmass?.basicInformation.calDate}
            </Descriptions.Item>
            <Descriptions.Item label="设计人">
              {wmass?.basicInformation.designer}
            </Descriptions.Item>
          </Descriptions>
        </Row>
      )}
    </div>
  );
}
