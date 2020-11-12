import { Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IWpj } from '@outreader/core';
import { IEleData } from '../../../interfaces';

export function PropertiesComponent(wpj: IWpj) {
  const col = wpj.column;
  const n = col.colName.length;
  const count = col.storeyID.length;

  const colInfoColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];
  const colConnectColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];
  const colSecColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    colInfoColumns.push({
      name: `C-${col.colName[i]}`,
      align: 'center',
      children: [
        {
          name: '编号',
          code: `colID${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: '属性',
          code: `colProp${i}`,
          width: 80,
          align: 'right',
        },
      ],
    });
    colConnectColumns.push({
      name: `C-${col.colName[i]}`,
      align: 'center',
      children: [
        {
          name: 'i',
          code: `startNode${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: 'j',
          code: `endNode${i}`,
          width: 80,
          align: 'right',
        },
      ],
    });
    colSecColumns.push({
      name: `C-${col.colName[i]}`,
      children: [
        {
          name: '类型',
          code: `secType${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: '尺寸',
          code: `section${i}`,
          width: 80,
          align: 'right',
        },
        {
          name: '转角',
          code: `ang${i}`,
          width: 80,
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
          <BaseTable
            columns={colInfoColumns}
            dataSource={colInfoTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <Collapse ghost>
        <Panel header="连接" key="2">
          <BaseTable
            columns={colConnectColumns}
            dataSource={colConnectTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <Collapse ghost>
        <Panel header="截面" key="3">
          <BaseTable
            columns={colSecColumns}
            dataSource={colSecTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Properties;
}
