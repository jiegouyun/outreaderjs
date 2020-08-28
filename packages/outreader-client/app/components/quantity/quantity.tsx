import { Table, Row, Col, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IQuantityFE } from '@outreader/core';
import { QuantityChart } from './../quantity-chart';

export function QuantityComponent(quantity: IQuantityFE) {
  const quantityColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '面积(m^2)',
      dataIndex: 'area',
      align: 'right',
    },
    {
      title: '墙',
      dataIndex: 'wall',
      align: 'right',
    },
    {
      title: '柱',
      dataIndex: 'column',
      align: 'right',
    },
    {
      title: '梁',
      dataIndex: 'beam',
      align: 'right',
    },
    {
      title: '板',
      dataIndex: 'floor',
      align: 'right',
    },
    {
      title: '合计',
      dataIndex: 'total',
      align: 'right',
    },
  ];

  const unitConcreteTableData = [];
  for (let i = 0; i < quantity.unitConcrete.storeyID.length; i++) {
    unitConcreteTableData.push({
      key: i,
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
  const concretePercentChartData = [];
  for (let i = 0; i < quantity.concrete.storeyID.length; i++) {
    concreteTableData.push({
      key: i,
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.concrete.wall[i]),
      column: Math.round(quantity.concrete.column[i]),
      beam: Math.round(quantity.concrete.beam[i]),
      floor: Math.round(quantity.concrete.floor[i]),
      total: Math.round(quantity.concrete.storey[i]),
    });
    concretePercentChartData.push({
      storeyID: quantity.storeyID[i],
      wall:
        Math.round(
          (quantity.concrete.wall[i] / quantity.concrete.storey[i]) * 100
        ) / 100,
      column:
        Math.round(
          (quantity.concrete.column[i] / quantity.concrete.storey[i]) * 100
        ) / 100,
      beam:
        Math.round(
          (quantity.concrete.beam[i] / quantity.concrete.storey[i]) * 100
        ) / 100,
      floor:
        Math.round(
          (1 -
            Math.round(
              (quantity.concrete.wall[i] / quantity.concrete.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.concrete.column[i] / quantity.concrete.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.concrete.beam[i] / quantity.concrete.storey[i]) * 100
            ) /
              100) *
            100
        ) / 100,
    });
  }

  const unitSteelTableData = [];
  for (let i = 0; i < quantity.unitSteel.storeyID.length; i++) {
    unitSteelTableData.push({
      key: i,
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
  const steelPercentChartData = [];
  for (let i = 0; i < quantity.steel.storeyID.length; i++) {
    steelTableData.push({
      key: i,
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.steel.wall[i]),
      column: Math.round(quantity.steel.column[i]),
      beam: Math.round(quantity.steel.beam[i]),
      floor: Math.round(quantity.steel.floor[i]),
      total: Math.round(quantity.steel.storey[i]),
    });
    steelPercentChartData.push({
      storeyID: quantity.storeyID[i],
      wall:
        Math.round((quantity.steel.wall[i] / quantity.steel.storey[i]) * 100) /
        100,
      column:
        Math.round(
          (quantity.steel.column[i] / quantity.steel.storey[i]) * 100
        ) / 100,
      beam:
        Math.round((quantity.steel.beam[i] / quantity.steel.storey[i]) * 100) /
        100,
      floor:
        Math.round(
          (1 -
            Math.round(
              (quantity.steel.wall[i] / quantity.steel.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.steel.column[i] / quantity.steel.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.steel.beam[i] / quantity.steel.storey[i]) * 100
            ) /
              100) *
            100
        ) / 100,
    });
  }

  const unitRebarTableData = [];
  for (let i = 0; i < quantity.unitRebar.storeyID.length; i++) {
    unitRebarTableData.push({
      key: i,
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
  const rebarPercentChartData = [];
  for (let i = 0; i < quantity.rebar.storeyID.length; i++) {
    rebarTableData.push({
      key: i,
      storeyID: quantity.storeyID[i],
      area: Math.round(quantity.area[i] * 10) / 10,
      wall: Math.round(quantity.rebar.wall[i] / 1000),
      column: Math.round(quantity.rebar.column[i] / 1000),
      beam: Math.round(quantity.rebar.beam[i] / 1000),
      floor: Math.round(quantity.rebar.floor[i] / 1000),
      total: Math.round(quantity.rebar.storey[i] / 1000),
    });
    rebarPercentChartData.push({
      storeyID: quantity.storeyID[i],
      wall:
        Math.round((quantity.rebar.wall[i] / quantity.rebar.storey[i]) * 100) /
        100,
      column:
        Math.round(
          (quantity.rebar.column[i] / quantity.rebar.storey[i]) * 100
        ) / 100,
      beam:
        Math.round((quantity.rebar.beam[i] / quantity.rebar.storey[i]) * 100) /
        100,
      floor:
        Math.round(
          (1 -
            Math.round(
              (quantity.rebar.wall[i] / quantity.rebar.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.rebar.column[i] / quantity.rebar.storey[i]) * 100
            ) /
              100 -
            Math.round(
              (quantity.rebar.beam[i] / quantity.rebar.storey[i]) * 100
            ) /
              100) *
            100
        ) / 100,
    });
  }

  const { Panel } = Collapse;
  const Quantity = (
    <div>
      <h3>砼用量</h3>
      <Row>
        <Col span={12}>
          <QuantityChart
            data={concreteTableData.slice()}
            xLabel="砼用量(m^3)"
          />
        </Col>
        <Col span={12}>
          <QuantityChart data={concretePercentChartData} xLabel="砼用量占比" />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={concreteTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>砼含量</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={unitConcreteTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>型钢用量</h3>
      <Row>
        <Col span={12}>
          <QuantityChart data={steelTableData.slice()} xLabel="型钢用量(t)" />
        </Col>
        <Col span={12}>
          <QuantityChart data={steelPercentChartData} xLabel="型钢用量占比" />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={steelTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>型钢含量</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={unitSteelTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>钢筋用量</h3>
      <Row>
        <Col span={12}>
          <QuantityChart data={rebarTableData.slice()} xLabel="钢筋用量(t)" />
        </Col>
        <Col span={12}>
          <QuantityChart data={rebarPercentChartData} xLabel="钢筋用量占比" />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={rebarTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>钢筋含量</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={quantityColumns}
            dataSource={unitRebarTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Quantity;
}
