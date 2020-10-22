import { Descriptions, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ISummaryFE } from '@outreader/core';

export function SummaryComponent(summary: ISummaryFE) {
  const modeColumns: ColumnsType<Object> = [
    {
      title: '振型',
      dataIndex: 'modeID',
      align: 'left',
    },
    {
      title: '周期',
      dataIndex: 'period',
      align: 'right',
    },
    {
      title: '转角',
      dataIndex: 'angle',
      align: 'right',
    },
    {
      title: '平动系数X',
      dataIndex: 'factorX',
      align: 'right',
    },
    {
      title: '平动系数Y',
      dataIndex: 'factorY',
      align: 'right',
    },
    {
      title: '扭转系数Z',
      dataIndex: 'factorZ',
      align: 'right',
    },
  ];

  const summaryTableData = [];
  for (let i = 0; i < Math.min(6, summary.mode.modeID.length); i++) {
    summaryTableData.push({
      key: i,
      modeID: summary.mode.modeID[i],
      period: summary.mode.period[i].toFixed(2),
      angle: summary.mode.angle[i].toFixed(0),
      factorX: summary.mode.factorX[i].toFixed(2),
      factorY: summary.mode.factorY[i].toFixed(2),
      factorZ: summary.mode.factorZ[i].toFixed(2),
    });
  }

  const Summary = (
    <React.Fragment>
      <h3>工程信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>结构信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
          {summary.structures.height.toFixed(1)}
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
      <h3>质量</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="活载质量">
          {summary.weight.live.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="附加质量">
          {summary.weight.super.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="恒载质量">
          {summary.weight.dead.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="总质量">
          {summary.weight.sum.toFixed(0)}
        </Descriptions.Item>
      </Descriptions>
      <h3>层间位移角</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>位移比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>层间位移比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>剪重比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>刚重比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>刚度比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="X向">
          {summary.stiffRatio.x[0].toFixed(3)}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.stiffRatio.x[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.stiffRatio.y[0].toFixed(3)}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summary.stiffRatio.y[1]}
        </Descriptions.Item>
      </Descriptions>
      <h3>受剪承载力比</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
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
      <h3>动力特性</h3>
      <Descriptions bordered size="small"></Descriptions>
      <Table
        columns={modeColumns}
        dataSource={summaryTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 3 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="周期" span={3}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="周期比">
          {summary.mode.periodRatio.toFixed(2)}
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
          {summary.mode.sumX.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.mode.sumY.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Z向">
          {summary.mode.sumZ.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>
      <h3>基底剪力</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.baseShear.windX.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.baseShear.windY.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.baseShear.seismicX.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.baseShear.seismicY.toFixed(0)}
        </Descriptions.Item>
      </Descriptions>
      <h3>基底倾覆力矩</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="风荷载" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.baseMoment.windX.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.baseMoment.windY.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summary.baseMoment.seismicX.toFixed(0)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summary.baseMoment.seismicY.toFixed(0)}
        </Descriptions.Item>
      </Descriptions>
    </React.Fragment>
  );

  return Summary;
}
