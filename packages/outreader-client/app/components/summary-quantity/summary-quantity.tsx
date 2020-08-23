import { Descriptions, Table } from 'antd';
import React from 'react';
import { ISummaryQuantityFE } from '@outreader/core';

export function SummaryQuantityComponent(summaryQuantity: ISummaryQuantityFE) {
  const summaryQuantityColumns = [
    {
      title: '分项',
      dataIndex: 'part',
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

  const summaryQuantityTableData = [
    {
      key: 0,
      part: '钢筋含量(kg/m^2)',
      wall: summaryQuantity.unitRebar.wall.toFixed(2),
      column: summaryQuantity.unitRebar.column.toFixed(2),
      beam: summaryQuantity.unitRebar.beam.toFixed(2),
      floor: summaryQuantity.unitRebar.floor.toFixed(2),
      total: summaryQuantity.unitRebar.total.toFixed(2),
    },
    {
      key: 1,
      part: '砼含量(m^3/m^2)',
      wall: summaryQuantity.unitConcrete.wall.toFixed(2),
      column: summaryQuantity.unitConcrete.column.toFixed(2),
      beam: summaryQuantity.unitConcrete.beam.toFixed(2),
      floor: summaryQuantity.unitConcrete.floor.toFixed(2),
      total: summaryQuantity.unitConcrete.total.toFixed(2),
    },
    {
      key: 2,
      part: '型钢含量(kg/m^2)',
      wall: (summaryQuantity.unitSteel.wall * 1000).toFixed(2),
      column: (summaryQuantity.unitSteel.column * 1000).toFixed(2),
      beam: (summaryQuantity.unitSteel.beam * 1000).toFixed(2),
      floor: (summaryQuantity.unitSteel.floor * 1000).toFixed(2),
      total: (summaryQuantity.unitSteel.total * 1000).toFixed(2),
    },
    {
      key: 3,
      part: '钢筋总量(t)',
      wall: (summaryQuantity.rebar.wall / 1000).toFixed(0),
      column: (summaryQuantity.rebar.column / 1000).toFixed(0),
      beam: (summaryQuantity.rebar.beam / 1000).toFixed(0),
      floor: (summaryQuantity.rebar.floor / 1000).toFixed(0),
      total: (summaryQuantity.rebar.total / 1000).toFixed(0),
    },
    {
      key: 4,
      part: '砼总量(m^3)',
      wall: summaryQuantity.concrete.wall.toFixed(0),
      column: summaryQuantity.concrete.column.toFixed(0),
      beam: summaryQuantity.concrete.beam.toFixed(0),
      floor: summaryQuantity.concrete.floor.toFixed(0),
      total: summaryQuantity.concrete.total.toFixed(0),
    },
    {
      key: 5,
      part: '型钢总量(t)',
      wall: summaryQuantity.steel.wall.toFixed(0),
      column: summaryQuantity.steel.column.toFixed(0),
      beam: summaryQuantity.steel.beam.toFixed(0),
      floor: summaryQuantity.steel.floor.toFixed(0),
      total: summaryQuantity.steel.total.toFixed(0),
    },
  ];

  const SummaryQuantity = (
    <div>
      <h3>含钢量汇总</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="工程名称">
          {summaryQuantity.structure.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="结构高度(m)">
          {summaryQuantity.structure.height.toFixed(1)}
        </Descriptions.Item>
        <Descriptions.Item label="结构面积(m^2)">
          {summaryQuantity.structure.area.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="结构周期(T1/T2/T3)">
          {summaryQuantity.structure.period}
        </Descriptions.Item>
        <Descriptions.Item label="层间位移角(风/地震)">
          {summaryQuantity.structure.drift}
        </Descriptions.Item>
        <Descriptions.Item label="底层墙厚(X/Y mm)">{}</Descriptions.Item>
        <Descriptions.Item label="底层柱截面(mm)">{}</Descriptions.Item>
      </Descriptions>
      <Table
        columns={summaryQuantityColumns}
        dataSource={summaryQuantityTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>材料价格参考</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="钢筋(元/t)">{6500}</Descriptions.Item>
        <Descriptions.Item label="砼(元/m^3)">{750}</Descriptions.Item>
        <Descriptions.Item label="钢材(元/t)">{13500}</Descriptions.Item>
        <Descriptions.Item label="型钢(元/t)">{10000}</Descriptions.Item>
        <Descriptions.Item label="压型钢板(元/m^2)">{65.7}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  return SummaryQuantity;
}
