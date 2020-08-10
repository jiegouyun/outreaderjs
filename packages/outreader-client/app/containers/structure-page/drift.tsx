import { Descriptions, Table } from 'antd';
import React from 'react';
import { IDriftFE } from '@outreader/core';

export function DriftComponent(drift: IDriftFE) {
  const driftDispColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '风荷载X',
      dataIndex: 'windX',
    },
    {
      title: '风荷载Y',
      dataIndex: 'windY',
    },
    {
      title: '地震X',
      dataIndex: 'seismicX',
    },
    {
      title: '地震Y',
      dataIndex: 'seismicY',
    },
  ];

  const dispTableData = [];
  for (let i = 0; i < drift.driftWindXP.storeyID.length; i++) {
    dispTableData.push({
      storeyID: drift.driftWindXP.storeyID[i],
      towerID: drift.driftWindXP.towerID[i],
      windX: drift.driftWindXP.displacement[i],
      windY: drift.driftWindYP.displacement[i],
      seismicX: drift.driftSeismicX.displacement[i],
      seismicY: drift.driftSeismicY.displacement[i],
    });
  }

  const driftTableData = [];
  for (let i = 0; i < drift.driftWindXP.storeyID.length; i++) {
    driftTableData.push({
      storeyID: drift.driftWindXP.storeyID[i],
      towerID: drift.driftWindXP.towerID[i],
      windX: drift.driftWindXP.drift[i],
      windY: drift.driftWindYP.drift[i],
      seismicX: drift.driftSeismicX.drift[i],
      seismicY: drift.driftSeismicY.drift[i],
    });
  }

  const dispRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '+X偏心',
      dataIndex: 'eccXP',
    },
    {
      title: '-X偏心',
      dataIndex: 'eccXN',
    },
    {
      title: '+Y偏心',
      dataIndex: 'eccYP',
    },
    {
      title: '-Y偏心',
      dataIndex: 'eccYN',
    },
  ];

  const dispRatioTableData = [];
  for (let i = 0; i < drift.ratioSeismicXEccP.storeyID.length; i++) {
    dispRatioTableData.push({
      storeyID: drift.ratioSeismicXEccP.storeyID[i],
      towerID: drift.ratioSeismicXEccP.towerID[i],
      eccXP: drift.ratioSeismicXEccP.ratio[i],
      eccXN: drift.ratioSeismicXEccN.ratio[i],
      eccYP: drift.ratioSeismicYEccP.ratio[i],
      eccYN: drift.ratioSeismicYEccN.ratio[i],
    });
  }

  const dispRatioStoreyTableData = [];
  for (let i = 0; i < drift.ratioSeismicXEccP.storeyID.length; i++) {
    dispRatioStoreyTableData.push({
      storeyID: drift.ratioSeismicXEccP.storeyID[i],
      towerID: drift.ratioSeismicXEccP.towerID[i],
      eccXP: drift.ratioSeismicXEccP.ratioD[i],
      eccXN: drift.ratioSeismicXEccN.ratioD[i],
      eccYP: drift.ratioSeismicYEccP.ratioD[i],
      eccYN: drift.ratioSeismicYEccN.ratioD[i],
    });
  }

  const Drift = (
    <div>
      <Descriptions title="位移(mm)"></Descriptions>
      <Table
        columns={driftDispColumns}
        dataSource={dispTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="层间位移角"></Descriptions>
      <Table
        columns={driftDispColumns}
        dataSource={driftTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="位移比"></Descriptions>
      <Table
        columns={dispRatioColumns}
        dataSource={dispRatioTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="层间位移比"></Descriptions>
      <Table
        columns={dispRatioColumns}
        dataSource={dispRatioStoreyTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Drift;
}
