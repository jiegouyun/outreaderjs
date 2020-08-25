import { Descriptions, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ISummaryFE } from '@outreader/core';
import { ICompare } from '../../interfaces';

export function CompareSummaryComponent(summarys: ISummaryFE[]) {
  const n = summarys.length;

  const modelColumns: ColumnsType<ICompare> = [
    {
      title: '分项',
      dataIndex: 'iterms',
      width: '15%',
      align: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    modelColumns.push({
      title: `模型${i + 1}`,
      dataIndex: `model${i}`,
      width: `${85 / n}%`,
      align: 'right',
    });
  }

  const projectTableData: ICompare[] = [
    {
      key: 0,
      iterms: '工程路径',
    },
    {
      key: 1,
      iterms: '工程名称',
    },
    {
      key: 2,
      iterms: '计算日期',
    },
    {
      key: 3,
      iterms: '软件名称',
    },
    {
      key: 4,
      iterms: '版本',
    },
  ];

  for (let i = 0; i < n; i++) {
    projectTableData[0][`model${i}`] = summarys[i].project.dir;
    projectTableData[1][`model${i}`] = summarys[i].project.engineering;
    projectTableData[2][`model${i}`] = summarys[i].project.calDate;
    projectTableData[3][`model${i}`] = summarys[i].project.software;
    projectTableData[4][`model${i}`] = summarys[i].project.softwareVersion;
  }

  const structureTableData: ICompare[] = [
    {
      key: 0,
      iterms: '结构体系',
    },
    {
      key: 1,
      iterms: '结构材料',
    },
    {
      key: 2,
      iterms: '结构高度',
    },
    {
      key: 3,
      iterms: '楼层数',
    },
    {
      key: 4,
      iterms: '地下室层数',
    },
    {
      key: 5,
      iterms: '嵌固层',
    },
    {
      key: 6,
      iterms: '地震烈度',
    },
    {
      key: 7,
      iterms: '修正后基本风压',
    },
    {
      key: 8,
      iterms: '刚性楼板假定',
    },
    {
      key: 9,
      iterms: '周期折减系数',
    },
  ];

  for (let i = 0; i < n; i++) {
    structureTableData[0][`model${i}`] = summarys[i].structures.system;
    structureTableData[1][`model${i}`] = summarys[i].structures.material;
    structureTableData[2][`model${i}`] = summarys[i].structures.height.toFixed(
      1
    );
    structureTableData[3][`model${i}`] = summarys[i].structures.storeys;
    structureTableData[4][`model${i}`] = summarys[i].structures.basement;
    structureTableData[5][`model${i}`] = summarys[i].structures.constraintFloor;
    structureTableData[6][`model${i}`] = summarys[i].structures.intensity;
    structureTableData[7][`model${i}`] =
      summarys[i].structures.pressureModified;
    structureTableData[8][`model${i}`] =
      summarys[i].structures.rigidFloorAssumption;
    structureTableData[9][`model${i}`] =
      summarys[i].structures.periodReductionFactor;
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
    massTableData[0][`model${i}`] = summarys[i].weight.live.toFixed(0);
    massTableData[1][`model${i}`] = summarys[i].weight.dead.toFixed(0);
    massTableData[2][`model${i}`] = summarys[i].weight.super.toFixed(0);
    massTableData[3][`model${i}`] = summarys[i].weight.sum.toFixed(0);
  }

  const windDriftTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
    {
      key: 4,
      iterms: '限值',
    },
  ];

  for (let i = 0; i < n; i++) {
    windDriftTableData[0][`model${i}`] = `1 / ${summarys[i].drift.windX[0]}`;
    windDriftTableData[1][`model${i}`] = summarys[i].drift.windX[1];
    windDriftTableData[2][`model${i}`] = `1 / ${summarys[i].drift.windY[0]}`;
    windDriftTableData[3][`model${i}`] = summarys[i].drift.windY[1];
    windDriftTableData[4][`model${i}`] = `1 / ${summarys[i].drift.limit}`;
  }

  const seismicDriftTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
    {
      key: 4,
      iterms: '限值',
    },
  ];

  for (let i = 0; i < n; i++) {
    seismicDriftTableData[0][
      `model${i}`
    ] = `1 / ${summarys[i].drift.seismicX[0]}`;
    seismicDriftTableData[1][`model${i}`] = summarys[i].drift.seismicX[1];
    seismicDriftTableData[2][
      `model${i}`
    ] = `1 / ${summarys[i].drift.seismicY[0]}`;
    seismicDriftTableData[3][`model${i}`] = summarys[i].drift.seismicY[1];
    seismicDriftTableData[4][`model${i}`] = `1 / ${summarys[i].drift.limit}`;
  }

  const dispRatioTableData: ICompare[] = [
    {
      key: 0,
      iterms: '+X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: '-X向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
    {
      key: 4,
      iterms: '+Y向',
    },
    {
      key: 5,
      iterms: '楼层',
    },
    {
      key: 6,
      iterms: '-Y向',
    },
    {
      key: 7,
      iterms: '楼层',
    },
    {
      key: 8,
      iterms: '限值',
    },
  ];

  for (let i = 0; i < n; i++) {
    dispRatioTableData[0][`model${i}`] = summarys[i].dispRatio.eccPX[0];
    dispRatioTableData[1][`model${i}`] = summarys[i].dispRatio.eccPX[1];
    dispRatioTableData[2][`model${i}`] = summarys[i].dispRatio.eccNX[0];
    dispRatioTableData[3][`model${i}`] = summarys[i].dispRatio.eccNX[1];
    dispRatioTableData[4][`model${i}`] = summarys[i].dispRatio.eccPY[0];
    dispRatioTableData[5][`model${i}`] = summarys[i].dispRatio.eccPY[1];
    dispRatioTableData[6][`model${i}`] = summarys[i].dispRatio.eccNY[0];
    dispRatioTableData[7][`model${i}`] = summarys[i].dispRatio.eccNY[1];
    dispRatioTableData[8][`model${i}`] = summarys[i].dispRatio.limit;
  }

  const dispRatioDTableData: ICompare[] = [
    {
      key: 0,
      iterms: '+X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: '-X向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
    {
      key: 4,
      iterms: '+Y向',
    },
    {
      key: 5,
      iterms: '楼层',
    },
    {
      key: 6,
      iterms: '-Y向',
    },
    {
      key: 7,
      iterms: '楼层',
    },
    {
      key: 8,
      iterms: '限值',
    },
  ];

  for (let i = 0; i < n; i++) {
    dispRatioDTableData[0][`model${i}`] = summarys[i].dispRatioStorey.eccPX[0];
    dispRatioDTableData[1][`model${i}`] = summarys[i].dispRatioStorey.eccPX[1];
    dispRatioDTableData[2][`model${i}`] = summarys[i].dispRatioStorey.eccNX[0];
    dispRatioDTableData[3][`model${i}`] = summarys[i].dispRatioStorey.eccNX[1];
    dispRatioDTableData[4][`model${i}`] = summarys[i].dispRatioStorey.eccPY[0];
    dispRatioDTableData[5][`model${i}`] = summarys[i].dispRatioStorey.eccPY[1];
    dispRatioDTableData[6][`model${i}`] = summarys[i].dispRatioStorey.eccNY[0];
    dispRatioDTableData[7][`model${i}`] = summarys[i].dispRatioStorey.eccNY[1];
    dispRatioDTableData[8][`model${i}`] = summarys[i].dispRatioStorey.limit;
  }

  const shearWeightTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '限值',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '限值',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearWeightTableData[0][`model${i}`] = summarys[
      i
    ].shearWeightRatio.x.toFixed(3);
    shearWeightTableData[1][`model${i}`] = summarys[
      i
    ].shearWeightRatio.xLimit.toFixed(2);
    shearWeightTableData[2][`model${i}`] = summarys[
      i
    ].shearWeightRatio.y.toFixed(3);
    shearWeightTableData[3][`model${i}`] = summarys[
      i
    ].shearWeightRatio.yLimit.toFixed(2);
  }

  const windStiffWeightTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '判断',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '判断',
    },
  ];

  for (let i = 0; i < n; i++) {
    windStiffWeightTableData[0][`model${i}`] =
      summarys[i].stiffWeightRatio.windX;
    windStiffWeightTableData[1][`model${i}`] =
      summarys[i].stiffWeightRatio.windXCheck;
    windStiffWeightTableData[2][`model${i}`] =
      summarys[i].stiffWeightRatio.windY;
    windStiffWeightTableData[3][`model${i}`] =
      summarys[i].stiffWeightRatio.windYCheck;
  }

  const seismicStiffWeightTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '判断',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '判断',
    },
  ];

  for (let i = 0; i < n; i++) {
    seismicStiffWeightTableData[0][`model${i}`] =
      summarys[i].stiffWeightRatio.seismicX;
    seismicStiffWeightTableData[1][`model${i}`] =
      summarys[i].stiffWeightRatio.seismicXCheck;
    seismicStiffWeightTableData[2][`model${i}`] =
      summarys[i].stiffWeightRatio.seismicY;
    seismicStiffWeightTableData[3][`model${i}`] =
      summarys[i].stiffWeightRatio.seismicYCheck;
  }

  const stiffRatioTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
  ];

  for (let i = 0; i < n; i++) {
    stiffRatioTableData[0][`model${i}`] = summarys[i].stiffRatio.x[0].toFixed(
      3
    );
    stiffRatioTableData[1][`model${i}`] = summarys[i].stiffRatio.x[1];
    stiffRatioTableData[2][`model${i}`] = summarys[i].stiffRatio.y[0].toFixed(
      3
    );
    stiffRatioTableData[3][`model${i}`] = summarys[i].stiffRatio.y[1];
  }

  const shearCapacityTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X向',
    },
    {
      key: 1,
      iterms: '楼层',
    },
    {
      key: 2,
      iterms: 'Y向',
    },
    {
      key: 3,
      iterms: '楼层',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearCapacityTableData[0][`model${i}`] =
      summarys[i].shearCapacityRatio.x[0];
    shearCapacityTableData[1][`model${i}`] =
      summarys[i].shearCapacityRatio.x[1];
    shearCapacityTableData[2][`model${i}`] =
      summarys[i].shearCapacityRatio.y[0];
    shearCapacityTableData[3][`model${i}`] =
      summarys[i].shearCapacityRatio.y[1];
  }

  const periodTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'T1',
    },
    {
      key: 1,
      iterms: '转角',
    },
    {
      key: 2,
      iterms: 'T2',
    },
    {
      key: 3,
      iterms: '转角',
    },
    {
      key: 4,
      iterms: 'T3',
    },
    {
      key: 5,
      iterms: '转角',
    },
  ];

  for (let i = 0; i < n; i++) {
    periodTableData[0][`model${i}`] = (summarys[i].mode.period[0] || 0).toFixed(
      2
    );
    periodTableData[1][`model${i}`] = (summarys[i].mode.angle[0] || 0).toFixed(
      0
    );
    periodTableData[2][`model${i}`] = (summarys[i].mode.period[1] || 0).toFixed(
      2
    );
    periodTableData[3][`model${i}`] = (summarys[i].mode.angle[1] || 0).toFixed(
      0
    );
    periodTableData[4][`model${i}`] = (summarys[i].mode.period[2] || 0).toFixed(
      2
    );
    periodTableData[5][`model${i}`] = (summarys[i].mode.angle[2] || 0).toFixed(
      0
    );
  }

  const modeMassTableData: ICompare[] = [
    {
      key: 0,
      iterms: 'X',
    },
    {
      key: 1,
      iterms: 'Y',
    },
    {
      key: 2,
      iterms: 'Z',
    },
    {
      key: 3,
      iterms: '振型数',
    },
  ];

  for (let i = 0; i < n; i++) {
    modeMassTableData[0][`model${i}`] = summarys[i].mode.sumX.toFixed(2);
    modeMassTableData[1][`model${i}`] = summarys[i].mode.sumY.toFixed(2);
    modeMassTableData[2][`model${i}`] = summarys[i].mode.sumZ.toFixed(2);
    modeMassTableData[3][`model${i}`] = summarys[i].mode.count;
  }

  const shearTableData: ICompare[] = [
    {
      key: 0,
      iterms: '风荷载X向',
    },
    {
      key: 1,
      iterms: '风荷载Y向',
    },
    {
      key: 2,
      iterms: '地震X向',
    },
    {
      key: 3,
      iterms: '地震Y向',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearTableData[0][`model${i}`] = summarys[i].baseShear.windX.toFixed(0);
    shearTableData[1][`model${i}`] = summarys[i].baseShear.windY.toFixed(0);
    shearTableData[2][`model${i}`] = summarys[i].baseShear.seismicX.toFixed(0);
    shearTableData[3][`model${i}`] = summarys[i].baseShear.seismicY.toFixed(0);
  }

  const momentTableData: ICompare[] = [
    {
      key: 0,
      iterms: '风荷载X向',
    },
    {
      key: 1,
      iterms: '风荷载Y向',
    },
    {
      key: 2,
      iterms: '地震X向',
    },
    {
      key: 3,
      iterms: '地震Y向',
    },
  ];

  for (let i = 0; i < n; i++) {
    momentTableData[0][`model${i}`] = summarys[i].baseMoment.windX.toFixed(0);
    momentTableData[1][`model${i}`] = summarys[i].baseMoment.windY.toFixed(0);
    momentTableData[2][`model${i}`] = summarys[i].baseMoment.seismicX.toFixed(
      0
    );
    momentTableData[3][`model${i}`] = summarys[i].baseMoment.seismicY.toFixed(
      0
    );
  }

  const Summarys = (
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
      <h3>结构信息</h3>
      <Table
        columns={modelColumns}
        dataSource={structureTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>质量</h3>
      <Table
        columns={modelColumns}
        dataSource={massTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>层间位移角</h3>
      <Table
        columns={modelColumns}
        dataSource={windDriftTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '风荷载'}
      />
      <Table
        columns={modelColumns}
        dataSource={seismicDriftTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '地震作用'}
      />
      <h3>位移比</h3>
      <Table
        columns={modelColumns}
        dataSource={dispRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>层间位移比</h3>
      <Table
        columns={modelColumns}
        dataSource={dispRatioDTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>剪重比</h3>
      <Table
        columns={modelColumns}
        dataSource={shearWeightTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>刚重比</h3>
      <Table
        columns={modelColumns}
        dataSource={windStiffWeightTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '风荷载'}
      />
      <Table
        columns={modelColumns}
        dataSource={seismicStiffWeightTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '地震作用'}
      />
      <h3>刚度比</h3>
      <Table
        columns={modelColumns}
        dataSource={stiffRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>受剪承载力比</h3>
      <Table
        columns={modelColumns}
        dataSource={shearCapacityTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>动力特性</h3>
      <Table
        columns={modelColumns}
        dataSource={periodTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '周期'}
      />
      <Table
        columns={modelColumns}
        dataSource={modeMassTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        title={() => '质量参与系数'}
      />
      <h3>基底剪力</h3>
      <Table
        columns={modelColumns}
        dataSource={shearTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>基底倾覆力矩</h3>
      <Table
        columns={modelColumns}
        dataSource={momentTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Summarys;
}
