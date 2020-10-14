import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../../interfaces';

export function PropertiesComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colInfoColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];
  const colConnectColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];
  const colSecColumns: ColumnsType<IEleData> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    colInfoColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: '编号',
          dataIndex: `colID${i}`,
          width: `${((100 / 2 / n) * 1) / 2}%`,
          align: 'right',
        },
        {
          title: '属性',
          dataIndex: `colProp${i}`,
          width: `${((100 / 2 / n) * 3) / 2}%`,
          align: 'right',
        },
      ],
    });
    colConnectColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: 'i',
          dataIndex: `startNode${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
        {
          title: 'j',
          dataIndex: `endNode${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
      ],
    });
    colSecColumns.push({
      title: `C-${col.colName[i]}`,
      children: [
        {
          title: '类型',
          dataIndex: `secType${i}`,
          width: `${((100 / 3 / n) * 3) / 4}%`,
          align: 'right',
        },
        {
          title: '尺寸',
          dataIndex: `section${i}`,
          width: `${((100 / 3 / n) * 6) / 4}%`,
          align: 'right',
        },
        {
          title: '转角',
          dataIndex: `ang${i}`,
          width: `${((100 / 3 / n) * 3) / 4}%`,
          align: 'right',
        },
      ],
    });
  }

  const colInfoTableData: IEleData[] = [];
  const colConnectTableData: IEleData[] = [];
  const colSecTableData: IEleData[] = [];
  for (let j = 0; j < count; j++) {
    colInfoTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
    colConnectTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
    colSecTableData.push({
      key: j,
      storeyID: col.storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      colInfoTableData[j][`colID${i}`] = col.colID[i][j];
      colInfoTableData[j][`colProp${i}`] = (col.colProps[i][j] || []).join(
        '，'
      );

      colConnectTableData[j][`startNode${i}`] = col.startNode[i][j];
      colConnectTableData[j][`endNode${i}`] = col.endNode[i][j];

      colSecTableData[j][`secType${i}`] = col.secType[i][j];
      colSecTableData[j][`section${i}`] = (col.section[i][j] || []).join('x');
      colSecTableData[j][`ang${i}`] = col.ang[i][j];
    }
  }

  const { Panel } = Collapse;
  const Properties = (
    <React.Fragment>
      <h3>柱</h3>
      <Collapse ghost>
        <Panel header="属性" key="1">
          <Table
            columns={colInfoColumns}
            dataSource={colInfoTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '800rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
      <Collapse ghost>
        <Panel header="连接" key="2">
          <Table
            columns={colConnectColumns}
            dataSource={colConnectTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '800rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
      <Collapse ghost>
        <Panel header="截面" key="3">
          <Table
            columns={colSecColumns}
            dataSource={colSecTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '800rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Properties;
}
