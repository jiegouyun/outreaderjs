import { Layout, Menu } from 'antd';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './constants/routes.json';
import {
  HomePage,
  StructureListPage,
  StructurePage,
  AboutPage,
  StructureComparePage,
} from './containers';
import { IStyles } from './interfaces';

const styles: IStyles = {
  header: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
  },
};

export default function Routes() {
  const handleMenuChange = (item: any) => {
    location.hash = item.key;
  };

  return (
    <Router>
      <Layout>
        <Layout.Header style={styles.header}>
          <Menu
            onClick={handleMenuChange}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[routes.HOME]}
          >
            <Menu.Item key={routes.HOME}>首页</Menu.Item>
            <Menu.Item key={routes.STRUCTURES}>我的结构</Menu.Item>
            <Menu.Item key={routes.ABOUT}>关于</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout>
          <Layout.Content style={{ marginTop: '4rem' }}>
            <Route path={routes.HOME} exact>
              <HomePage />
            </Route>
            <Route path={routes.ABOUT} exact>
              <AboutPage />
            </Route>
            <Switch>
              <Route path={routes.STRUCTURES} exact>
                <StructureListPage />
              </Route>
              <Route path={routes.STRUCTURE} exact>
                <StructurePage />
              </Route>
              <Route path={routes.COMPARE} exact>
                <StructureComparePage />
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}
