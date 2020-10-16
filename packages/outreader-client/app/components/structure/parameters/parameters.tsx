import { Descriptions } from 'antd';
import React from 'react';
import { IParametersFE } from '@outreader/core';

export function ParametersComponent(parameters: IParametersFE) {
  const Parameters = (
    <React.Fragment>
      <h3>结构总体信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="结构体系">
          {parameters.general.system}
        </Descriptions.Item>
        <Descriptions.Item label="结构材料">
          {parameters.general.material}
        </Descriptions.Item>
        <Descriptions.Item label="所在地区">
          {parameters.general.location}
        </Descriptions.Item>
        <Descriptions.Item label="地下室层数">
          {parameters.general.basement}
        </Descriptions.Item>
        <Descriptions.Item label="嵌固端层">
          {parameters.general.constraintFloor}
        </Descriptions.Item>
        <Descriptions.Item label="裙房层数">
          {parameters.general.podium}
        </Descriptions.Item>
        <Descriptions.Item label="转换层">
          {parameters.general.transferStorey}
        </Descriptions.Item>
        <Descriptions.Item label="加强层">
          {parameters.general.reinforceStorey}
        </Descriptions.Item>
      </Descriptions>
      <h3>计算控制信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="连梁刚度折减系数(地震)">
          {parameters.calculate.couplingBeamFactorSeismic}
        </Descriptions.Item>
        <Descriptions.Item label="连梁刚度折减系数(风)">
          {parameters.calculate.couplingBeamFactorWind}
        </Descriptions.Item>
        <Descriptions.Item label="刚性楼板假定">
          {parameters.calculate.rigidFloorAssumption}
        </Descriptions.Item>
      </Descriptions>
      <h3>风荷载信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="使用指定风荷载数据">
          {parameters.wind.assigned}
        </Descriptions.Item>
        <Descriptions.Item label="执行规范">
          {parameters.wind.loadCode}
        </Descriptions.Item>
        <Descriptions.Item label="地面粗糙程度">
          {parameters.wind.terrainRoughness}
        </Descriptions.Item>
        <Descriptions.Item label="修正后基本风压(kN/m^2)">
          {parameters.wind.pressureModified}
        </Descriptions.Item>
        <Descriptions.Item label="风荷载计算阻尼比">
          {parameters.wind.dampingRatio}
        </Descriptions.Item>
        <Descriptions.Item label="舒适度验算基本风压(kN/m^2)">
          {parameters.wind.pressureComfort}
        </Descriptions.Item>
        <Descriptions.Item label="舒适度验算阻尼比">
          {parameters.wind.dampingRationComfort}
        </Descriptions.Item>
      </Descriptions>
      <h3>地震信息</h3>
      <Descriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 1 }}
        style={{ marginBottom: 20, textAlign: 'right' }}
      >
        <Descriptions.Item label="按地震动区划图GB18306-2015计算">
          {parameters.seismic.use2015GB18306}
        </Descriptions.Item>
        <Descriptions.Item label="设计地震分组">
          {parameters.seismic.group}
        </Descriptions.Item>
        <Descriptions.Item label="地震烈度">
          {parameters.seismic.intensity}
        </Descriptions.Item>
        <Descriptions.Item label="场地类别">
          {parameters.seismic.siteCategory}
        </Descriptions.Item>
        <Descriptions.Item label="特征周期">
          {parameters.seismic.characteristicPeriod}
        </Descriptions.Item>
        <Descriptions.Item label="阻尼比">
          {parameters.seismic.dampingRatio}
        </Descriptions.Item>
        <Descriptions.Item label="周期折减系数">
          {parameters.seismic.periodReductionFactor}
        </Descriptions.Item>
        <Descriptions.Item label="X向偶然偏心">
          {parameters.seismic.eccentricityX}
        </Descriptions.Item>
        <Descriptions.Item label="Y向偶然偏心">
          {parameters.seismic.eccentricityY}
        </Descriptions.Item>
        <Descriptions.Item label="地震影响系数最大值">
          {parameters.seismic.maxSpectrumValue}
        </Descriptions.Item>
        <Descriptions.Item label="罕遇地震影响系数最大值">
          {parameters.seismic.maxSpectrumValueL3}
        </Descriptions.Item>
        <Descriptions.Item label="最大附加阻尼比">
          {parameters.seismic.additionalDampingRatio}
        </Descriptions.Item>
        <Descriptions.Item label="调整后的水平向减震系数">
          {parameters.seismic.modifiedSeismicReductionFactor}
        </Descriptions.Item>
      </Descriptions>
    </React.Fragment>
  );

  return Parameters;
}
