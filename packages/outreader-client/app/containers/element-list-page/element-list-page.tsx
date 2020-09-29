import { exportElementExcel } from '@outreader/core';
import { convertStructure } from '@outreader/yjk';
import { Button, Divider, message, Table } from 'antd';
import React, { useState } from 'react';
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
  // const [selectedHashes, setSelectedHashes] = useState<string[]>([]);
  const elements = db.get('elements').value();
  const redirectToElement = (hash: string) => {
    history.push(`/elements/${hash}`);
  };
  // const redirectToStructureCompare = () => {
  //   if (selectedHashes.length < 2) {
  //     message.warn('请先选择要对比的模型');
  //     return;
  //   }
  //   history.push(`/compare?hashes=${selectedHashes}`);
  // };
  const exportXLSX = async (hash: string) => {
    // try {
    //   const structureData = initDb(hash).value();
    //   const structureFE = convertStructure(structureData);
    //   const res = await exportExcel(structureFE);
    //   if (res) message.success('导出成功');
    // } catch (error) {
    //   if (error) {
    //     message.error('导出失败，请检查');
    //     console.error(error);
    //   }
    // }
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

  // const rowSelection = {
  //   onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       'selectedRows: ',
  //       selectedRows
  //     );
  //     // TODO: prevent all selected keys <= 3?
  //     setSelectedHashes(selectedRowKeys as string[]);
  //   },
  //   hideSelectAll: true,
  // };

  return (
    <div style={styles.container}>
      <Table
        // rowSelection={rowSelection}
        columns={tableColumns}
        rowKey="hash"
        dataSource={elements}
        pagination={false}
      />
    </div>
  );
}
