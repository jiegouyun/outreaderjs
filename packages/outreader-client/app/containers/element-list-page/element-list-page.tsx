import { exportElementExcel } from '@outreader/core';
import { Divider, message, Table } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { initDb } from '../../database';
import { useDb } from '../../hooks';
import { IStyles } from '../../interfaces';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
  toolbar: {
    marginTop: '2rem',
  },
};

export function ElementListPage() {
  const db = useDb();
  const history = useHistory();
  const elements = db.get('elements').value();
  const redirectToElement = (hash: string) => {
    history.push(`/elements/${hash}`);
  };
  const exportXLSX = async (hash: string) => {
    try {
      const element = initDb(hash).value();
      const res = await exportElementExcel(element);
      if (res) message.success('导出成功');
    } catch (error) {
      if (error) {
        message.error('导出失败，请检查');
        console.error(error);
      }
    }
  };
  const tableColumns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => (
        <a onClick={() => redirectToElement(hash)}>
          {hash && hash.slice(0, 7)}
        </a>
      ),
    },
    {
      title: '项目地址',
      dataIndex: 'dir',
      key: 'dir',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: any) => (
        <span>
          <a onClick={() => redirectToElement(record.hash)}>查看</a>
          <Divider type="vertical" />
          <a onClick={() => exportXLSX(record.hash)}>导出Excel</a>
        </span>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <Table
        columns={tableColumns}
        rowKey="hash"
        dataSource={elements}
        pagination={false}
      />
    </div>
  );
}
