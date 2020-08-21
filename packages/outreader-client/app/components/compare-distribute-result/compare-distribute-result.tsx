import { Descriptions, Table, Row, Col, Collapse } from 'antd';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from '../storey-chart';
import { ICompare, IData, IDescribe } from '../../interfaces';
import { userColors, userShaps } from '../../colors';
import { isDate } from 'util';

export function CompareDistributeResultComponent(
  distributeResults: IDistributeResultFE[]
) {
  const n = distributeResults.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (
      (distributeResults[i].storey || distributeResults[i].columnShear).storeyID
        .length > storeyID.length
    ) {
      storeyID = (
        distributeResults[i].storey || distributeResults[i].columnShear
      ).storeyID;
    }
  }
  const count = storeyID.length;

  const storeyColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    storeyColumns.push(
      {
        title: `模型${i + 1}-层高`,
        dataIndex: `height${i}`,
      },
      {
        title: `模型${i + 1}-累高`,
        dataIndex: `heightTD${i}`,
      },
      {
        title: `模型${i + 1}-面积`,
        dataIndex: `area${i}`,
      }
    );
  }

  const storeyTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    storeyTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].storey.storeyID.length;
      const diff = count - len;

      storeyTableData[j][`height${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.height[j - diff].toFixed(2)
          : '';
      storeyTableData[j][`heightTD${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.heightToGround[j - diff].toFixed(2)
          : '';
      storeyTableData[j][`area${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.area[j - diff].toFixed(0)
          : '';
    }
  }

  const massRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    massRatioColumns.push(
      {
        title: `模型${i + 1}-质量比`,
        dataIndex: `ratio${i}`,
      },
      {
        title: `模型${i + 1}-单位质量比`,
        dataIndex: `unitRatio${i}`,
      }
    );
  }

  const massRatioTableData: ICompare[] = [];
  const massRatioChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    massRatioChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    massRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].massRatio.storeyID.length;
      const diff = count - len;

      massRatioTableData[j][`ratio${i}`] =
        distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].massRatio.ratio[j - diff].toFixed(2)
          : '';
      massRatioTableData[j][`unitRatio${i}`] =
        distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].massRatio.massPerAreaRatio[j - diff].toFixed(2)
          : '';

      massRatioChartData[2 * i].push({
        x:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.ratio[j - diff]
            : distributeResults[i].massRatio.ratio[0],
        y:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.storeyID[j - diff]
            : distributeResults[i].massRatio.storeyID[0],
      });
      massRatioChartData[2 * i + 1].push({
        x:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.massPerAreaRatio[j - diff]
            : distributeResults[i].massRatio.massPerAreaRatio[0],
        y:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.storeyID[j - diff]
            : distributeResults[i].massRatio.storeyID[0],
      });
    }
  }

  const stiffRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    stiffRatioColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `ratx1${i}`,
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `raty1${i}`,
      },
      {
        title: `模型${i + 1}-X(层高修正)`,
        dataIndex: `ratx2${i}`,
      },
      {
        title: `模型${i + 1}-Y(层高修正)`,
        dataIndex: `raty2${i}`,
      }
    );
  }

  const stiffRatioTableData: ICompare[] = [];
  const stiffRatioChartData: IData[][] = [];
  const stiffRatioModifyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    stiffRatioChartData.push([], []);
    stiffRatioModifyChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    stiffRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].stiffness.storeyID.length;
      const diff = count - len;

      stiffRatioTableData[j][`ratx1${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.ratx1[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`raty1${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.raty1[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`ratx2${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.ratx2[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`raty2${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.raty2[j - diff].toFixed(3)
          : '';
      stiffRatioChartData[2 * i].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.ratx1[j - diff]
            : distributeResults[i].stiffness.ratx1[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioChartData[2 * i + 1].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.raty1[j - diff]
            : distributeResults[i].stiffness.raty1[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioModifyChartData[2 * i].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.ratx2[j - diff]
            : distributeResults[i].stiffness.ratx2[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioModifyChartData[2 * i + 1].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.raty2[j - diff]
            : distributeResults[i].stiffness.raty2[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
    }
  }

  const shearWeightColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearWeightColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `ratioX${i}`,
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `ratioY${i}`,
      }
    );
  }

  const shearWeightTableData: ICompare[] = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearWeightChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearWeightTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].shearWeightRatio.storeyID.length;
      const diff = count - len;

      shearWeightTableData[j][`ratioX${i}`] =
        distributeResults[i].shearWeightRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].shearWeightRatio.factorX[j - diff].toFixed(3)
          : '';
      shearWeightTableData[j][`ratioY${i}`] =
        distributeResults[i].shearWeightRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].shearWeightRatio.factorY[j - diff].toFixed(3)
          : '';

      shearWeightChartData[2 * i].push({
        x:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.factorX[j - diff]
            : distributeResults[i].shearWeightRatio.factorX[0],
        y:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.storeyID[j - diff]
            : distributeResults[i].shearWeightRatio.storeyID[0],
      });
      shearWeightChartData[2 * i + 1].push({
        x:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.factorY[j - diff]
            : distributeResults[i].shearWeightRatio.factorY[0],
        y:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.storeyID[j - diff]
            : distributeResults[i].shearWeightRatio.storeyID[0],
      });
    }
  }

  const shearCapacityColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearCapacityColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `ratioX${i}`,
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `ratioY${i}`,
      }
    );
  }

  const shearCapacityTableData: ICompare[] = [];
  const shearCapacityChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearCapacityChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearCapacityTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].shearCapacityCheck.storeyID.length;
      const diff = count - len;

      shearCapacityTableData[j][`ratioX${i}`] =
        distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
        storeyID[j]
          ? distributeResults[i].shearCapacityCheck.ratioX[j - diff].toFixed(2)
          : '';
      shearCapacityTableData[j][`ratioY${i}`] =
        distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
        storeyID[j]
          ? distributeResults[i].shearCapacityCheck.ratioY[j - diff].toFixed(2)
          : '';

      shearCapacityChartData[2 * i].push({
        x:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.ratioX[j - diff]
            : distributeResults[i].shearCapacityCheck.ratioX[0],
        y:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.storeyID[j - diff]
            : distributeResults[i].shearCapacityCheck.storeyID[0],
      });
      shearCapacityChartData[2 * i + 1].push({
        x:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.ratioY[j - diff]
            : distributeResults[i].shearCapacityCheck.ratioY[0],
        y:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.storeyID[j - diff]
            : distributeResults[i].shearCapacityCheck.storeyID[0],
      });
    }
  }

  const momentDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    momentDistributeColumns.push(
      {
        title: `模型${i + 1}-X向柱`,
        dataIndex: `columnX${i}`,
      },
      {
        title: `模型${i + 1}-X向短肢墙`,
        dataIndex: `wallX${i}`,
      },
      {
        title: `模型${i + 1}-Y向柱`,
        dataIndex: `columnY${i}`,
      },
      {
        title: `模型${i + 1}-Y向短肢墙`,
        dataIndex: `wallY${i}`,
      }
    );
  }

  const momentDistributeTableData: ICompare[] = [];
  const momentColumnChartData: IData[][] = [];
  const momentWallChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    momentColumnChartData.push([], []);
    momentWallChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    momentDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].momentPercent.storeyID.length;
      const diff = count - len;

      momentDistributeTableData[j][`columnX${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentColumnX[j - diff].toFixed(
              1
            )
          : '';
      momentDistributeTableData[j][`wallX${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentWallX[j - diff].toFixed(1)
          : '';
      momentDistributeTableData[j][`columnY${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentColumnY[j - diff].toFixed(
              1
            )
          : '';
      momentDistributeTableData[j][`wallY${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentWallY[j - diff].toFixed(1)
          : '';
      momentColumnChartData[2 * i].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentColumnX[j - diff]
            : distributeResults[i].momentPercent.percentColumnX[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentColumnChartData[2 * i + 1].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentColumnY[j - diff]
            : distributeResults[i].momentPercent.percentColumnY[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentWallChartData[2 * i].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentWallX[j - diff]
            : distributeResults[i].momentPercent.percentWallX[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentWallChartData[2 * i + 1].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentWallY[j - diff]
            : distributeResults[i].momentPercent.percentWallY[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
    }
  }

  const shearDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    shearDistributeColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `ratioX${i}`,
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `ratioY${i}`,
      }
    );
  }

  const shearDistributeTableData: ICompare[] = [];
  const shearColumnChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearColumnChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    for (let i = 0; i < n; i++) {
      const len = distributeResults[i].columnShear.storeyID.length;
      const diff = count - len;

      shearDistributeTableData[j][`ratioX${i}`] =
        distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].columnShear.percentColumnX[j - diff].toFixed(1)
          : '';
      shearDistributeTableData[j][`ratioY${i}`] =
        distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].columnShear.percentColumnY[j - diff].toFixed(1)
          : '';

      shearColumnChartData[2 * i].push({
        x:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.percentColumnX[j - diff]
            : distributeResults[i].columnShear.percentColumnX[0],
        y:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.storeyID[j - diff]
            : distributeResults[i].columnShear.storeyID[0],
      });
      shearColumnChartData[2 * i + 1].push({
        x:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.percentColumnY[j - diff]
            : distributeResults[i].columnShear.percentColumnY[0],
        y:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.storeyID[j - diff]
            : distributeResults[i].columnShear.storeyID[0],
      });
    }
  }

  const describesMassRatio: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesMassRatio.push(
      {
        name: `模型${i + 1}-质量比`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: `模型${i + 1}-单位质量比`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
    describes.push(
      {
        name: `模型${i + 1}-X`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: `模型${i + 1}-Y`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
  }

  const { Panel } = Collapse;
  const DistributeResult = (
    <div>
      <h3>楼层属性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={storeyColumns}
            dataSource={storeyTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>质量比</h3>
      <StoreyChart
        labels={{
          xLabel: '质量比',
        }}
        describe={describesMassRatio}
        datas={massRatioChartData}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={massRatioColumns}
            dataSource={massRatioTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>刚度比</h3>
      <Row>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '刚度比',
            }}
            describe={describes}
            datas={stiffRatioChartData}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '层高修正刚度比',
            }}
            describe={describes}
            datas={stiffRatioModifyChartData}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={stiffRatioColumns}
            dataSource={stiffRatioTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>剪重比</h3>
      <StoreyChart
        labels={{
          xLabel: '剪重比',
        }}
        describe={describes}
        datas={shearWeightChartData}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearWeightColumns}
            dataSource={shearWeightTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>抗剪承载力比</h3>
      <StoreyChart
        labels={{
          xLabel: '抗剪承载力比',
        }}
        describe={describes}
        datas={shearCapacityChartData}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearCapacityColumns}
            dataSource={shearCapacityTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>规定水平力下倾覆力矩分配</h3>
      <Row>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '规定水平力下倾覆力矩分配',
            }}
            describe={describes}
            datas={momentColumnChartData}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '短肢墙倾覆力矩占比(%)',
            }}
            describe={describes}
            datas={momentWallChartData}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={momentDistributeColumns}
            dataSource={momentDistributeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>柱剪力与分段基底剪力百分比</h3>
      <StoreyChart
        labels={{
          xLabel: '柱剪力与分段基底剪力百分比(%)',
        }}
        describe={describes}
        datas={shearColumnChartData}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearDistributeColumns}
            dataSource={shearDistributeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return DistributeResult;
}
