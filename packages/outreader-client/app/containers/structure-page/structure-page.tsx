import { convertStructure } from '@outreader/yjk';
import { exportExcel } from '@outreader/core';
import { Breadcrumb, Layout, Menu, message, Card, Divider } from 'antd';
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
} from '../../components';
import { initDb } from '../../database';
import { IStyles } from '../../interfaces';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
  sider: {
    background: '#fff',
    overflow: 'auto',
    height: 'calc(100vh - 4rem)',
    position: 'fixed',
    left: 0,
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
  // console.log(structure);
  // console.log(structureFE);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  const Summary = SummaryComponent(summary);
  const SummaryQuantity = SummaryQuantityComponent(summaryQuantity);
  const Parameters = ParametersComponent(parameters);
  const Period = PeriodComponent(period);
  const Force = ForceComponent(force);
  const Drift = DriftComponent(drift);
  const GeneralResult = GeneralResultComponent(generalResult);
  const DistributeResult = DistributeResultComponent(distributeResult);
  const Factor = FactorComponent(factor);
  const Quantity = QuantityComponent(quantity);

  const dataMapping = {
    summary: () => {
      return Summary;
    },
    summaryQuantity: () => {
      return SummaryQuantity;
    },
    parameters: () => {
      return Parameters;
    },
    period: () => {
      return Period;
    },
    force: () => {
      return Force;
    },
    drift: () => {
      return Drift;
    },
    generalResult: () => {
      return GeneralResult;
    },
    distributeResult: () => {
      return DistributeResult;
    },
    factor: () => {
      return Factor;
    },
    quantity: () => {
      return Quantity;
    },
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

  const downloadImgs = () => {
    const chartsSvgList = document.getElementsByClassName('charts');
    console.log(chartsSvgList);
    // TODO
  };

  return (
    <React.Fragment>
      <Layout>
        <Layout.Sider style={styles.sider}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeItemKey]}
            style={{ height: '100%' }}
            onSelect={({ _, key }) => {
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
            <Divider />
            <p style={{ marginLeft: '1.5rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              <a onClick={() => exportXLSX()}>导出Excel</a>
            </p>
            {/* <p style={{ marginLeft: '1.5rem', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
              <a onClick={() => downloadImgs()}>一键下载图片</a>
            </p> */}
          </Menu>
        </Layout.Sider>
        <Layout className="site-layout" style={{ marginLeft: '12.5rem' }}>
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
      </Layout>
    </React.Fragment>
  );
}
