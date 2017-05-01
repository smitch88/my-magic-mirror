import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Content
} from 'native-base';
import { connectToServer } from '../../common/actions/core';


class App extends Component {

  static propTypes = {
    onApplicationStart: PropTypes.func.isRequired,
    children: PropTypes.element
  };

  componentDidMount() {
    this.props.onApplicationStart();
  }

  render() {
    return (
      <Container>
        <Content>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onApplicationStart: () => dispatch(connectToServer('smitchell'))
});

export default connect(null, mapDispatchToProps)(App);
