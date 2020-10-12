import { Descriptions, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ISummaryQuantityFE } from '@outreader/core';
import { ICompare } from '../../../interfaces';

export function CompareSummaryQuantityComponent(
  summaryQuantities: ISummaryQuantityFE[]
) {
  const n = summaryQuantities.length;

  const modelColumns: ColumnsType<ICompare> = [
    {
      title: '分项',
      dataIndex: 'iterms',
      width: '20%',
      align: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    modelColumns.push({
      title: `模型${i + 1}`,
      dataIndex: `model${i}`,
      width: `${80 / n}%`,
      align: 'right',
    });
  }

  const quantityTableData: ICompare[] = [
    {
      key: 0,
      iterms: '结构高度(m)',
    },
    {
      key: 1,
      iterms: '结构面积(m^2)',
    },
    {
      key: 2,
      iterms: '砼总量(m^3)',
    },
    {
      key: 3,
      iterms: '砼含量(m^3/m^2)',
    },
    {
      key: 4,
      iterms: '钢筋总量(t)',
    },
    {
      key: 5,
      iterms: '钢筋含量(kg/m^2)',
    },
    {
      key: 6,
      iterms: '型钢总量(t)',
    },
    {
      key: 7,
      iterms: '型钢含量(kg/m^2)',
    },
  ];

  for (let i = 0; i < n; i++) {
    quantityTableData[0][`model${i}`] = summaryQuantities[
      i
    ].structure.height.toFixed(1);
    quantityTableData[1][`model${i}`] = summaryQuantities[
      i
    ].structure.area.toFixed(0);
    quantityTableData[2][`model${i}`] = summaryQuantities[
      i
    ].concrete.total.toFixed(0);
    quantityTableData[3][`model${i}`] = summaryQuantities[
      i
    ].unitConcrete.total.toFixed(2);
    quantityTableData[4][`model${i}`] = (
      summaryQuantities[i].rebar.total / 1000
    ).toFixed(0);
    quantityTableData[5][`model${i}`] = summaryQuantities[
      i
    ].unitRebar.total.toFixed(2);
    quantityTableData[6][`model${i}`] = summaryQuantities[
      i
    ].steel.total.toFixed(0);
    quantityTableData[7][`model${i}`] = (
      summaryQuantities[i].unitSteel.total * 1000
    ).toFixed(2);
  }

  const SummaryQuantities = (
    <div>
      <h3>含钢量汇总</h3>
      <Table
        columns={modelColumns}
        dataSource={quantityTableData}
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
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="钢筋(元/t)" style={{ width: '20%' }}>
          {6500}
        </Descriptions.Item>
        <Descriptions.Item label="砼(元/m^3)" style={{ width: '20%' }}>
          {750}
        </Descriptions.Item>
        <Descriptions.Item label="钢材(元/t)" style={{ width: '20%' }}>
          {13500}
        </Descriptions.Item>
        <Descriptions.Item label="型钢(元/t)" style={{ width: '20%' }}>
          {10000}
        </Descriptions.Item>
        <Descriptions.Item label="压型钢板(元/m^2)" style={{ width: '20%' }}>
          {65.7}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  return SummaryQuantities;
}
