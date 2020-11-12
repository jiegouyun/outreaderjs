import { Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../../interfaces';

export function ShearCapacityComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colVCapacityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    colVCapacityColumns.push({
      name: `C-${col.colName[i]}`,
      align: 'center',
      children: [
        {
          name: 'X',
          code: `cbX${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: 'Y',
          code: `cbY${i}`,
          width: 80,
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
    <React.Fragment>
      <h3>柱</h3>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <BaseTable
            columns={colVCapacityColumns}
            dataSource={colVCapacityTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return axialCompRatio;
}
