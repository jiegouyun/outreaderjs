import { Descriptions, Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../interfaces';

export function PropertiesComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const infoColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    infoColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: '编号',
          dataIndex: `colID${i}`,
          width: `${((100 / 2 / n) * 1) / 2}%`,
          align: 'right',
        },
        {
          title: '属性',
          dataIndex: `colProp${i}`,
          width: `${((100 / 2 / n) * 3) / 2}%`,
          align: 'right',
        },
      ],
    });
  }

  const colInfoTableData: IEleData[] = [];
  for (let j = 0; j < count; j++) {
    colInfoTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colInfoTableData[j][`colID${i}`] = col.colID[i][j];
      colInfoTableData[j][`colProp${i}`] = (col.colProps[i][j] || []).join(
        '，'
      );
    }
  }

  const { Panel } = Collapse;
  const Properties = (
    <div>
      <h3>柱信息</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={infoColumns}
            dataSource={colInfoTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '800rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Properties;
}
