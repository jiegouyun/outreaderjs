import { exportExcel, convertStructure } from '@outreader/core';
import { Button, Divider, message, Table, Popconfirm, Space } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { initDb, deleteDb } from '../../database';
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

export function StructureListPage() {
  const db = useDb();
  const history = useHistory();
  const [selectedHashes, setSelectedHashes] = useState<string[]>([]);
  const [structures, setStructures] = useState<object[]>(
    db.get('structures').value()
  );
  const redirectToStructure = (hash: string) => {
    history.push(`/structures/${hash}`);
  };
  const redirectToStructureCompare = () => {
    if (selectedHashes.length < 2) {
      message.warn('请先选择要对比的模型');
      return;
    }
    history.push(`/compare?hashes=${selectedHashes}`);
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
  const deleteStructure = (hash: string) => {
    db.get('structures').remove({ hash: hash }).write();
    setStructures(structures.filter((item: any) => item.hash !== hash));
    deleteDb(hash);
  };
  const deleteStructures = (hashes: string[]) => {
    hashes.forEach((hash) => {
      db.get('structures').remove({ hash: hash }).write();
      deleteDb(hash);
    });
    setStructures(
      structures.filter((item: any) => !hashes.includes(item.hash))
    );
    setSelectedHashes([]);
  };
  const tableColumns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      width: '6rem',
      render: (hash: string) => (
        <a onClick={() => redirectToStructure(hash)}>
          {hash && hash.slice(0, 7)}
        </a>
      ),
    },
    {
      title: '项目',
      dataIndex: 'name',
      key: 'name',
      width: '6rem',
    },
    {
      title: '软件',
      dataIndex: 'software',
      key: 'dsoftwareir',
      width: '6rem',
    },
    {
      title: '项目地址',
      dataIndex: 'dir',
      key: 'dir',
      // width: '20rem',
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      width: '12rem',
      render: (_, record: any) => (
        <span>
          <a onClick={() => redirectToStructure(record.hash)}>查看</a>
          <Divider type="vertical" />
          <a onClick={() => exportXLSX(record.hash)}>导出Excel</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除?"
            okText="确认"
            cancelText="取消"
            onConfirm={() => deleteStructure(record.hash)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedHashes(selectedRowKeys as string[]);
    },
    // hideSelectAll: true,
  };

  return (
    <div style={styles.container}>
      <Table
        rowSelection={rowSelection}
        columns={tableColumns}
        rowKey="hash"
        dataSource={structures}
        pagination={false}
        scroll={{ x: true, y: 'calc(100vh - 16rem)' }}
      />
      <div style={styles.toolbar}>
        {selectedHashes.length > 1 && (
          <Space>
            <Button type="primary" onClick={redirectToStructureCompare}>
              对比模型
            </Button>
            <Popconfirm
              title="确认删除?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                deleteStructures(selectedHashes);
              }}
            >
              <Button>批量删除</Button>
            </Popconfirm>
          </Space>
        )}
      </div>
    </div>
  );
}
