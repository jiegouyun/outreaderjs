import { Descriptions, message, Row, Breadcrumb } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { initDb } from '../../database';
import { IStyles } from '../../interfaces';

const styles: IStyles = {
  container: {
    background: '#fff',
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
    <div style={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a onClick={() => history.replace('/structures')}>我的结构</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{hash.slice(0, 7)}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Descriptions title="模型概况" bordered>
          <Descriptions.Item label="计算软件">
            {structure.wmass?.basicInformation.software}(
            {structure.wmass?.basicInformation.softwareVersion})
          </Descriptions.Item>
          <Descriptions.Item label="计算日期">
            {structure.wmass?.basicInformation.calDate}
          </Descriptions.Item>
          <Descriptions.Item label="设计人">
            {structure.wmass?.basicInformation.designer}
          </Descriptions.Item>
        </Descriptions>
      </Row>
    </div>
  );
}
