import React from 'react';

export interface IStyles {
  [className: string]: React.CSSProperties;
}

export interface ICompare {
  [key: string]: string | number;
}
