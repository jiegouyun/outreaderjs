import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IParametersFE } from '@outreader/core';
import { ICompare } from '../../interfaces';

export function CompareParametersComponent(parameters: IParametersFE[]) {
  const n = parameters.length;

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

  const generalTableData: ICompare[] = [
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
      iterms: '所在地区',
    },
    {
      key: 3,
      iterms: '地下室层数',
    },
    {
      key: 4,
      iterms: '嵌固端层',
    },
    {
      key: 5,
      iterms: '裙房层数',
    },
    {
      key: 6,
      iterms: '转换层',
    },
    {
      key: 7,
      iterms: '加强层',
    },
  ];

  for (let i = 0; i < n; i++) {
    generalTableData[0][`model${i}`] = parameters[i].general.system;
    generalTableData[1][`model${i}`] = parameters[i].general.material;
    generalTableData[2][`model${i}`] = parameters[i].general.location;
    generalTableData[3][`model${i}`] = parameters[i].general.basement;
    generalTableData[4][`model${i}`] = parameters[i].general.constraintFloor;
    generalTableData[5][`model${i}`] = parameters[i].general.podium;
    generalTableData[6][`model${i}`] = parameters[i].general.transferStorey;
    generalTableData[7][`model${i}`] = parameters[i].general.reinforceStorey;
  }

  const calculateTableData: ICompare[] = [
    {
      key: 0,
      iterms: '连梁刚度折减系数(地震)',
    },
    {
      key: 1,
      iterms: '连梁刚度折减系数(风)',
    },
    {
      key: 2,
      iterms: '刚性楼板假定',
    },
  ];

  for (let i = 0; i < n; i++) {
    calculateTableData[0][`model${i}`] =
      parameters[i].calculate.couplingBeamFactorSeismic;
    calculateTableData[1][`model${i}`] =
      parameters[i].calculate.couplingBeamFactorWind;
    calculateTableData[2][`model${i}`] =
      parameters[i].calculate.rigidFloorAssumption;
  }

  const windTableData: ICompare[] = [
    {
      key: 0,
      iterms: '使用指定风荷载数据',
    },
    {
      key: 1,
      iterms: '执行规范',
    },
    {
      key: 2,
      iterms: '地面粗糙程度',
    },
    {
      key: 3,
      iterms: '修正后基本风压(kN/m^2)',
    },
    {
      key: 4,
      iterms: '风荷载计算阻尼比',
    },
    {
      key: 5,
      iterms: '舒适度验算基本风压(kN/m^2)',
    },
    {
      key: 6,
      iterms: '舒适度验算阻尼比',
    },
  ];

  for (let i = 0; i < n; i++) {
    windTableData[0][`model${i}`] = parameters[i].wind.assigned;
    windTableData[1][`model${i}`] = parameters[i].wind.loadCode;
    windTableData[2][`model${i}`] = parameters[i].wind.terrainRoughness;
    windTableData[3][`model${i}`] = parameters[i].wind.pressureModified;
    windTableData[4][`model${i}`] = parameters[i].wind.dampingRatio;
    windTableData[5][`model${i}`] = parameters[i].wind.pressureComfort;
    windTableData[6][`model${i}`] = parameters[i].wind.dampingRationComfort;
  }

  const seismicTableData: ICompare[] = [
    {
      key: 0,
      iterms: '按地震动区划图GB18306-2015计算',
    },
    {
      key: 1,
      iterms: '设计地震分组',
    },
    {
      key: 2,
      iterms: '地震烈度',
    },
    {
      key: 3,
      iterms: '场地类别',
    },
    {
      key: 4,
      iterms: '特征周期',
    },
    {
      key: 5,
      iterms: '阻尼比',
    },
    {
      key: 6,
      iterms: '周期折减系数',
    },
    {
      key: 7,
      iterms: 'X向偶然偏心',
    },
    {
      key: 8,
      iterms: 'Y向偶然偏心',
    },
    {
      key: 9,
      iterms: '地震影响系数最大值',
    },
    {
      key: 10,
      iterms: '罕遇地震影响系数最大值',
    },
    {
      key: 11,
      iterms: '最大附加阻尼比',
    },
    {
      key: 12,
      iterms: '调整后的水平向减震系数',
    },
  ];

  for (let i = 0; i < n; i++) {
    seismicTableData[0][`model${i}`] = parameters[i].seismic.use2015GB18306;
    seismicTableData[1][`model${i}`] = parameters[i].seismic.group;
    seismicTableData[2][`model${i}`] = parameters[i].seismic.intensity;
    seismicTableData[3][`model${i}`] = parameters[i].seismic.siteCategory;
    seismicTableData[4][`model${i}`] =
      parameters[i].seismic.characteristicPeriod;
    seismicTableData[5][`model${i}`] = parameters[i].seismic.dampingRatio;
    seismicTableData[6][`model${i}`] =
      parameters[i].seismic.periodReductionFactor;
    seismicTableData[7][`model${i}`] = parameters[i].seismic.eccentricityX;
    seismicTableData[8][`model${i}`] = parameters[i].seismic.eccentricityY;
    seismicTableData[9][`model${i}`] = parameters[i].seismic.maxSpectrumValue;
    seismicTableData[10][`model${i}`] =
      parameters[i].seismic.maxSpectrumValueL3;
    seismicTableData[11][`model${i}`] =
      parameters[i].seismic.additionalDampingRatio;
    seismicTableData[12][`model${i}`] =
      parameters[i].seismic.modifiedSeismicReductionFactor;
  }

  const Parameters = (
    <div>
      <h3>结构总体信息</h3>
      <Table
        columns={modelColumns}
        dataSource={generalTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>计算控制信息</h3>
      <Table
        columns={modelColumns}
        dataSource={calculateTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>风荷载信息</h3>
      <Table
        columns={modelColumns}
        dataSource={windTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <h3>地震信息</h3>
      <Table
        columns={modelColumns}
        dataSource={seismicTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Parameters;
}
