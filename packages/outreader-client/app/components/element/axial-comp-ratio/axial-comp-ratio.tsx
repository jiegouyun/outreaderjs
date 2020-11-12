import { Collapse, Row } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IElementUcFE } from '@outreader/core';
import { IEleData } from '../../../interfaces';
import { ElementChart } from '../../chart-tools';

export function AxialCompRatioComponent(uc: IElementUcFE) {
  const col = uc.col;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colUcColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    colUcColumns.push({
      name: `C-${col.colName[i]}`,
      align: 'center',
      children: [
        {
          name: 'Uc',
          code: `uc${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: 'Uc_G',
          code: `ucG${i}`,
          width: 80,
          align: 'right',
        },
      ],
    });
  }

  const colUcTableData: IEleData[] = [];
  const colUcChartData = [];
  const colUcGChartData = [];
  for (let j = 0; j < count; j++) {
    colUcTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
    const ucOrig = col.colName.map((val, i) => {
      return col.uc[i][j];
    });
    const uc = ucOrig.filter(Boolean);
    if (uc.length) {
      colUcChartData.push({
        storeyID: col.storeyID[j],
        range: [Math.min(...uc), Math.max(...uc)],
      });
    }
    const ucGOrig = col.colName.map((val, i) => {
      return col.ucG[i][j];
    });
    const ucG = ucGOrig.filter(Boolean);
    if (ucG.length) {
      colUcGChartData.push({
        storeyID: col.storeyID[j],
        range: [Math.min(...ucG), Math.max(...ucG)],
      });
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colUcTableData[j][`uc${i}`] = col.uc[i][j];
      colUcTableData[j][`ucG${i}`] = col.ucG[i][j];
    }
  }

  const { Panel } = Collapse;
  const axialCompRatio = (
    <React.Fragment>
      <h3>柱</h3>
      <Row justify="space-around">
        <ElementChart data={colUcChartData} xLabel="柱轴压比" />
        <ElementChart
          data={colUcGChartData}
          xLabel="墙柱轴压比(重力荷载代表值)"
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细信息" key="1">
          <BaseTable
            columns={colUcColumns}
            dataSource={colUcTableData}
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
