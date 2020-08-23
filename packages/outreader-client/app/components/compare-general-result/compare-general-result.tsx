import { Descriptions, Table } from 'antd';
import React from 'react';
import { IGeneralResultFE } from '@outreader/core';
import { ICompare } from '../../interfaces';

export function CompareGeneralResultComponent(
  generalResults: IGeneralResultFE[]
) {
  const n = generalResults.length;

  const modelColumns = [
    {
      title: '分项',
      dataIndex: 'iterms',
    },
  ];

  for (let i = 0; i < n; i++) {
    modelColumns.push({
      title: `模型${i + 1}`,
      dataIndex: `model${i}`,
    });
  }

  const projectTableData: ICompare[] = [
    {
      key: 0,
      iterms: '工程名称',
    },
    {
      key: 1,
      iterms: '工程代号',
    },
    {
      key: 2,
      iterms: '设计人',
    },
    {
      key: 3,
      iterms: '校核人',
    },
    {
      key: 4,
      iterms: '软件名称',
    },
    {
      key: 5,
      iterms: '版本',
    },
    {
      key: 6,
      iterms: '计算日期',
    },
  ];

  for (let i = 0; i < n; i++) {
    projectTableData[0][`model${i}`] = generalResults[i].project.engineering;
    projectTableData[1][`model${i}`] =
      generalResults[i].project.engineeringCode;
    projectTableData[2][`model${i}`] = generalResults[i].project.designer;
    projectTableData[3][`model${i}`] = generalResults[i].project.checker;
    projectTableData[4][`model${i}`] = generalResults[i].project.software;
    projectTableData[5][`model${i}`] =
      generalResults[i].project.softwareVersion;
    projectTableData[6][`model${i}`] = generalResults[i].project.calDate;
  }

  const massTableData: ICompare[] = [
    {
      key: 0,
      iterms: '活载质量',
    },
    {
      key: 1,
      iterms: '附加质量',
    },
    {
      key: 2,
      iterms: '恒载质量',
    },
    {
      key: 3,
      iterms: '总质量',
    },
  ];

  for (let i = 0; i < n; i++) {
    massTableData[0][`model${i}`] = generalResults[i].weight.live.toFixed(0);
    massTableData[1][`model${i}`] = generalResults[i].weight.dead.toFixed(0);
    massTableData[2][`model${i}`] = generalResults[i].weight.super.toFixed(0);
    massTableData[3][`model${i}`] = generalResults[i].weight.sum.toFixed(0);
  }

  const stiffRatioTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向刚度比',
    },
    {
      key: 1,
      iterms: 'Y向刚度比',
    },
  ];

  for (let i = 0; i < n; i++) {
    stiffRatioTableData[0][`model${i}`] = generalResults[
      i
    ].constraintFloorStiffnessRatio.ratioX.toFixed(3);
    stiffRatioTableData[1][`model${i}`] = generalResults[
      i
    ].constraintFloorStiffnessRatio.ratioY.toFixed(3);
  }

  const overturningTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向风 Mr/Mov',
    },
    {
      key: 1,
      iterms: 'Y向风 Mr/Mov',
    },
    {
      key: 2,
      iterms: 'X向地震 Mr/Mov',
    },
    {
      key: 3,
      iterms: 'Y向地震 Mr/Mov',
    },
    {
      key: 4,
      iterms: 'X向风 零应力区(%)',
    },
    {
      key: 5,
      iterms: 'Y向风 零应力区(%)',
    },
    {
      key: 6,
      iterms: 'X向地震 零应力区(%)',
    },
    {
      key: 7,
      iterms: 'Y向地震 零应力区(%)',
    },
  ];

  for (let i = 0; i < n; i++) {
    overturningTableData[0][`model${i}`] = generalResults[
      i
    ].overturningCheck.ratioWindX.toFixed(2);
    overturningTableData[1][`model${i}`] = generalResults[
      i
    ].overturningCheck.ratioWindY.toFixed(2);
    overturningTableData[2][`model${i}`] = generalResults[
      i
    ].overturningCheck.ratioSeismicX.toFixed(2);
    overturningTableData[3][`model${i}`] = generalResults[
      i
    ].overturningCheck.ratioSeismicY.toFixed(2);
    overturningTableData[4][`model${i}`] = generalResults[
      i
    ].overturningCheck.zeroAreaWindX.toFixed(2);
    overturningTableData[5][`model${i}`] = generalResults[
      i
    ].overturningCheck.zeroAreaWindY.toFixed(2);
    overturningTableData[6][`model${i}`] = generalResults[
      i
    ].overturningCheck.zeroAreaSeismicX.toFixed(2);
    overturningTableData[7][`model${i}`] = generalResults[
      i
    ].overturningCheck.zeroAreaSeismicY.toFixed(2);
  }

  const stableTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向风',
    },
    {
      key: 1,
      iterms: 'Y向风',
    },
    {
      key: 2,
      iterms: 'X向地震',
    },
    {
      key: 3,
      iterms: 'Y向地震',
    },
  ];

  for (let i = 0; i < n; i++) {
    stableTableData[0][`model${i}`] = generalResults[i].stableCheck.windRatioX;
    stableTableData[1][`model${i}`] = generalResults[i].stableCheck.windRatioY;
    stableTableData[2][`model${i}`] =
      generalResults[i].stableCheck.seismicRatioX;
    stableTableData[3][`model${i}`] =
      generalResults[i].stableCheck.seismicRatioY;
  }

  const comfortTableData: ICompare[] = [
    {
      key: 0,
      iterms: '顺风X向',
    },
    {
      key: 1,
      iterms: '顺风Y向',
    },
    {
      key: 2,
      iterms: '横风X向',
    },
    {
      key: 3,
      iterms: '横风Y向',
    },
  ];

  for (let i = 0; i < n; i++) {
    comfortTableData[0][`model${i}`] =
      generalResults[i].windComfort.accelerationAlongX;
    comfortTableData[1][`model${i}`] =
      generalResults[i].windComfort.accelerationAlongY;
    comfortTableData[2][`model${i}`] =
      generalResults[i].windComfort.accelerationCrossX;
    comfortTableData[3][`model${i}`] =
      generalResults[i].windComfort.accelerationCrossY;
  }

  const GeneralResult = (
    <div>
      <h3>工程信息</h3>
      <Table
        columns={modelColumns}
        dataSource={projectTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>质量信息</h3>
      <Table
        columns={modelColumns}
        dataSource={massTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>地下室楼层侧向刚度比验算(剪切刚度)</h3>
      <Table
        columns={modelColumns}
        dataSource={stiffRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>结构整体抗倾覆验算</h3>
      <Table
        columns={modelColumns}
        dataSource={overturningTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>结构整体稳定验算(刚重比)</h3>
      <Table
        columns={modelColumns}
        dataSource={stableTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>风振舒适度验算(顶点加速度)</h3>
      <Table
        columns={modelColumns}
        dataSource={comfortTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return GeneralResult;
}
