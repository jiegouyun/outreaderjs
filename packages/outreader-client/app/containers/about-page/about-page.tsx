import React from 'react';
import { Row, Divider } from 'antd';
import { IStyles } from '../../interfaces';
import { exec } from 'child_process';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};

export function AboutPage() {
  let cmd = '';
  switch (process.platform) {
    case 'win32':
      cmd = 'start';
      break;
    case 'linux':
      cmd = 'xdg-open';
      break;
    case 'darwin':
      cmd = 'open';
  }
  return (
    <div style={styles.container}>
      <Row justify="space-around">
        <a
          style={{ fontSize: '4rem', color: 'darkslategray' }}
          onClick={() => exec(`${cmd} https://outreader.com/`)}
        >
          <br />
          OutReader
        </a>
      </Row>
      <Row justify="space-around">
        <p style={{ fontSize: '2rem', color: 'darkslategray' }}>
          工程师数据一站式解决方案
        </p>
      </Row>
      <Row justify="space-around">
        <a
          style={{ color: 'darkslategray' }}
          onClick={() => exec(`${cmd} https://outreader.com/download/`)}
        >
          版本 v0.0.8
        </a>
      </Row>
      <Divider />
      <Row justify="space-around">
        <a onClick={() => exec(`${cmd} https://outreader.com/`)}>
          www.outreader.com
        </a>
      </Row>
    </div>
  );
}
