import { Descriptions, Table } from 'antd';
import React from 'react';
import { IGeneralResultFE } from '@outreader/core';

export function GeneralResultComponent(generalResult: IGeneralResultFE) {
  const towerColumns = [
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '结构体系',
      dataIndex: 'system',
    },
  ];

  const towerTableData = [];
  for (let i = 0; i < generalResult.tower.towerID.length; i++) {
    towerTableData.push({
      towerID: generalResult.tower.towerID[i],
      system: generalResult.tower.structuralSystem[i],
    });
  }

  const stiffRatioColumns = [
    {
      title: '方向',
      dataIndex: 'direction',
    },
    {
      title: '地下一层',
      dataIndex: 'basement1',
    },
    {
      title: '地上一层',
      dataIndex: 'storey1',
    },
    {
      title: '刚度比',
      dataIndex: 'ratio',
    },
  ];

  const stiffRatioTableData = [
    {
      direction: 'X向',
      basement1: generalResult.constraintFloorStiffnessRatio.stiffnessX0,
      storey1: generalResult.constraintFloorStiffnessRatio.stiffnessX1,
      ratio: generalResult.constraintFloorStiffnessRatio.ratioX.toFixed(3),
    },
    {
      direction: 'Y向',
      basement1: generalResult.constraintFloorStiffnessRatio.stiffnessY0,
      storey1: generalResult.constraintFloorStiffnessRatio.stiffnessY1,
      ratio: generalResult.constraintFloorStiffnessRatio.ratioY.toFixed(3),
    },
  ];

  const overturningColumns = [
    {
      title: '方向',
      dataIndex: 'direction',
    },
    {
      title: '抗倾覆力矩Mr',
      dataIndex: 'mr',
    },
    {
      title: '倾覆力矩Mov',
      dataIndex: 'mov',
    },
    {
      title: '比值Mr/Mov',
      dataIndex: 'ratio',
    },
    {
      title: '零应力区(%)',
      dataIndex: 'zeroArea',
    },
  ];

  const overturningTableData = [
    {
      direction: 'X向风',
      mr: generalResult.overturningCheck.mrWindX,
      mov: generalResult.overturningCheck.movWindX,
      ratio: generalResult.overturningCheck.ratioWindX.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaWindX.toFixed(2),
    },
    {
      direction: 'Y向风',
      mr: generalResult.overturningCheck.mrWindY,
      mov: generalResult.overturningCheck.movWindY,
      ratio: generalResult.overturningCheck.ratioWindY.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaWindY.toFixed(2),
    },
    {
      direction: 'X向地震',
      mr: generalResult.overturningCheck.mrSeismicX,
      mov: generalResult.overturningCheck.movSeismicX,
      ratio: generalResult.overturningCheck.ratioSeismicX.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaSeismicX.toFixed(2),
    },
    {
      direction: 'Y向地震',
      mr: generalResult.overturningCheck.mrSeismicY,
      mov: generalResult.overturningCheck.movSeismicY,
      ratio: generalResult.overturningCheck.ratioSeismicY.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaSeismicY.toFixed(2),
    },
  ];

  const stableColumns = [
    {
      title: '荷载',
      dataIndex: 'load',
    },
    {
      title: '层号',
      dataIndex: 'storeyNo',
    },
    {
      title: '塔号',
      dataIndex: 'towerNo',
    },
    {
      title: 'X向',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y向',
      dataIndex: 'ratioY',
    },
  ];

  const stableTableData = [
    {
      load: '风荷载',
      storeyNo: generalResult.stableCheck.windStoreyNo,
      towerNo: generalResult.stableCheck.windTowerNo,
      ratioX: generalResult.stableCheck.windRatioX,
      ratioY: generalResult.stableCheck.windRatioY,
    },
    {
      load: '地震',
      storeyNo: generalResult.stableCheck.seismicStoreyNo,
      towerNo: generalResult.stableCheck.seismicTowerNo,
      ratioX: generalResult.stableCheck.seismicRatioX,
      ratioY: generalResult.stableCheck.seismicRatioY,
    },
  ];

  const windComfortColumns = [
    {
      title: '风向',
      dataIndex: 'direction',
    },
    {
      title: 'X向',
      dataIndex: 'accX',
    },
    {
      title: 'Y向',
      dataIndex: 'accY',
    },
  ];

  const windComfortTableData = [
    {
      direction: '顺风向',
      accX: generalResult.windComfort.accelerationAlongX,
      accY: generalResult.windComfort.accelerationAlongY,
    },
    {
      direction: '横风向',
      accX: generalResult.windComfort.accelerationCrossX,
      accY: generalResult.windComfort.accelerationCrossY,
    },
  ];

  const GeneralResult = (
    <div>
      <Descriptions
        title="工程信息"
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="工程名称">
          {generalResult.project.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="工程代号">
          {generalResult.project.engineeringCode}
        </Descriptions.Item>
        <Descriptions.Item label="设计人">
          {generalResult.project.designer}
        </Descriptions.Item>
        <Descriptions.Item label="校核人">
          {generalResult.project.checker}
        </Descriptions.Item>
        <Descriptions.Item label="软件名称">
          {generalResult.project.software}
        </Descriptions.Item>
        <Descriptions.Item label="版本">
          {generalResult.project.softwareVersion}
        </Descriptions.Item>
        <Descriptions.Item label="计算日期">
          {generalResult.project.calDate}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="塔属性"></Descriptions>
      <Table
        columns={towerColumns}
        dataSource={towerTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="质量信息(t)"
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="活载质量">
          {generalResult.weight.live.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="恒载质量">
          {generalResult.weight.dead.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="附加质量">
          {generalResult.weight.super.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="总质量">
          {generalResult.weight.sum.toFixed(0)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="地下室楼层侧向刚度比验算(剪切刚度)"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="地下室层号">
          {generalResult.constraintFloorStiffnessRatio.storeyNo}
        </Descriptions.Item>
        <Descriptions.Item label="塔号">
          {generalResult.constraintFloorStiffnessRatio.towerNo}
        </Descriptions.Item>
      </Descriptions>
      <Table
        columns={stiffRatioColumns}
        dataSource={stiffRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="结构整体抗倾覆验算"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="层号">
          {generalResult.overturningCheck.storeyNo}
        </Descriptions.Item>
        <Descriptions.Item label="塔号">
          {generalResult.overturningCheck.towerNo}
        </Descriptions.Item>
      </Descriptions>
      <Table
        columns={overturningColumns}
        dataSource={overturningTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="结构整体稳定验算(刚重比)"></Descriptions>
      <Table
        columns={stableColumns}
        dataSource={stableTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="风振舒适度验算(顶点加速度)"></Descriptions>
      <Table
        columns={windComfortColumns}
        dataSource={windComfortTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return GeneralResult;
}
