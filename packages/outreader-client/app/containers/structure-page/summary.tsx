import { Descriptions, Table } from 'antd';
import React from 'react';
import { ISummaryFE } from '@outreader/core';

export function SummaryComponent(summary: ISummaryFE) {
  const modeColumns = [
    {
      title: '振型',
      dataIndex: 'modeID',
    },
    {
      title: '周期',
      dataIndex: 'period',
    },
    {
      title: '转角',
      dataIndex: 'angle',
    },
    {
      title: '平动系数X',
      dataIndex: 'factorX',
    },
    {
      title: '平动系数Y',
      dataIndex: 'factorY',
    },
    {
      title: '扭转系数Z',
      dataIndex: 'factorZ',
    },
  ];

  const summaryTableData = [];
  for (let i = 0; i < 6; i++) {
    summaryTableData.push({
      modeID: summary.mode.modeID[i],
      period: Math.round(summary.mode.period[i] * 100) / 100,
      angle: Math.round(summary.mode.angle[i]),
      factorX: Math.round(summary.mode.factorX[i]),
      factorY: Math.round(summary.mode.factorY[i]),
      factorZ: Math.round(summary.mode.factorZ[i]),
    });
  }

  const Summary = (
    <div>
      <Descriptions
        title="工程信息"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="工程路径" span={2}>
          {summary.project.dir}
        </Descriptions.Item>
        <Descriptions.Item label="工程名称">
          {summary.project.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="计算日期">
          {summary.project.calDate}
        </Descriptions.Item>
        <Descriptions.Item label="软件名称">
          {summary.project.software}
        </Descriptions.Item>
        <Descriptions.Item label="软件版本">
          {summary.project.softwareVersion}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="结构信息"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="结构体系">
          {summary.structures.system}
        </Descriptions.Item>
        <Descriptions.Item label="结构材料">
          {summary.structures.material}
        </Descriptions.Item>
        <Descriptions.Item label="楼层数">
          {summary.structures.storeys}
        </Descriptions.Item>
        <Descriptions.Item label="结构高度">
          {Math.round(summary.structures.height * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="地下室层数">
          {summary.structures.basement}
        </Descriptions.Item>
        <Descriptions.Item label="嵌固层">
          {summary.structures.constraintFloor}
        </Descriptions.Item>
        <Descriptions.Item label="地震烈度">
          {summary.structures.intensity}
        </Descriptions.Item>
        <Descriptions.Item label="修正后基本风压">
          {summary.structures.pressureModified}
        </Descriptions.Item>
        <Descriptions.Item label="刚性楼板假定">
          {summary.structures.rigidFloorAssumption}
        </Descriptions.Item>
        <Descriptions.Item label="周期折减系数">
          {summary.structures.periodReductionFactor}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="质量"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="活载质量">
          {Math.round(summary.weight.live)}
        </Descriptions.Item>
        <Descriptions.Item label="附加质量">
          {Math.round(summary.weight.super)}
        </Descriptions.Item>
        <Descriptions.Item label="恒载质量">
          {Math.round(summary.weight.dead)}
        </Descriptions.Item>
        <Descriptions.Item label="总质量">
          {Math.round(summary.weight.sum)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="层间位移角"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          1 / {summary.drift.windX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.drift.windX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          1 / {summary.drift.windY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.drift.windY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          1 / {summary.drift.seismicX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.drift.seismicX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          1 / {summary.drift.seismicY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.drift.seismicY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          1 / {summary.drift.limit}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="位移比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="+偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.dispRatio.eccPX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatio.eccPX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.dispRatio.eccPY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatio.eccPY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="-偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.dispRatio.eccNX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatio.eccNX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.dispRatio.eccNY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatio.eccNY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          {summary.dispRatio.limit}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="层间位移比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="+偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.dispRatioStorey.eccPX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatioStorey.eccPX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.dispRatioStorey.eccPY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatioStorey.eccPY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="-偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.dispRatioStorey.eccNX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatioStorey.eccNX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.dispRatioStorey.eccNY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.dispRatioStorey.eccNY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          {summary.dispRatioStorey.limit}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="剪重比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="X向">
          {summary.shearWeightRatio.x}
        </Descriptions.Item>
        <Descriptions.Item label="限值">
          {summary.shearWeightRatio.xLimit}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.shearWeightRatio.y}
        </Descriptions.Item>
        <Descriptions.Item label="限值">
          {summary.shearWeightRatio.yLimit}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="刚重比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.stiffWeightRatio.windX}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summary.stiffWeightRatio.windXCheck}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.stiffWeightRatio.windY}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summary.stiffWeightRatio.windYCheck}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.stiffWeightRatio.seismicX}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summary.stiffWeightRatio.seismicXCheck}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.stiffWeightRatio.seismicY}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summary.stiffWeightRatio.seismicYCheck}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="刚度比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="X向">
          {summary.stiffRatio.x[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.stiffRatio.x[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.stiffRatio.y[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.stiffRatio.y[1]}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="受剪承载力比"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="X向">
          {summary.shearCapacityRatio.x[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.shearCapacityRatio.x[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.shearCapacityRatio.y[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.shearCapacityRatio.y[1]}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="动力特性" bordered size="small"></Descriptions>
      <Table
        columns={modeColumns}
        dataSource={summaryTableData}
        bordered
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 3 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="周期" span={3}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="周期比">
          {Math.round(summary.mode.periodRatio * 100) / 100}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summary.mode.periodRatioCheck}
        </Descriptions.Item>
        <Descriptions.Item label="振型数">
          {summary.mode.count}
        </Descriptions.Item>
        <Descriptions.Item label="振型质量参与系数" span={3}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summary.mode.sumX * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summary.mode.sumY * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="Z向">
          {Math.round(summary.mode.sumZ * 10) / 10}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="基底剪力"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summary.baseShear.windX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summary.baseShear.windY)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summary.baseShear.seismicX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summary.baseShear.seismicY)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="基底倾覆力矩"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summary.baseMoment.windX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summary.baseMoment.windY)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summary.baseMoment.seismicX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summary.baseMoment.seismicY)}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  return Summary;
}
