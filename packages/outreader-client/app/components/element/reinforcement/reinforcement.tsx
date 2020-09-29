import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../../interfaces';

export function ReinforcementComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colRsColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    colRsColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: 'Rs',
          dataIndex: `rs${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
        {
          title: 'Rsv',
          dataIndex: `rsv${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
      ],
    });
  }

  const colRsTableData: IEleData[] = [];
  for (let j = 0; j < count; j++) {
    colRsTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colRsTableData[j][`rs${i}`] = col.rs[i][j];
      colRsTableData[j][`rsv${i}`] = col.rsv[i][j];
    }
  }

  const { Panel } = Collapse;
  const axialCompRatio = (
    <div>
      <h3>柱</h3>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <Table
            columns={colRsColumns}
            dataSource={colRsTableData}
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

  return axialCompRatio;
}
