import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './constants/routes.json';
import { Home } from './containers';
import { Layout, Menu } from 'antd';
import { IStyles } from './utils';

const styles: IStyles = {
  content: {
    minHeight: 'calc(100vh - 4em)',
  },
};

export default function Routes() {
  return (
    <Router>
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={styles.content}>
          <Switch>
            <Route path={routes.HOME} component={Home} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}
