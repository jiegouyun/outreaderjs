import { exportExcel } from '@outreader/core';
import { Breadcrumb, Layout, Menu, message, Divider } from 'antd';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  PropertiesComponent,
  AxialCompRatioComponent,
  ReinforcementComponent,
  ShearCapacityComponent,
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

export function ElementPage() {
  const { hash } = useParams();
  const history = useHistory();
  const [activeItemKey, setActvieItemKey] = useState('properties');
  const elementData = initDb(hash);
  const element = elementData.value();
  const wpj = element.wpj;
  // console.log(structure);
  // console.log(structureFE);
  if (!element.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  const Properties = PropertiesComponent(wpj);
  const AxialCompRatio = AxialCompRatioComponent(wpj);
  const Reinforcement = ReinforcementComponent(wpj);
  const ShearCapacity = ShearCapacityComponent(wpj);

  const dataMapping = {
    properties: () => {
      return Properties;
    },
    axialCompRatio: () => {
      return AxialCompRatio;
    },
    reinforcement: () => {
      return Reinforcement;
    },
    shearCapacity: () => {
      return ShearCapacity;
    },
  };

  const exportXLSX = async () => {
    // try {
    //   const res = await exportExcel(structureFE);
    //   if (res) message.success('导出成功');
    // } catch (error) {
    //   if (error) {
    //     message.error('导出失败，请检查');
    //     console.error(error);
    //   }
    // }
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
            onSelect={({ _, key }) => {
              setActvieItemKey(key as string);
            }}
          >
            <Menu.Item key="properties">构件信息</Menu.Item>
            <Menu.Item key="axialCompRatio">轴压比</Menu.Item>
            <Menu.Item key="reinforcement">配筋率</Menu.Item>
            <Menu.Item key="shearCapacity">抗剪承载力</Menu.Item>
            <Divider />
            <p
              style={{
                marginLeft: '1.5rem',
                marginTop: '2rem',
                marginBottom: '2.5rem',
              }}
            >
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
                <a onClick={() => history.replace('/elements')}>构件数据</a>
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
