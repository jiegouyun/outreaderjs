import { Descriptions, message, Row } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { initDb } from '../../database';

export function StructurePage() {
  const { hash } = useParams();
  const history = useHistory();
  const structureData = initDb(hash);
  if (!structureData.get('hash')) {
    message.error('找不到模型');
    history.replace('/');
  }
  const structure = structureData.value();

  return (
    <div>
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
