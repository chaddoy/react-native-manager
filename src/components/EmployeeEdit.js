import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import {
  employeeUpdate,
  employeeSave,
  employeeDelete,
} from '../actions';

import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends React.Component {
  state = {
    showModal: false,
  };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress = () => {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      // from EmployeeListItem Actions.employeeEdit(...);
      uid: this.props.employee.uid,
    });
  }

  onTextPress = () => {
    const { phone, shift } = this.props;

    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onFirePress = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept = () => {
    // from EmployeeListItem Actions.employeeEdit(...);
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onFirePress}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return {
    name,
    phone,
    shift,
  };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete,
})(EmployeeEdit);
