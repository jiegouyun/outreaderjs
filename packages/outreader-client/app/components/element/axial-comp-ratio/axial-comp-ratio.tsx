import { Table, Collapse, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IElementUcFE } from '@outreader/core';
import { IEleData } from '../../../interfaces';
import { ElementChart } from '../../chart-tools';

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
    </React.Fragment>
  );

  return axialCompRatio;
}
