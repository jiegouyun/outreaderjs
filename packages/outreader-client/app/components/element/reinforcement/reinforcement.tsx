import { Collapse, Row } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IElementRsFE } from '@outreader/core';
import { IEleData } from '../../../interfaces';
import { ElementChart } from '../../chart-tools';

export function ReinforcementComponent(rs: IElementRsFE) {
  const col = rs.col;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colRsColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    colRsColumns.push({
      name: `C-${col.colName[i]}`,
      align: 'center',
      children: [
        {
          name: 'Rs',
          code: `rs${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: 'Rsv',
          code: `rsv${i}`,
          width: 80,
          align: 'right',
        },
      ],
    });
  }

  const colRsTableData: IEleData[] = [];
  const colRsChartData = [];
  const colRsvChartData = [];
  for (let j = 0; j < count; j++) {
    colRsTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
    const rsOrig = col.colName.map((val, i) => {
      return col.rs[i][j];
    });
    const rs = rsOrig.filter(Boolean);
    if (rs.length) {
      colRsChartData.push({
        storeyID: col.storeyID[j],
        range: [Math.min(...rs), Math.max(...rs)],
      });
    }
    const rsvOrig = col.colName.map((val, i) => {
      return col.rsv[i][j];
    });
    const rsv = rsvOrig.filter(Boolean);
    if (rsv.length) {
      colRsvChartData.push({
        storeyID: col.storeyID[j],
        range: [
          Math.min(...rsv.filter(Boolean)),
          Math.max(...rsv.filter(Boolean)),
        ],
      });
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colRsTableData[j][`rs${i}`] = col.rs[i][j];
      colRsTableData[j][`rsv${i}`] = col.rsv[i][j];
    }
  }

  const { Panel } = Collapse;
  const axialCompRatio = (
    <React.Fragment>
      <h3>柱</h3>
      <Row justify="space-around">
        <ElementChart data={colRsChartData} xLabel="柱截面配筋率(%)" />
        <ElementChart data={colRsvChartData} xLabel="柱体积配箍率(%)" />
      </Row>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <BaseTable
            columns={colRsColumns}
            dataSource={colRsTableData}
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
