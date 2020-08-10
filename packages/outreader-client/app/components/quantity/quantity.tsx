import { Descriptions, Table } from 'antd';
import React from 'react';
import { IQuantityFE } from '@outreader/core';

export function QuantityComponent(quantity: IQuantityFE) {
  const quantityColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '面积(m^2)',
      dataIndex: 'area',
    },
    {
      title: '墙',
      dataIndex: 'wall',
    },
    {
      title: '柱',
      dataIndex: 'column',
    },
    {
      title: '梁',
      dataIndex: 'beam',
    },
    {
      title: '板',
      dataIndex: 'floor',
    },
    {
      title: '合计',
      dataIndex: 'total',
    },
  ];

  const unitConcreteTableData = [];
  for (let i = 0; i < quantity.unitConcrete.storeyID.length; i++) {
    unitConcreteTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.unitConcrete.wall[i] * 100) / 100,
      column: Math.round(quantity.unitConcrete.column[i] * 100) / 100,
      beam: Math.round(quantity.unitConcrete.beam[i] * 100) / 100,
      floor: Math.round(quantity.unitConcrete.floor[i] * 100) / 100,
      total: Math.round(quantity.unitConcrete.storey[i] * 100) / 100,
    });
  }

  const concreteTableData = [];
  for (let i = 0; i < quantity.concrete.storeyID.length; i++) {
    concreteTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.concrete.wall[i]),
      column: Math.round(quantity.concrete.column[i]),
      beam: Math.round(quantity.concrete.beam[i]),
      floor: Math.round(quantity.concrete.floor[i]),
      total: Math.round(quantity.concrete.storey[i]),
    });
  }

  const unitSteelTableData = [];
  for (let i = 0; i < quantity.unitSteel.storeyID.length; i++) {
    unitSteelTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.unitSteel.wall[i] * 100000) / 100,
      column: Math.round(quantity.unitSteel.column[i] * 100000) / 100,
      beam: Math.round(quantity.unitSteel.beam[i] * 100000) / 100,
      floor: Math.round(quantity.unitSteel.floor[i] * 100000) / 100,
      total: Math.round(quantity.unitSteel.storey[i] * 100000) / 100,
    });
  }

  const steelTableData = [];
  for (let i = 0; i < quantity.steel.storeyID.length; i++) {
    steelTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.steel.wall[i]),
      column: Math.round(quantity.steel.column[i]),
      beam: Math.round(quantity.steel.beam[i]),
      floor: Math.round(quantity.steel.floor[i]),
      total: Math.round(quantity.steel.storey[i]),
    });
  }

  const unitRebarTableData = [];
  for (let i = 0; i < quantity.unitRebar.storeyID.length; i++) {
    unitRebarTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.unitRebar.wall[i] * 100) / 100,
      column: Math.round(quantity.unitRebar.column[i] * 100) / 100,
      beam: Math.round(quantity.unitRebar.beam[i] * 100) / 100,
      floor: Math.round(quantity.unitRebar.floor[i] * 100) / 100,
      total: Math.round(quantity.unitRebar.storey[i] * 100) / 100,
    });
  }

  const rebarTableData = [];
  for (let i = 0; i < quantity.rebar.storeyID.length; i++) {
    rebarTableData.push({
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.rebar.wall[i] / 1000),
      beam: Math.round(quantity.rebar.beam[i] / 1000),
      floor: Math.round(quantity.rebar.floor[i] / 1000),
      total: Math.round(quantity.rebar.storey[i] / 1000),
    });
  }

  const Quantity = (
    <div>
      <Descriptions title="砼用量(m^3)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={concreteTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="砼含量(m^3/m^2)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={unitConcreteTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="型钢用量(t)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={steelTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="型钢含量(kg/m^2)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={unitSteelTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="钢筋用量(t)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={rebarTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="钢筋含量(kg/m^2)"></Descriptions>
      <Table
        columns={quantityColumns}
        dataSource={unitRebarTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Quantity;
}
