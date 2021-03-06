import { exportExcel, convertStructure } from '@outreader/core';
import { Breadcrumb, Button, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  SummaryComponent,
  SummaryQuantityComponent,
  ParametersComponent,
  PeriodComponent,
  ForceComponent,
  DriftComponent,
  GeneralResultComponent,
  DistributeResultComponent,
  FactorComponent,
  QuantityComponent,
  AxialCompRatioComponent,
  ReinforcementComponent,
} from '../../components';
import { initDb } from '../../database';
import { IStyles } from '../../interfaces';
import SubMenu from 'antd/lib/menu/SubMenu';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
  sider: {
    background: '#fff',
    overflow: 'auto',
    height: 'calc(100vh - 6rem)',
    position: 'fixed',
    left: 0,
  },
  siderButton: {
    background: '#fff',
    height: '2rem',
    position: 'fixed',
    left: 0,
    bottom: 0,
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
  const summary = structureFE.summary;
  const summaryQuantity = structureFE.summaryQuantity;
  const parameters = structureFE.parameters;
  const period = structureFE.period;
  const force = structureFE.force;
  const drift = structureFE.drift;
  const generalResult = structureFE.generalResult;
  const distributeResult = structureFE.distributeResult;
  const factor = structureFE.factor;
  const quantity = structureFE.quantity;
  const axialCompRatio = structureFE.element.uc;
  const reinforcements = structureFE.element.rs;
  // console.log(structure);
  // console.log(structureFE);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  const dataMapping: { [key: string]: JSX.Element } = {
    summary: SummaryComponent(summary),
    summaryQuantity: SummaryQuantityComponent(summaryQuantity),
    parameters: ParametersComponent(parameters),
    period: PeriodComponent(period),
    force: ForceComponent(force),
    drift: DriftComponent(drift),
    generalResult: GeneralResultComponent(generalResult),
    distributeResult: DistributeResultComponent(distributeResult),
    factor: FactorComponent(factor),
    quantity: QuantityComponent(quantity),
    axialCompRatio: AxialCompRatioComponent(axialCompRatio),
    reinforcement: ReinforcementComponent(reinforcements),
  };

  const exportXLSX = async () => {
    try {
      const res = await exportExcel(structureFE);
      if (res) message.success('导出成功');
    } catch (error) {
      if (error) {
        message.error('导出失败，请检查');
        console.error(error);
      }
    }
  };

  // const downloadImgs = () => {
  //   const chartsSvgList = document.getElementsByClassName('charts');
  //   console.log(chartsSvgList);
  //   // TODO
  // };

  return (
    <React.Fragment>
      <Layout>
        <Layout.Sider style={styles.sider}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeItemKey]}
            style={{ height: '100%' }}
            onClick={({ item, key }) => {
              setActvieItemKey(key as string);
            }}
          >
            <Menu.Item key="summary">汇总信息</Menu.Item>
            <Menu.Item key="summaryQuantity">含钢量汇总</Menu.Item>
            <Menu.Item key="parameters">计算参数</Menu.Item>
            <Menu.Item key="period">周期</Menu.Item>
            <Menu.Item key="force">内力</Menu.Item>
            <Menu.Item key="drift">位移角</Menu.Item>
            <Menu.Item key="generalResult">整体验算结果</Menu.Item>
            <Menu.Item key="distributeResult">楼层分布数据</Menu.Item>
            <Menu.Item key="factor">调整系数</Menu.Item>
            <Menu.Item key="quantity">工程量</Menu.Item>
            <SubMenu key="element" title="构件指标">
              <Menu.Item key="axialCompRatio">轴压比</Menu.Item>
              <Menu.Item key="reinforcement">配筋率</Menu.Item>
            </SubMenu>
            <Menu.Divider />
          </Menu>
        </Layout.Sider>
        <Layout.Sider style={styles.siderButton}>
          <Button type="primary" block onClick={() => exportXLSX()}>
            导出Excel
          </Button>
          {/* <Button type="primary"  block onClick={() => downloadImgs()}>一键下载图片</Button> */}
        </Layout.Sider>
        <Layout className="site-layout" style={{ marginLeft: '12.5rem' }}>
          <Layout.Content style={styles.content}>
            <Breadcrumb style={{ marginBottom: '1rem' }}>
              <Breadcrumb.Item>
                <a onClick={() => history.replace('/structures')}>我的结构</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{hash.slice(0, 7)}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={styles.container}>{dataMapping[activeItemKey]}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
