import { Descriptions, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IGeneralResultFE } from '@outreader/core';

export function GeneralResultComponent(generalResult: IGeneralResultFE) {
  const towerColumns: ColumnsType<Object> = [
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'left',
    },
    {
      title: '结构体系',
      dataIndex: 'system',
      align: 'right',
    },
  ];

  const towerTableData = [];
  for (let i = 0; i < generalResult.tower.towerID.length; i++) {
    towerTableData.push({
      key: i,
      towerID: generalResult.tower.towerID[i],
      system: generalResult.tower.structuralSystem[i],
    });
  }

  const stiffRatioColumns: ColumnsType<Object> = [
    {
      title: '方向',
      dataIndex: 'direction',
      align: 'left',
    },
    {
      title: '地下一层',
      dataIndex: 'basement1',
      align: 'right',
    },
    {
      title: '地上一层',
      dataIndex: 'storey1',
      align: 'right',
    },
    {
      title: '刚度比',
      dataIndex: 'ratio',
      align: 'right',
    },
  ];

  const stiffRatioTableData = [
    {
      key: 0,
      direction: 'X向',
      basement1: generalResult.constraintFloorStiffnessRatio.stiffnessX0,
      storey1: generalResult.constraintFloorStiffnessRatio.stiffnessX1,
      ratio: generalResult.constraintFloorStiffnessRatio.ratioX.toFixed(3),
    },
    {
      key: 1,
      direction: 'Y向',
      basement1: generalResult.constraintFloorStiffnessRatio.stiffnessY0,
      storey1: generalResult.constraintFloorStiffnessRatio.stiffnessY1,
      ratio: generalResult.constraintFloorStiffnessRatio.ratioY.toFixed(3),
    },
  ];

  const overturningColumns: ColumnsType<Object> = [
    {
      title: '方向',
      dataIndex: 'direction',
      align: 'left',
    },
    {
      title: '抗倾覆力矩Mr',
      dataIndex: 'mr',
      align: 'right',
    },
    {
      title: '倾覆力矩Mov',
      dataIndex: 'mov',
      align: 'right',
    },
    {
      title: '比值Mr/Mov',
      dataIndex: 'ratio',
      align: 'right',
    },
    {
      title: '零应力区(%)',
      dataIndex: 'zeroArea',
      align: 'right',
    },
  ];

  const overturningTableData = [
    {
      key: 0,
      direction: 'X向风',
      mr: generalResult.overturningCheck.mrWindX,
      mov: generalResult.overturningCheck.movWindX,
      ratio: generalResult.overturningCheck.ratioWindX.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaWindX.toFixed(2),
    },
    {
      key: 1,
      direction: 'Y向风',
      mr: generalResult.overturningCheck.mrWindY,
      mov: generalResult.overturningCheck.movWindY,
      ratio: generalResult.overturningCheck.ratioWindY.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaWindY.toFixed(2),
    },
    {
      key: 2,
      direction: 'X向地震',
      mr: generalResult.overturningCheck.mrSeismicX,
      mov: generalResult.overturningCheck.movSeismicX,
      ratio: generalResult.overturningCheck.ratioSeismicX.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaSeismicX.toFixed(2),
    },
    {
      key: 3,
      direction: 'Y向地震',
      mr: generalResult.overturningCheck.mrSeismicY,
      mov: generalResult.overturningCheck.movSeismicY,
      ratio: generalResult.overturningCheck.ratioSeismicY.toFixed(2),
      zeroArea: generalResult.overturningCheck.zeroAreaSeismicY.toFixed(2),
    },
  ];

  const stableColumns: ColumnsType<Object> = [
    {
      title: '荷载',
      dataIndex: 'load',
      align: 'left',
    },
    {
      title: '层号',
      dataIndex: 'storeyNo',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerNo',
      align: 'right',
    },
    {
      title: 'X向',
      dataIndex: 'ratioX',
      align: 'right',
    },
    {
      title: 'Y向',
      dataIndex: 'ratioY',
      align: 'right',
    },
  ];

  const stableTableData = [
    {
      key: 0,
      load: '风荷载',
      storeyNo: generalResult.stableCheck.windStoreyNo,
      towerNo: generalResult.stableCheck.windTowerNo,
      ratioX: generalResult.stableCheck.windRatioX,
      ratioY: generalResult.stableCheck.windRatioY,
    },
    {
      key: 1,
      load: '地震',
      storeyNo: generalResult.stableCheck.seismicStoreyNo,
      towerNo: generalResult.stableCheck.seismicTowerNo,
      ratioX: generalResult.stableCheck.seismicRatioX,
      ratioY: generalResult.stableCheck.seismicRatioY,
    },
  ];

  const windComfortColumns: ColumnsType<Object> = [
    {
      title: '风向',
      dataIndex: 'direction',
      align: 'left',
    },
    {
      title: 'X向',
      dataIndex: 'accX',
      align: 'right',
    },
    {
      title: 'Y向',
      dataIndex: 'accY',
      align: 'right',
    },
  ];

  const windComfortTableData = [
    {
      key: 0,
      direction: '顺风向',
      accX: generalResult.windComfort.accelerationAlongX,
      accY: generalResult.windComfort.accelerationAlongY,
    },
    {
      key: 1,
      direction: '横风向',
      accX: generalResult.windComfort.accelerationCrossX,
      accY: generalResult.windComfort.accelerationCrossY,
    },
  ];

  const GeneralResult = (
    <React.Fragment>
      <h3>工程信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>塔属性</h3>
      <Table
        columns={towerColumns}
        dataSource={towerTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>质量信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>地下室楼层侧向刚度比验算(剪切刚度)</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>结构整体抗倾覆验算</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>结构整体稳定验算(刚重比)</h3>
      <Table
        columns={stableColumns}
        dataSource={stableTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>风振舒适度验算(顶点加速度)</h3>
      <Table
        columns={windComfortColumns}
        dataSource={windComfortTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </React.Fragment>
  );

  return GeneralResult;
}
