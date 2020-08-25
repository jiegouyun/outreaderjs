import { Descriptions, Table, Collapse } from 'antd';
import React from 'react';
import { IPeriodFE } from '@outreader/core';
import { ICompare } from '../../interfaces';

export function ComparePeriodComponent(periods: IPeriodFE[]) {
  const n = periods.length;
  let modeID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (periods[i].modeCoupling.modeID.length > modeID.length) {
      modeID = periods[i].modeCoupling.modeID;
    }
  }
  const count = modeID.length;

  const modeColumns = [
    {
      title: '振型',
      dataIndex: 'modeID',
    },
  ];

  for (let i = 0; i < n; i++) {
    modeColumns.push(
      {
        title: `模型${i + 1}-周期`,
        dataIndex: `period${i}`,
      },
      {
        title: `模型${i + 1}-转角`,
        dataIndex: `angle${i}`,
      }
    );
  }

  const periodModeTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodModeTableData.push({
      key: j,
      modeID: modeID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodModeTableData[j][`period${i}`] = (
        periods[i].modeCoupling.period[j] || 0
      ).toFixed(3);
      periodModeTableData[j][`angle${i}`] = (
        periods[i].modeCoupling.angle[j] || 0
      ).toFixed(0);
    }
  }

  const periodSeismicTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodSeismicTableData.push({
      key: j,
      modeID: j,
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodSeismicTableData[j][`period${i}`] = (
        periods[i].modeSeismic.period[j] || 0
      ).toFixed(3);
      periodSeismicTableData[j][`angle${i}`] = (
        periods[i].modeSeismic.angle[j] || 0
      ).toFixed(0);
    }
  }

  const periodMassColumns = [
    {
      title: '振型',
      dataIndex: 'modeID',
    },
  ];

  for (let i = 0; i < n; i++) {
    periodMassColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `factorX${i}`,
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `factorY${i}`,
      },
      {
        title: `模型${i + 1}-Z`,
        dataIndex: `factorZ${i}`,
      }
    );
  }

  const periodMassTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodMassTableData.push({
      key: j,
      modeID: j,
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodMassTableData[j][`factorX${i}`] = (
        periods[i].modeMass.factorX[j] || 0
      ).toFixed(2);
      periodMassTableData[j][`factorY${i}`] = (
        periods[i].modeMass.factorY[j] || 0
      ).toFixed(2);
      periodMassTableData[j][`factorZ${i}`] = (
        periods[i].modeMass.factorZ[j] || 0
      ).toFixed(2);
    }
  }

  const { Panel } = Collapse;
  const Periods = (
    <div>
      <h3>考虑扭转耦联时的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodModeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>地震最大作用方向的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodSeismicTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={periodMassColumns}
            dataSource={periodMassTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Periods;
}
