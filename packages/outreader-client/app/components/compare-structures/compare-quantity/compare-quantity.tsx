import { Collapse, Row } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { IQuantityFE } from '@outreader/core';
import { CompareQuantityChart } from '../../chart-tools';
import { ICompare } from '../../../interfaces';

export function CompareQuantityComponent(quantities: IQuantityFE[]) {
  const n = quantities.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (quantities[i].storeyID.length > storeyID.length) {
      storeyID = quantities[i].storeyID;
    }
  }
  const count = storeyID.length;

  const quantityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    quantityColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `面积`,
          code: `area${i}`,
          align: 'right',
        },
        {
          name: `用量`,
          code: `quantity${i}`,
          align: 'right',
        },
        {
          name: `含量`,
          code: `unit${i}`,
          align: 'right',
        },
      ],
    });
  }

  const concreteTableData: ICompare[] = [];
  const steelTableData: ICompare[] = [];
  const rebarTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    concreteTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    steelTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    rebarTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = quantities[i].storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      concreteTableData[j][`area${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].area[j - diff])
          : '';
      concreteTableData[j][`quantity${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].concrete.storey[j - diff])
          : '';
      concreteTableData[j][`unit${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].unitConcrete.storey[j - diff] * 100) / 100
          : '';

      steelTableData[j][`area${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].area[j - diff])
          : '';
      steelTableData[j][`quantity${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].steel.storey[j - diff])
          : '';
      steelTableData[j][`unit${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].unitSteel.storey[j - diff] * 100000) / 100
          : '';

      rebarTableData[j][`area${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].area[j - diff])
          : '';
      rebarTableData[j][`quantity${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].rebar.storey[j - diff] / 1000)
          : '';
      rebarTableData[j][`unit${i}`] =
        quantities[i].storeyID[j - diff] === storeyID[j]
          ? Math.round(quantities[i].unitRebar.storey[j - diff] * 100) / 100
          : '';
    }
  }

  const concreteChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  const unitConcreteChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  const steelChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  const unitSteelChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  const rabarChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  const unitRebarChartData: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[] = [];
  for (let i = 0; i < n; i++) {
    concreteChartData.push({
      model: `模型${i + 1}`,
      wall: Math.round(
        quantities[i].concrete.wall.reduce((sum, current) => sum + current, 0)
      ),
      column: Math.round(
        quantities[i].concrete.column.reduce((sum, current) => sum + current, 0)
      ),
      beam: Math.round(
        quantities[i].concrete.beam.reduce((sum, current) => sum + current, 0)
      ),
      floor: Math.round(
        quantities[i].concrete.floor.reduce((sum, current) => sum + current, 0)
      ),
    });
    unitConcreteChartData.push({
      model: `模型${i + 1}`,
      wall:
        Math.round(
          (quantities[i].concrete.wall.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      column:
        Math.round(
          (quantities[i].concrete.column.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      beam:
        Math.round(
          (quantities[i].concrete.beam.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      floor:
        Math.round(
          (quantities[i].concrete.floor.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
    });
    steelChartData.push({
      model: `模型${i + 1}`,
      wall: Math.round(
        quantities[i].steel.wall.reduce((sum, current) => sum + current, 0)
      ),
      column: Math.round(
        quantities[i].steel.column.reduce((sum, current) => sum + current, 0)
      ),
      beam: Math.round(
        quantities[i].steel.beam.reduce((sum, current) => sum + current, 0)
      ),
      floor: Math.round(
        quantities[i].steel.floor.reduce((sum, current) => sum + current, 0)
      ),
    });
    unitSteelChartData.push({
      model: `模型${i + 1}`,
      wall: Math.round(
        (quantities[i].steel.wall.reduce((sum, current) => sum + current, 0) /
          quantities[i].area.reduce((sum, current) => sum + current, 0)) *
          1000
      ),
      column: Math.round(
        (quantities[i].steel.column.reduce((sum, current) => sum + current, 0) /
          quantities[i].area.reduce((sum, current) => sum + current, 0)) *
          1000
      ),
      beam: Math.round(
        (quantities[i].steel.beam.reduce((sum, current) => sum + current, 0) /
          quantities[i].area.reduce((sum, current) => sum + current, 0)) *
          1000
      ),
      floor: Math.round(
        (quantities[i].steel.floor.reduce((sum, current) => sum + current, 0) /
          quantities[i].area.reduce((sum, current) => sum + current, 0)) *
          1000
      ),
    });
    rabarChartData.push({
      model: `模型${i + 1}`,
      wall: Math.round(
        quantities[i].rebar.wall.reduce((sum, current) => sum + current, 0) /
          1000
      ),
      column: Math.round(
        quantities[i].rebar.column.reduce((sum, current) => sum + current, 0) /
          1000
      ),
      beam: Math.round(
        quantities[i].rebar.beam.reduce((sum, current) => sum + current, 0) /
          1000
      ),
      floor: Math.round(
        quantities[i].rebar.floor.reduce((sum, current) => sum + current, 0) /
          1000
      ),
    });
    unitRebarChartData.push({
      model: `模型${i + 1}`,
      wall:
        Math.round(
          (quantities[i].rebar.wall.reduce((sum, current) => sum + current, 0) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      column:
        Math.round(
          (quantities[i].rebar.column.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      beam:
        Math.round(
          (quantities[i].rebar.beam.reduce((sum, current) => sum + current, 0) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
      floor:
        Math.round(
          (quantities[i].rebar.floor.reduce(
            (sum, current) => sum + current,
            0
          ) /
            quantities[i].area.reduce((sum, current) => sum + current, 0)) *
            100
        ) / 100,
    });
  }

  const pipelineConcrete = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: concreteTableData, columns: quantityColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineSteel = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: steelTableData, columns: quantityColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineRebar = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: rebarTableData, columns: quantityColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const { Panel } = Collapse;
  const Quantities = (
    <React.Fragment>
      <h3>砼用量</h3>
      <Row justify="space-around">
        <CompareQuantityChart data={concreteChartData} yLabel="砼用量(m^3)" />
        <CompareQuantityChart
          data={unitConcreteChartData}
          yLabel="砼含量(m^3/m^2)"
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineConcrete.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>型钢用量</h3>
      <Row justify="space-around">
        <CompareQuantityChart data={steelChartData} yLabel="型钢用量(t)" />
        <CompareQuantityChart
          data={unitSteelChartData}
          yLabel="型钢含量(kg/m^2)"
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineSteel.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>钢筋用量</h3>
      <Row justify="space-around">
        <CompareQuantityChart data={rabarChartData} yLabel="钢筋用量(t)" />
        <CompareQuantityChart
          data={unitRebarChartData}
          yLabel="钢筋含量(kg/m^2)"
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineRebar.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Quantities;
}
