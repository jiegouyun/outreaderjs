import React from 'react';
import { IStyles } from '../../interfaces';

const styles: IStyles = {
  container: {
    background: '#fff',
    padding: '2rem',
  },
};
export function AboutPage() {
  return <div style={styles.container}>作者信息</div>;
}
