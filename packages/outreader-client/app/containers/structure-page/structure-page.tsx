import { Descriptions, message, Row, Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
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
  const structureData = initDb(hash);
  const structure = structureData.value();
  console.log(structure);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
  }

  return (
    <React.Fragment>
      <Layout>
        <Layout.Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={['general']}
            style={{ height: '100%' }}
          >
            <Menu.Item key="general">项目概况</Menu.Item>
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
          <div style={styles.container}>
            <Descriptions
              title="模型概况"
              bordered
              size="small"
              column={{ xs: 1, sm: 2 }}
            >
              <Descriptions.Item label="计算软件">
                {structure.wmass?.basicInformation.software}
              </Descriptions.Item>
              <Descriptions.Item label="软件版本">
                {structure.wmass?.basicInformation.softwareVersion}
              </Descriptions.Item>
              <Descriptions.Item label="计算日期">
                {structure.wmass?.basicInformation.calDate}
              </Descriptions.Item>
              <Descriptions.Item label="设计人">
                {structure.wmass?.basicInformation.designer}
              </Descriptions.Item>
              <Descriptions.Item label="结构材料">
                {structure.wmass?.generalInformation.structuralMaterial}
              </Descriptions.Item>
              <Descriptions.Item label="结构类型">
                {structure.wmass?.generalInformation.structuralSystem}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Layout.Content>
      </Layout>
    </React.Fragment>
  );
}
