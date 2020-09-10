import {
  exportCompareExcel,
  ISummaryFE,
  ISummaryQuantityFE,
  IParametersFE,
  IPeriodFE,
  IForceFE,
  IDriftFE,
  IGeneralResultFE,
  IDistributeResultFE,
  IFactorFE,
  IQuantityFE,
  IStructureFrontEnd,
} from '@outreader/core';
import { convertStructure } from '@outreader/yjk';
import { Breadcrumb, Layout, Menu, message, Divider } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import {
  CompareDistributeResultComponent,
  CompareDriftComponent,
  CompareFactorComponent,
  CompareForceComponent,
  CompareGeneralResultComponent,
  CompareParametersComponent,
  ComparePeriodComponent,
  CompareQuantityComponent,
  CompareSummaryComponent,
  CompareSummaryQuantityComponent,
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

export function StructureComparePage() {
  const query = new URLSearchParams(useLocation().search);
  const hashes = query.get('hashes')?.split(',');
  // TODO: guard hashed undefined or hashes.length < 2
  console.log(hashes);

  // TODO: read all structures to compare
  const structureFEs: IStructureFrontEnd[] = [];
  const summarys: ISummaryFE[] = [];
  const summaryQuantities: ISummaryQuantityFE[] = [];
  const parameters: IParametersFE[] = [];
  const periods: IPeriodFE[] = [];
  const forces: IForceFE[] = [];
  const drifts: IDriftFE[] = [];
  const generalResults: IGeneralResultFE[] = [];
  const distributeResults: IDistributeResultFE[] = [];
  const factors: IFactorFE[] = [];
  const quantities: IQuantityFE[] = [];
  hashes?.forEach((hash) => {
    const structureData = initDb(hash);
    const structure = structureData.value();
    const structureFE = convertStructure(structure);
    structureFEs.push(structureFE);
    summarys.push(structureFE.summary);
    summaryQuantities.push(structureFE.summaryQuantity);
    parameters.push(structureFE.parameters);
    periods.push(structureFE.period);
    forces.push(structureFE.force);
    drifts.push(structureFE.drift);
    generalResults.push(structureFE.generalResult);
    distributeResults.push(structureFE.distributeResult);
    factors.push(structureFE.factor);
    quantities.push(structureFE.quantity);
    if (!structure.hash) {
      message.error('找不到模型');
      history.replace('/');
    }
  });

  const hash = hashes[0];
  const history = useHistory();
  const [activeItemKey, setActvieItemKey] = useState('summary');

  const Summarys = CompareSummaryComponent(summarys);
  const SummaryQuantities = CompareSummaryQuantityComponent(summaryQuantities);
  const Parameters = CompareParametersComponent(parameters);
  const Periods = ComparePeriodComponent(periods);
  const Forces = CompareForceComponent(forces);
  const Drifts = CompareDriftComponent(drifts);
  const GeneralResults = CompareGeneralResultComponent(generalResults);
  const DistributeResults = CompareDistributeResultComponent(distributeResults);
  const Factors = CompareFactorComponent(factors);
  const Quantities = CompareQuantityComponent(quantities);

  const dataMapping = {
    summary: () => {
      return Summarys;
    },
    summaryQuantity: () => {
      return SummaryQuantities;
    },
    parameters: () => {
      return Parameters;
    },
    period: () => {
      return Periods;
    },
    force: () => {
      return Forces;
    },
    drift: () => {
      return Drifts;
    },
    generalResult: () => {
      return GeneralResults;
    },
    distributeResult: () => {
      return DistributeResults;
    },
    factor: () => {
      return Factors;
    },
    quantity: () => {
      return Quantities;
    },
  };

  const exportXLSX = async () => {
    try {
      const res = await exportCompareExcel(structureFEs);
      if (res) message.success('导出成功');
    } catch (error) {
      if (error) {
        message.error('导出失败，请检查');
        console.error(error);
      }
    }
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
            <p style={{ marginLeft: '1.5rem' }}>
              <a onClick={() => exportXLSX()}>导出Excel</a>
            </p>
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
