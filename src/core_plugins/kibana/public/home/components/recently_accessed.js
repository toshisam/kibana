import './recently_accessed.less';
import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiPanel,
  EuiLink,
  EuiText,
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiIcon,
  EuiSpacer,
} from '@elastic/eui';

export const NUM_LONG_LINKS = 5;

export class RecentlyAccessed extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  renderDropdown = () => {
    const dropdownLinks = [];
    for (let i = NUM_LONG_LINKS; i < this.props.recentlyAccessed.length; i++) {
      dropdownLinks.push(
        (
          <li
            style={{ marginBottom: 8 }}
            key={this.props.recentlyAccessed[i].id}
          >
            <EuiLink
              className="recentlyAccessedDropwdownLink"
              href={this.props.recentlyAccessed[i].link}
            >
              {this.props.recentlyAccessed[i].label}
            </EuiLink>
          </li>
        )
      );
    }

    let dropdownLabel = `${dropdownLinks.length} more links`;
    if (dropdownLinks.length === 1) {
      dropdownLabel = `${dropdownLinks.length} more link`;
    }
    const openPopoverComponent = (
      <EuiLink onClick={this.onButtonClick.bind(this)}>
        <EuiTextColor
          className="recentlyAccessedDropdownLabel"
          color="subdued"
        >
          {dropdownLabel}
        </EuiTextColor>
        <EuiIcon
          type="arrowDown"
          color="subdued"
        />
      </EuiLink>
    );

    return (
      <EuiFlexItem
        key="dropdown"
        grow={false}
      >
        <EuiPopover
          id="popover"
          ownFocus
          button={openPopoverComponent}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}
          anchorPosition="downRight"
        >
          <ul>
            {dropdownLinks}
          </ul>
        </EuiPopover>
      </EuiFlexItem>
    );
  }

  renderLongLink = (recentlyAccessedItem, includeSeparator = false) => {
    let separator;
    if (includeSeparator) {
      separator = (
        <EuiFlexItem grow={false} className="recentlyAccessedSeparator">
          <EuiText>
            <EuiIcon
              type="dot"
              color="subdued"
            />
          </EuiText>
        </EuiFlexItem>
      );
    }
    // Want to avoid a bunch of white space around items with short labels (happens when min width is too large).
    // Also want to avoid truncating really short names (happens when there is no min width)
    // Dynamically setting the min width based on label lengh meets both of these goals.
    const EM_RATIO = 0.65; // 'em' ratio that avoids too much horizontal white space and too much truncation
    const minWidth = (recentlyAccessedItem.label.length < 8 ? recentlyAccessedItem.label.length : 8) * EM_RATIO;
    const style = { minWidth: `${minWidth}em` };
    return (
      <React.Fragment key={recentlyAccessedItem.id}>
        {separator}
        <EuiFlexItem
          className="recentlyAccessedItem"
          style={style}
          grow={false}
        >
          <EuiLink
            className="recentlyAccessedLongLink"
            href={recentlyAccessedItem.link}
          >
            {recentlyAccessedItem.label}
          </EuiLink>
        </EuiFlexItem>
      </React.Fragment>
    );
  }

  renderRecentlyAccessed = () => {
    if (this.props.recentlyAccessed.length <= NUM_LONG_LINKS) {
      return this.props.recentlyAccessed.map((item, index) => {
        let includeSeparator = true;
        if (index === 0) {
          includeSeparator = false;
        }
        return this.renderLongLink(item, includeSeparator);
      });
    }

    const links = [];
    for (let i = 0; i < NUM_LONG_LINKS; i++) {
      let includeSeparator = true;
      if (i === 0) {
        includeSeparator = false;
      }
      links.push(this.renderLongLink(
        this.props.recentlyAccessed[i],
        includeSeparator));
    }

    return [
      ...links,
      this.renderDropdown()
    ];
  };

  render() {
    return (
      <EuiPanel paddingSize="l">
        <EuiText>
          <p>
            <EuiTextColor color="subdued">
              Recently accessed
            </EuiTextColor>
          </p>
        </EuiText>

        <EuiSpacer size="s"/>

        <EuiFlexGroup>
          {this.renderRecentlyAccessed()}
        </EuiFlexGroup>

      </EuiPanel>
    );
  }
}

export const recentlyAccessedShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

RecentlyAccessed.propTypes = {
  recentlyAccessed: PropTypes.arrayOf(recentlyAccessedShape).isRequired
};
