import { Descriptions, Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../interfaces';

export function ShearCapacityComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colVCapacityColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    colVCapacityColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: 'X',
          dataIndex: `cbX${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
        {
          title: 'Y',
          dataIndex: `cbY${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
      ],
    });
  }

  const colVCapacityTableData: IEleData[] = [];
  for (let j = 0; j < count; j++) {
    colVCapacityTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colVCapacityTableData[j][`cbX${i}`] =
        col.cbX[i][j] === null ? '' : col.cbX[i][j].toFixed(0);
      colVCapacityTableData[j][`cbY${i}`] =
        col.cbY[i][j] === null ? '' : col.cbY[i][j].toFixed(0);
    }
  }

  const { Panel } = Collapse;
  const axialCompRatio = (
    <div>
      <h3>柱</h3>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <Table
            columns={colVCapacityColumns}
            dataSource={colVCapacityTableData}
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
