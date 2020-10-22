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
  convertStructure,
} from '@outreader/core';
import { Breadcrumb, Layout, Menu, message, Button } from 'antd';
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

export function StructureComparePage() {
  const query = new URLSearchParams(useLocation().search);
  const hashes = query.get('hashes')?.split(',');
  // TODO: guard hashed undefined or hashes.length < 2
  // console.log(hashes);

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

  const hashTitle = (
    hashes?.map((elem) => {
      return elem.slice(0, 7);
    }) || []
  ).join(' vs. ');
  const history = useHistory();
  const [activeItemKey, setActvieItemKey] = useState('summary');

  const dataMapping: { [key: string]: JSX.Element } = {
    summary: CompareSummaryComponent(summarys),
    summaryQuantity: CompareSummaryQuantityComponent(summaryQuantities),
    parameters: CompareParametersComponent(parameters),
    period: ComparePeriodComponent(periods),
    force: CompareForceComponent(forces),
    drift: CompareDriftComponent(drifts),
    generalResult: CompareGeneralResultComponent(generalResults),
    distributeResult: CompareDistributeResultComponent(distributeResults),
    factor: CompareFactorComponent(factors),
    quantity: CompareQuantityComponent(quantities),
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
            <Menu.Divider />
          </Menu>
        </Layout.Sider>
        <Layout.Sider style={styles.siderButton}>
          <Button type="primary" block onClick={() => exportXLSX()}>
            导出Excel
          </Button>
        </Layout.Sider>
        <Layout className="site-layout" style={{ marginLeft: '12.5rem' }}>
          <Layout.Content style={styles.content}>
            <Breadcrumb style={{ marginBottom: '1rem' }}>
              <Breadcrumb.Item>
                <a onClick={() => history.replace('/structures')}>模型对比</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{hashTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={styles.container}>{dataMapping[activeItemKey]}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
