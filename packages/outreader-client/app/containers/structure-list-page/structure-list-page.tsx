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
  const tableColumns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => (
        <a onClick={() => history.push(`/structures/${hash}`)}>
          {hash && hash.slice(0, 7)}
        </a>
      ),
    },
  ];
  return (
    <div style={styles.container}>
      <Table
        columns={tableColumns}
        dataSource={structures}
        pagination={false}
      />
    </div>
  );
}
