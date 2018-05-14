import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiButton,
  EuiFieldText,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
  EuiFormRow,
} from '@elastic/eui';

const DUPLICATE_TITLE_WARNING = 'A Dashboard with the title already exists. Would you like to save anyway?';

export class DashboardCloneModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newDashboardName: props.title,
      isTitleDuplicateConfirmed: false,
      hasTitleDuplicate: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onTitleDuplicate = () => {
    this.setState({
      isTitleDuplicateConfirmed: true,
      hasTitleDuplicate: true,
    });
  }

  cloneDashboard = async () => {
    this.setState({
      isLoading: true,
    });

    await this.props.onClone(this.state.newDashboardName, this.state.isTitleDuplicateConfirmed, this.onTitleDuplicate);

    if (this._isMounted) {
      this.setState({
        isLoading: false,
      });
    }
  };

  onInputChange = (event) => {
    this.setState({ newDashboardName: event.target.value });
  };

  render() {
    return (
      <EuiOverlayMask>
        <EuiModal
          data-tests-subj="dashboardCloneModal"
          className="dashboardCloneModal"
          onClose={this.props.onClose}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Clone Dashboard
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiText>
              <p>
                Please enter a new name for your dashboard.
              </p>
            </EuiText>

            <EuiSpacer />

            <EuiFormRow
              error={this.state.hasTitleDuplicate ? DUPLICATE_TITLE_WARNING : null}
              isInvalid={this.state.hasTitleDuplicate}
            >
              <EuiFieldText
                autoFocus
                data-test-subj="clonedDashboardTitle"
                value={this.state.newDashboardName}
                onChange={this.onInputChange}
                isInvalid={this.state.hasTitleDuplicate}
              />
            </EuiFormRow>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton
              data-test-subj="cloneCancelButton"
              onClick={this.props.onClose}
            >
              Cancel
            </EuiButton>

            <EuiButton
              fill
              data-test-subj="cloneConfirmButton"
              onClick={this.cloneDashboard}
              isLoading={this.state.isLoading}
            >
              Confirm Clone
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
}

DashboardCloneModal.propTypes = {
  onClone: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string
};
