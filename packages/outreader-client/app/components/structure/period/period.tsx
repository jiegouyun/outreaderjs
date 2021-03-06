import { Collapse, Row, Menu, Dropdown } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { downloadImg } from '@outreader/core';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip,
  Legend,
  Label,
  LegendPayload,
} from 'recharts';
import { IPeriodFE } from '@outreader/core';

export function PeriodComponent(period: IPeriodFE) {
  const modeColumns: ArtColumn[] = [
    {
      name: '振型',
      code: 'modeID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '周期',
      code: 'period',
      align: 'right',
    },
    {
      name: '转角',
      code: 'angle',
      align: 'right',
    },
    {
      name: '平动系数X',
      code: 'factorX',
      align: 'right',
    },
    {
      name: '平动系数Y',
      code: 'factorY',
      align: 'right',
    },
    {
      name: '扭转系数Z',
      code: 'factorZ',
      align: 'right',
    },
  ];
  const periodModeTableData = [];
  for (let i = 0; i < period.modeCoupling.modeID.length; i++) {
    periodModeTableData.push({
      key: i,
      modeID: period.modeCoupling.modeID[i],
      period: period.modeCoupling.period[i].toFixed(3),
      angle: period.modeCoupling.angle[i].toFixed(0),
      factorX: period.modeCoupling.factorX[i].toFixed(2),
      factorY: period.modeCoupling.factorY[i].toFixed(2),
      factorZ: period.modeCoupling.factorZ[i].toFixed(2),
    });
  }

  const periodSeismicTableData = [];
  for (let i = 0; i < period.modeSeismic.modeID.length; i++) {
    periodSeismicTableData.push({
      key: i,
      modeID: period.modeSeismic.modeID[i],
      period: period.modeSeismic.period[i].toFixed(3),
      angle: period.modeSeismic.angle[i].toFixed(0),
      factorX: period.modeSeismic.factorX[i].toFixed(2),
      factorY: period.modeSeismic.factorY[i].toFixed(2),
      factorZ: period.modeSeismic.factorZ[i].toFixed(2),
    });
  }

  const periodMassColumns: ArtColumn[] = [
    {
      name: '振型',
      code: 'modeID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X',
      code: 'factorX',
      align: 'right',
    },
    {
      name: '累计X',
      code: 'sumX',
      align: 'right',
    },
    {
      name: 'Y',
      code: 'factorY',
      align: 'right',
    },
    {
      name: '累计Y',
      code: 'sumY',
      align: 'right',
    },
    {
      name: 'Z',
      code: 'factorZ',
      align: 'right',
    },
    {
      name: '累计Z',
      code: 'sumZ',
      align: 'right',
    },
  ];

  const periodMassTableData = [];
  const modeMassX = [];
  const modeMassY = [];
  const modeMassZ = [];
  let sumX: number = 0;
  let sumY: number = 0;
  let sumZ: number = 0;
  if (!period.modeMass.factorZ.length) {
    period.modeMass.factorZ = new Array(period.modeMass.modeID.length).fill(0);
  }
  for (let i = 0; i < period.modeMass.modeID.length; i++) {
    sumX += period.modeMass.factorX[i];
    sumY += period.modeMass.factorY[i];
    sumZ += period.modeMass.factorZ[i];
    periodMassTableData.push({
      key: i,
      modeID: period.modeMass.modeID[i],
      factorX: period.modeMass.factorX[i].toFixed(2),
      sumX: sumX.toFixed(2),
      factorY: period.modeMass.factorY[i].toFixed(2),
      sumY: sumY.toFixed(2),
      factorZ: period.modeMass.factorZ[i].toFixed(2),
      sumZ: sumZ.toFixed(2),
    });
    modeMassX.push({
      x: period.modeMass.modeID[i],
      y: sumX.toFixed(2),
    });
    modeMassY.push({
      x: period.modeMass.modeID[i],
      y: sumY.toFixed(2),
    });
    modeMassZ.push({
      x: period.modeMass.modeID[i],
      y: sumZ.toFixed(2),
    });
  }

  const customLegend: LegendPayload[] = [
    {
      id: 1,
      value: `X: ${period.modeMass.sumX.toFixed(2)}`,
      type: 'cross',
      color: '#8884D8',
    },
    {
      id: 2,
      value: `Y: ${period.modeMass.sumY.toFixed(2)}`,
      type: 'circle',
      color: '#82CA9D',
    },
    {
      id: 3,
      value: `Z: ${period.modeMass.sumZ.toFixed(2)}`,
      type: 'diamond',
      color: '#FFCC99',
    },
  ];

  const pipelineMode = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: periodModeTableData, columns: modeColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineModeSeismic = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: periodSeismicTableData, columns: modeColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelinePeriodMass = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: periodMassTableData, columns: periodMassColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const menu = (
    <Menu
      onClick={({ item, key }) => downloadImg('质量参与系数', key as string)}
    >
      <Menu.Item key="svg">下载 SVG</Menu.Item>
      <Menu.Item key="png">下载 PNG</Menu.Item>
    </Menu>
  );

  const { Panel } = Collapse;
  const Period = (
    <React.Fragment>
      <h3>考虑扭转耦联时的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineMode.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>地震最大作用方向的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineModeSeismic.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <Row justify="space-around">
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <div id="质量参与系数" className="charts">
            <ScatterChart
              width={600}
              height={360}
              margin={{
                top: 10,
                right: 10,
                bottom: 30,
                left: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name=""
                unit=""
                domain={[0, (dataMax) => Math.ceil(dataMax / 5) * 5]}
              >
                <Label value="振型" offset={0} position="bottom" />
              </XAxis>
              <YAxis
                type="number"
                dataKey="y"
                name=""
                unit=""
                domain={[0, 100]}
              >
                <Label
                  value="质量参与系数"
                  angle={-90}
                  offset={10}
                  position="insideLeft"
                />
              </YAxis>
              <ZAxis type="number" range={[25]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend
                align="right"
                verticalAlign="top"
                iconSize={8}
                payload={customLegend}
              />
              <Scatter
                name={'X: ' + period.modeMass.sumX.toFixed(2)}
                data={modeMassX}
                fill="#8884D8"
                line={{ strokeWidth: 2 }}
                shape="cross"
              />
              <Scatter
                name={'Y: ' + period.modeMass.sumY.toFixed(2)}
                data={modeMassY}
                fill="#82CA9D"
                line={{ strokeWidth: 2 }}
                shape="circle"
              />
              <Scatter
                name={'Z: ' + period.modeMass.sumZ.toFixed(2)}
                data={modeMassZ}
                fill="#FFCC99"
                line={{ strokeWidth: 2 }}
                shape="diamond"
              />
            </ScatterChart>
          </div>
        </Dropdown>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelinePeriodMass.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Period;
}
