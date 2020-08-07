import { Breadcrumb, Descriptions, Layout, Menu, message, Table } from 'antd';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { convertStructure } from '@outreader/yjk';
import { initDb } from '../../database';
import { IStyles } from '../../interfaces';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
  content: {
    minHeight: 'calc(100vh - 4rem)',
    padding: '2rem',
  },
};

export function StructurePage() {
  const { hash } = useParams();
  const history = useHistory();
  const [activeItemKey, setActvieItemKey] = useState('summary');
  const structureData = initDb(hash);
  const structure = structureData.value();
  const structureFE = convertStructure(structure);
  const summaryData = structureFE.summary;
  console.log(structure);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  const tableColumns = [
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

  const tableData = [];
  for (let i = 0; i < 6; i++) {
    tableData.push({
      modeID: summaryData.mode.modeID[i],
      period: Math.round(summaryData.mode.period[i] * 100) / 100,
      angle: Math.round(summaryData.mode.angle[i]),
      factorX: Math.round(summaryData.mode.factorX[i]),
      factorY: Math.round(summaryData.mode.factorY[i]),
      factorZ: Math.round(summaryData.mode.factorZ[i]),
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
          {summaryData.project.dir}
        </Descriptions.Item>
        <Descriptions.Item label="工程名称">
          {summaryData.project.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="计算日期">
          {summaryData.project.calDate}
        </Descriptions.Item>
        <Descriptions.Item label="软件名称">
          {summaryData.project.software}
        </Descriptions.Item>
        <Descriptions.Item label="软件版本">
          {summaryData.project.softwareVersion}
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
          {summaryData.structures.system}
        </Descriptions.Item>
        <Descriptions.Item label="结构材料">
          {summaryData.structures.material}
        </Descriptions.Item>
        <Descriptions.Item label="楼层数">
          {summaryData.structures.storeys}
        </Descriptions.Item>
        <Descriptions.Item label="结构高度">
          {Math.round(summaryData.structures.height * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="地下室层数">
          {summaryData.structures.basement}
        </Descriptions.Item>
        <Descriptions.Item label="嵌固层">
          {summaryData.structures.constraintFloor}
        </Descriptions.Item>
        <Descriptions.Item label="地震烈度">
          {summaryData.structures.intensity}
        </Descriptions.Item>
        <Descriptions.Item label="修正后基本风压">
          {summaryData.structures.pressureModified}
        </Descriptions.Item>
        <Descriptions.Item label="刚性楼板假定">
          {summaryData.structures.rigidFloorAssumption}
        </Descriptions.Item>
        <Descriptions.Item label="周期折减系数">
          {summaryData.structures.periodReductionFactor}
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
          {Math.round(summaryData.weight.live)}
        </Descriptions.Item>
        <Descriptions.Item label="附加质量">
          {Math.round(summaryData.weight.super)}
        </Descriptions.Item>
        <Descriptions.Item label="恒载质量">
          {Math.round(summaryData.weight.dead)}
        </Descriptions.Item>
        <Descriptions.Item label="总质量">
          {Math.round(summaryData.weight.sum)}
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
          1 / {summaryData.drift.windX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.drift.windX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          1 / {summaryData.drift.windY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.drift.windY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          1 / {summaryData.drift.seismicX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.drift.seismicX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          1 / {summaryData.drift.seismicY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.drift.seismicY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          1 / {summaryData.drift.limit}
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
          {summaryData.dispRatio.eccPX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatio.eccPX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.dispRatio.eccPY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatio.eccPY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="-偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summaryData.dispRatio.eccNX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatio.eccNX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.dispRatio.eccNY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatio.eccNY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          {summaryData.dispRatio.limit}
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
          {summaryData.dispRatioStorey.eccPX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatioStorey.eccPX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.dispRatioStorey.eccPY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatioStorey.eccPY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="-偏心" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summaryData.dispRatioStorey.eccNX[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatioStorey.eccNX[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.dispRatioStorey.eccNY[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.dispRatioStorey.eccNY[1]}
        </Descriptions.Item>
        <Descriptions.Item label="限值" span={2}>
          {summaryData.dispRatioStorey.limit}
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
          {summaryData.shearWeightRatio.x}
        </Descriptions.Item>
        <Descriptions.Item label="限值">
          {summaryData.shearWeightRatio.xLimit}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.shearWeightRatio.y}
        </Descriptions.Item>
        <Descriptions.Item label="限值">
          {summaryData.shearWeightRatio.yLimit}
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
          {summaryData.stiffWeightRatio.windX}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summaryData.stiffWeightRatio.windXCheck}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.stiffWeightRatio.windY}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summaryData.stiffWeightRatio.windYCheck}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {summaryData.stiffWeightRatio.seismicX}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summaryData.stiffWeightRatio.seismicXCheck}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.stiffWeightRatio.seismicY}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summaryData.stiffWeightRatio.seismicYCheck}
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
          {summaryData.stiffRatio.x[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.stiffRatio.x[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.stiffRatio.y[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.stiffRatio.y[1]}
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
          {summaryData.shearCapacityRatio.x[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.shearCapacityRatio.x[1]}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {summaryData.shearCapacityRatio.y[0]}
        </Descriptions.Item>
        <Descriptions.Item label="楼层">
          {summaryData.shearCapacityRatio.y[1]}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="动力特性" bordered size="small"></Descriptions>
      <Table
        columns={tableColumns}
        dataSource={tableData}
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
          {Math.round(summaryData.mode.periodRatio * 100) / 100}
        </Descriptions.Item>
        <Descriptions.Item label="判断">
          {summaryData.mode.periodRatioCheck}
        </Descriptions.Item>
        <Descriptions.Item label="振型数">
          {summaryData.mode.count}
        </Descriptions.Item>
        <Descriptions.Item label="振型质量参与系数" span={3}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summaryData.mode.sumX * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summaryData.mode.sumY * 10) / 10}
        </Descriptions.Item>
        <Descriptions.Item label="Z向">
          {Math.round(summaryData.mode.sumZ * 10) / 10}
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
          {Math.round(summaryData.baseShear.windX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summaryData.baseShear.windY)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summaryData.baseShear.seismicX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summaryData.baseShear.seismicY)}
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
          {Math.round(summaryData.baseMoment.windX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summaryData.baseMoment.windY)}
        </Descriptions.Item>
        <Descriptions.Item label="地震" span={2}>
          {}
        </Descriptions.Item>
        <Descriptions.Item label="X向">
          {Math.round(summaryData.baseMoment.seismicX)}
        </Descriptions.Item>
        <Descriptions.Item label="Y向">
          {Math.round(summaryData.baseMoment.seismicY)}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const dataMapping = {
    summary: () => {
      return Summary;
    },
  };

  return (
    <React.Fragment>
      <Layout>
        <Layout.Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeItemKey]}
            style={{ height: '100%' }}
            onSelect={({ _, key }) => {
              setActvieItemKey(key as string);
            }}
          >
            <Menu.Item key="summary">项目概况</Menu.Item>
            <Menu.Item key="earthquake">地震作用</Menu.Item>
            <Menu.Item key="wind-force">风荷载</Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content style={styles.content}>
          <Breadcrumb style={{ marginBottom: '1rem' }}>
            <Breadcrumb.Item>
              <a onClick={() => history.replace('/structures')}>我的结构</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{hash.slice(0, 7)}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={styles.container}>{dataMapping[activeItemKey]()}</div>
        </Layout.Content>
      </Layout>
    </React.Fragment>
  );
}
