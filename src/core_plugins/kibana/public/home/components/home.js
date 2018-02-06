import React from 'react';
import PropTypes from 'prop-types';
import { Synopsis } from './synopsis';
import { AddData } from './add_data';
import { RecentlyAccessed, recentlyAccessedShape } from './recently_accessed';

import {
  EuiButton,
  EuiPage,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiText,
} from '@elastic/eui';

import { FeatureCatalogueCategory } from 'ui/registry/feature_catalogue';

export function Home({ addBasePath, directories, isCloudEnabled, recentlyAccessed }) {

  const renderDirectories = (category) => {
    return directories
      .filter((directory) => {
        return directory.showOnHomePage && directory.category === category;
      })
      .map((directory) => {
        return (
          <EuiFlexItem style={{ minHeight: 64 }} key={directory.id}>
            <Synopsis
              description={directory.description}
              iconUrl={addBasePath(directory.icon)}
              title={directory.title}
              url={addBasePath(directory.path)}
            />
          </EuiFlexItem>
        );
      });
  };

  return (
    <EuiPage className="home">

      <RecentlyAccessed
        recentlyAccessed={recentlyAccessed}
      />

      <EuiSpacer size="l" />

      <AddData
        addBasePath={addBasePath}
        isCloudEnabled={isCloudEnabled}
      />

      <EuiSpacer size="l" />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel paddingSize="l">
            <EuiTitle>
              <h3>
                Visualize and Explore Data
              </h3>
            </EuiTitle>
            <EuiSpacer size="m"/>
            <EuiFlexGrid columns={2}>
              { renderDirectories(FeatureCatalogueCategory.DATA) }
            </EuiFlexGrid>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l">
            <EuiTitle>
              <h3>
                Manage and Administer the Elastic Stack
              </h3>
            </EuiTitle>
            <EuiSpacer size="m"/>
            <EuiFlexGrid columns={2}>
              { renderDirectories(FeatureCatalogueCategory.ADMIN) }
            </EuiFlexGrid>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiText>
            <p>
              Didn’t find what you were looking for?
            </p>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiButton
            href="#/home/feature_directory"
          >
            View full directory of Kibana plugins
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

    </EuiPage>
  );
}

Home.propTypes = {
  addBasePath: PropTypes.func.isRequired,
  directories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    showOnHomePage: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired
  })),
  isCloudEnabled: PropTypes.bool.isRequired,
  recentlyAccessed: PropTypes.arrayOf(recentlyAccessedShape).isRequired,
};
