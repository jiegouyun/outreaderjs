import { Descriptions, Table } from 'antd';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';

export function DistributeResultComponent(
  distributeResult: IDistributeResultFE
) {
  const storeyColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '属性(标准层)',
      dataIndex: 'attribute',
    },
    {
      title: '层高(m)',
      dataIndex: 'height',
    },
    {
      title: '累计高度(m)',
      dataIndex: 'heightTD',
    },
    {
      title: '面积(m^2)',
      dataIndex: 'area',
    },
  ];

  const storeyTableData = [];
  for (let i = 0; i < distributeResult.storey.storeyID.length; i++) {
    storeyTableData.push({
      storeyID: distributeResult.storey.storeyID[i],
      towerID: distributeResult.storey.towerID[i],
      attribute: distributeResult.storey.attribute[i],
      height: distributeResult.storey.height[i],
      heightTD: distributeResult.storey.heightToGround[i],
      area: distributeResult.storey.area[i],
    });
  }

  const massRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '楼层质量(kg)',
      dataIndex: 'mass',
    },
    {
      title: '质量比',
      dataIndex: 'ratio',
    },
    {
      title: '单位质量(kg/m^2)',
      dataIndex: 'unitMass',
    },
    {
      title: '单位质量比',
      dataIndex: 'unitRatio',
    },
  ];

  const massRatioTableData = [];
  for (let i = 0; i < distributeResult.massRatio.storeyID.length; i++) {
    massRatioTableData.push({
      storeyID: distributeResult.massRatio.storeyID[i],
      towerID: distributeResult.massRatio.towerID[i],
      mass: distributeResult.massRatio.storeyMass[i],
      ratio: distributeResult.massRatio.ratio[i],
      unitMass: distributeResult.massRatio.massPerArea[i],
      unitRatio: distributeResult.massRatio.massPerAreaRatio[i],
    });
  }

  const stiffRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratx1',
    },
    {
      title: 'Y',
      dataIndex: 'raty1',
    },
    {
      title: 'X(层高修正)',
      dataIndex: 'ratx2',
    },
    {
      title: 'Y(层高修正)',
      dataIndex: 'raty2',
    },
  ];

  const stiffRatioTableData = [];
  for (let i = 0; i < distributeResult.stiffness.storeyID.length; i++) {
    stiffRatioTableData.push({
      storeyID: distributeResult.stiffness.storeyID[i],
      towerID: distributeResult.stiffness.towerID[i],
      ratx1: distributeResult.stiffness.ratx1[i],
      raty1: distributeResult.stiffness.raty1[i],
      ratx2: distributeResult.stiffness.ratx2[i],
      raty2: distributeResult.stiffness.raty2[i],
    });
  }

  const shearWeightColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
    },
  ];

  const shearWeightTableData = [];
  for (let i = 0; i < distributeResult.shearWeightRatio.storeyID.length; i++) {
    shearWeightTableData.push({
      storeyID: distributeResult.shearWeightRatio.storeyID[i],
      towerID: distributeResult.shearWeightRatio.towerID[i],
      ratioX: distributeResult.shearWeightRatio.factorX[i],
      ratioY: distributeResult.shearWeightRatio.factorY[i],
    });
  }

  const shearCapacityColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
    },
  ];

  const shearCapacityTableData = [];
  for (
    let i = 0;
    i < distributeResult.shearCapacityCheck.storeyID.length;
    i++
  ) {
    shearCapacityTableData.push({
      storeyID: distributeResult.shearCapacityCheck.storeyID[i],
      towerID: distributeResult.shearCapacityCheck.towerID[i],
      ratioX: distributeResult.shearCapacityCheck.ratioX[i],
      ratioY: distributeResult.shearCapacityCheck.ratioY[i],
    });
  }

  const momentDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X向柱',
      dataIndex: 'columnX',
    },
    {
      title: 'X向短肢墙',
      dataIndex: 'wallX',
    },
    {
      title: 'Y向柱',
      dataIndex: 'columnY',
    },
    {
      title: 'Y向短肢墙',
      dataIndex: 'wallY',
    },
  ];

  const momentDistributeTableData = [];
  for (let i = 0; i < distributeResult.momentPercent.storeyID.length; i++) {
    momentDistributeTableData.push({
      storeyID: distributeResult.momentPercent.storeyID[i],
      towerID: distributeResult.momentPercent.towerID[i],
      columnX: distributeResult.momentPercent.percentColumnX[i],
      wallX: distributeResult.momentPercent.percentWallX[i],
      columnY: distributeResult.momentPercent.percentColumnY[i],
      wallY: distributeResult.momentPercent.percentWallY[i],
    });
  }

  const shearDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
    },
  ];

  const shearDistributeTableData = [];
  for (let i = 0; i < distributeResult.columnShear.storeyID.length; i++) {
    shearDistributeTableData.push({
      storeyID: distributeResult.columnShear.storeyID[i],
      towerID: distributeResult.columnShear.towerID[i],
      ratioX: distributeResult.columnShear.percentColumnX[i],
      ratioY: distributeResult.columnShear.percentColumnY[i],
    });
  }

  const DistributeResult = (
    <div>
      <Descriptions title="楼层属性"></Descriptions>
      <Table
        columns={storeyColumns}
        dataSource={storeyTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="质量比"></Descriptions>
      <Table
        columns={massRatioColumns}
        dataSource={massRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="刚度比"></Descriptions>
      <Table
        columns={stiffRatioColumns}
        dataSource={stiffRatioTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="剪重比"></Descriptions>
      <Table
        columns={shearWeightColumns}
        dataSource={shearWeightTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="抗剪承载力比"></Descriptions>
      <Table
        columns={shearCapacityColumns}
        dataSource={shearCapacityTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="规定水平力下倾覆力矩分配"></Descriptions>
      <Table
        columns={momentDistributeColumns}
        dataSource={momentDistributeTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="柱剪力与分段基底剪力百分比"></Descriptions>
      <Table
        columns={shearDistributeColumns}
        dataSource={shearDistributeTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return DistributeResult;
}
