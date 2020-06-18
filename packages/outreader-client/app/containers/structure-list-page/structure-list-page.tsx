import { Table } from 'antd';
import React from 'react';
import { useDb } from '../../hooks';
import { IStyles } from '../../interfaces';
import { useHistory } from 'react-router';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};

export function StructureListPage() {
  const db = useDb();
  const history = useHistory();
  const structures = db.get('structures').value();
  const redirectToStructure = (hash: string) => {
    history.push(`/structures/${hash}`);
  };
  const tableColumns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => (
        <a onClick={() => redirectToStructure(hash)}>
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
      render: (_, record) => (
        <span>
          <a onClick={() => redirectToStructure(record.hash)}>查看</a>
        </span>
      ),
    },
  ];
  return (
    <div style={styles.container}>
      <Table
        columns={tableColumns}
        rowKey="hash"
        dataSource={structures}
        pagination={false}
      />
    </div>
  );
}
