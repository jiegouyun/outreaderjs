import { Breadcrumb, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { convertStructure } from '@outreader/yjk';
import { initDb } from '../../database';
import { IStyles } from '../../interfaces';
import { SummaryComponent } from './summary';
import { SummaryQuantityComponent } from './summary-quantity';
import { ParametersComponent } from './parameters';
import { PeriodComponent } from './period';
import { ForceComponent } from './force';
import { GeneralResultComponent } from './general-result';
import { FactorComponent } from './factor';

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
  const summary = structureFE.summary;
  const summaryQuantity = structureFE.summaryQuantity;
  const parameters = structureFE.parameters;
  const period = structureFE.period;
  const force = structureFE.force;
  const generalResult = structureFE.generalResult;
  const factor = structureFE.factor;
  console.log(structure);
  console.log(structureFE);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  const Summary = SummaryComponent(summary);
  const SummaryQuantity = SummaryQuantityComponent(summaryQuantity);
  const Parameters = ParametersComponent(parameters);
  const Period = PeriodComponent(period);
  const Force = ForceComponent(force);
  const GeneralResult = GeneralResultComponent(generalResult);
  const Factor = FactorComponent(factor);

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
    generalResult: () => {
      return GeneralResult;
    },
    factor: () => {
      return Factor;
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
