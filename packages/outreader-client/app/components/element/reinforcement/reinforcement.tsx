import { Table, Collapse, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IElementRsFE } from '@outreader/core';
import { IEleData } from '../../../interfaces';
import { ElementChart } from '../../chart-tools';

export function ReinforcementComponent(rs: IElementRsFE) {
  const col = rs.col;
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
  const colRsChartData = [];
  const colRsvChartData = [];
  for (let j = 0; j < count; j++) {
    colRsTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
    const rs = col.colName.map((val, i) => {
      return col.rs[i][j];
    });
    colRsChartData.push({
      storeyID: col.storeyID[j],
      range: [Math.min(...rs.filter(Boolean)), Math.max(...rs.filter(Boolean))],
    });
    const rsv = col.colName.map((val, i) => {
      return col.rsv[i][j];
    });
    colRsvChartData.push({
      storeyID: col.storeyID[j],
      range: [
        Math.min(...rsv.filter(Boolean)),
        Math.max(...rsv.filter(Boolean)),
      ],
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
    <React.Fragment>
      <h3>柱</h3>
      <Row justify="space-around">
        <ElementChart data={colRsChartData} xLabel="柱截面配筋率(%)" />
        <ElementChart data={colRsvChartData} xLabel="柱体积配箍率(%)" />
      </Row>
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
    </React.Fragment>
  );

  return axialCompRatio;
}
