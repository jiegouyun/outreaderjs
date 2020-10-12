import React from 'react';

export interface IStyles {
  [className: string]: React.CSSProperties;
}

export interface ICompare {
  [key: string]: string | number;
}

export interface IData {
  x: number;
  y: number;
}

export interface IDescribe {
  name: string;
  fill: string;
  shape:
    | 'circle'
    | 'cross'
    | 'diamond'
    | 'square'
    | 'star'
    | 'triangle'
    | 'wye';
}

export interface IEleData extends ICompare {}
