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
      part: '钢筋含量(kg/m^2)',
      wall: Math.round(summaryQuantity.unitRebar.wall * 100) / 100,
      column: Math.round(summaryQuantity.unitRebar.column * 100) / 100,
      beam: Math.round(summaryQuantity.unitRebar.beam * 100) / 100,
      floor: Math.round(summaryQuantity.unitRebar.floor * 100) / 100,
      total: Math.round(summaryQuantity.unitRebar.total * 100) / 100,
    },
    {
      part: '砼含量(m^3/m^2)',
      wall: Math.round(summaryQuantity.unitConcrete.wall * 100) / 100,
      column: Math.round(summaryQuantity.unitConcrete.column * 100) / 100,
      beam: Math.round(summaryQuantity.unitConcrete.beam * 100) / 100,
      floor: Math.round(summaryQuantity.unitConcrete.floor * 100) / 100,
      total: Math.round(summaryQuantity.unitConcrete.total * 100) / 100,
    },
    {
      part: '型钢含量(kg/m^2)',
      wall: Math.round(summaryQuantity.unitSteel.wall * 100) / 100,
      column: Math.round(summaryQuantity.unitSteel.column * 100) / 100,
      beam: Math.round(summaryQuantity.unitSteel.beam * 100) / 100,
      floor: Math.round(summaryQuantity.unitSteel.floor * 100) / 100,
      total: Math.round(summaryQuantity.unitSteel.total * 100) / 100,
    },
    {
      part: '钢筋总量(t)',
      wall: Math.round(summaryQuantity.rebar.wall / 1000),
      column: Math.round(summaryQuantity.rebar.column / 1000),
      beam: Math.round(summaryQuantity.rebar.beam / 1000),
      floor: Math.round(summaryQuantity.rebar.floor / 1000),
      total: Math.round(summaryQuantity.rebar.total / 1000),
    },
    {
      part: '砼总量(m^3)',
      wall: Math.round(summaryQuantity.concrete.wall),
      column: Math.round(summaryQuantity.concrete.column),
      beam: Math.round(summaryQuantity.concrete.beam),
      floor: Math.round(summaryQuantity.concrete.floor),
      total: Math.round(summaryQuantity.concrete.total),
    },
    {
      part: '型钢总量(t)',
      wall: Math.round(summaryQuantity.steel.wall),
      column: Math.round(summaryQuantity.steel.column),
      beam: Math.round(summaryQuantity.steel.beam),
      floor: Math.round(summaryQuantity.steel.floor),
      total: Math.round(summaryQuantity.steel.total),
    },
  ];

  const SummaryQuantity = (
    <div>
      <Descriptions
        title="含钢量汇总"
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="工程名称">
          {summaryQuantity.structure.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="结构高度(m)">
          {Math.round(summaryQuantity.structure.height * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="结构面积(m^2)">
          {Math.round(summaryQuantity.structure.area)}
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
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        title="材料价格参考"
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
