import { convertStructure } from '@outreader/yjk';
import { exportExcel } from '@outreader/core';
import { Table, message, Divider, Button, Checkbox } from 'antd';
import React, { useState } from 'react';
import { useDb } from '../../hooks';
import { IStyles } from '../../interfaces';
import { useHistory } from 'react-router';
import { initDb } from '../../database';

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
  const exportXLSX = async (hash: string) => {
    try {
      const structureData = initDb(hash).value();
      const structureFE = convertStructure(structureData);
      const res = await exportExcel(structureFE);
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
          <Divider type="vertical" />
          <a onClick={() => exportXLSX(record.hash)}>导出Excel</a>
        </span>
      ),
    },
  ];

  //todo

  return (
    <div style={styles.container}>
      <Table
        // rowSelection={rowSelection}
        columns={tableColumns}
        rowKey="hash"
        dataSource={structures}
        pagination={false}
      />
    </div>
  );
}
