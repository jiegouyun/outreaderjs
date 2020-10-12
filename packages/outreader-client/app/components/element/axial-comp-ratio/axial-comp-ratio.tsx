import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IElementUcFE } from '@outreader/core';
import { IEleData } from '../../../interfaces';

export function AxialCompRatioComponent(uc: IElementUcFE) {
  const col = uc.col;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colUcColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    colUcColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: 'Uc',
          dataIndex: `uc${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
        {
          title: 'Uc_G',
          dataIndex: `ucG${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
      ],
    });
  }

  const colUcTableData: IEleData[] = [];
  for (let j = 0; j < count; j++) {
    colUcTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colUcTableData[j][`uc${i}`] = col.uc[i][j];
      colUcTableData[j][`ucG${i}`] = col.ucG[i][j];
    }
  }

  const { Panel } = Collapse;
  const axialCompRatio = (
    <div>
      <h3>柱</h3>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <Table
            columns={colUcColumns}
            dataSource={colUcTableData}
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
