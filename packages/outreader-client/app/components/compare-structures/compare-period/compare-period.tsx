import { Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IPeriodFE } from '@outreader/core';
import { ICompare } from '../../../interfaces';

export function ComparePeriodComponent(periods: IPeriodFE[]) {
  const n = periods.length;
  let modeID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (periods[i].modeCoupling.modeID.length > modeID.length) {
      modeID = periods[i].modeCoupling.modeID;
    }
  }
  const count = modeID.length;

  const modeColumns: ArtColumn[] = [
    {
      name: '振型',
      code: 'modeID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    modeColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `周期`,
          code: `period${i}`,
          align: 'right',
        },
        {
          name: `转角`,
          code: `angle${i}`,
          align: 'right',
        },
      ],
    });
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
      modeID: modeID[j],
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

  const periodMassColumns: ArtColumn[] = [
    {
      name: '振型',
      code: 'modeID',
      width: 64,
      align: 'left',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    periodMassColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          code: `factorX${i}`,
          align: 'right',
        },
        {
          name: `Y`,
          code: `factorY${i}`,
          align: 'right',
        },
        {
          name: `Z`,
          code: `factorZ${i}`,
          align: 'right',
        },
      ],
    });
  }

  const periodMassTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodMassTableData.push({
      key: j,
      modeID: modeID[j],
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
    <React.Fragment>
      <h3>考虑扭转耦联时的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={modeColumns}
            dataSource={periodModeTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>地震最大作用方向的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={modeColumns}
            dataSource={periodSeismicTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={periodMassColumns}
            dataSource={periodMassTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Periods;
}
