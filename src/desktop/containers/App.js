import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from '../components/SplashScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import { connectToServer } from '../../common/actions/core';

const styles = {
  app: {
    height: '100%',
    width: '100%'
  }
};

class App extends Component {

  static propTypes = {
    onApplicationStart: PropTypes.func.isRequired,
    showingSplashScreen: PropTypes.bool,
    welcomeMessage: PropTypes.string,
    children: PropTypes.element
  };

  componentDidMount() {
    this.props.onApplicationStart();
  }

  render() {
    const { children, showingSplashScreen, welcomeMessage } = this.props;
    return (
      <div style={styles.app}>
        {
          showingSplashScreen ?
            <SplashScreen
              image={require('../../../resources/img/mirror.svg')}
              text="Connecting to services"
            />
            :
            <WelcomeScreen message={welcomeMessage}>
              { children }
            </WelcomeScreen>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ core }) => ({
  showingSplashScreen: core.showingSplashScreen,
  welcomeMessage: core.getIn(['configuration', 'welcomeMessage'])
});

const mapDispatchToProps = (dispatch) => ({
  onApplicationStart: () => dispatch(connectToServer('smitchell'))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
