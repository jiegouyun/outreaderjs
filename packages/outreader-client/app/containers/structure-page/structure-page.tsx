import { Breadcrumb, Descriptions, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
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
  const [activeItemKey, setActvieItemKey] = useState('summary');
  const structureData = initDb(hash);
  const structure = structureData.value();
  console.log(structure);
  if (!structure.hash) {
    message.error('找不到模型');
    history.replace('/');
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
          {structure.dir}
        </Descriptions.Item>
        <Descriptions.Item label="工程名称">
          {structure.wmass.basicInformation.engineering}
        </Descriptions.Item>
        <Descriptions.Item label="计算日期">
          {structure.wmass.basicInformation.calDate}
        </Descriptions.Item>
        <Descriptions.Item label="软件名称">
          {structure.wmass.basicInformation.software}
        </Descriptions.Item>
        <Descriptions.Item label="软件版本">
          {structure.wmass.basicInformation.softwareVersion}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="工程信息"
        bordered
        size="small"
        column={{ xs: 1, sm: 2 }}
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="结构体系">
          {structure.wmass.generalInformation.structuralSystem}
        </Descriptions.Item>
        <Descriptions.Item label="结构材料">
          {structure.wmass.generalInformation.structuralMaterial}
        </Descriptions.Item>
        <Descriptions.Item label="楼层数">
          {structure.wmass.storey.storeyID[0]}
        </Descriptions.Item>
        <Descriptions.Item label="结构高度">
          {structure.wmass.storey.storeyID[0]}
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
