import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiText,
  EuiButton,
} from '@elastic/eui';

export function Footer({ url, label }) {
  if (!url) {
    return;
  }

  return (
    <div>
      <EuiHorizontalRule />

      <EuiFlexGroup justifyContent="spaceBetween" alignItems="flexEnd">

        <EuiFlexItem grow={false}>
          <EuiText>
            <p>
              {`When all steps are complete, you're ready to explore your data.`}
            </p>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem
          grow={false}
        >
          <EuiButton
            fill
            href={url}
          >
            {label}
          </EuiButton>
        </EuiFlexItem>

      </EuiFlexGroup>

    </div>
  );
}

Footer.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
};
