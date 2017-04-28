import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplashScreen from '../components/SplashScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import { fetchConfiguration, setSplashScreen } from '../actions/core';

const styles = {
  app: {
    height: '100%',
    width: '100%'
  }
};

class App extends Component {

  static propTypes = {
    onLoadConfiguration: React.PropTypes.func.isRequired,
    onApplicationStart: React.PropTypes.func.isRequired,
    onApplicationLoaded: React.PropTypes.func.isRequired,
    showingSplashScreen: React.PropTypes.bool,
    username: React.PropTypes.string,
    children: React.PropTypes.element
  };

  componentDidMount() {
    this.props.onApplicationStart();
    setTimeout(this.props.onLoadConfiguration, 2500);
    setTimeout(this.props.onApplicationLoaded, 8000);
  }

  render() {
    const { children, username, showingSplashScreen } = this.props;
    return (
      <div style={styles.app}>
        {
          showingSplashScreen ?
            <SplashScreen
              image={require('../../img/mirror.svg')}
              text="Connecting To Services"
            />
            :
            <WelcomeScreen message={`Welcome, ${username}!`}>
              { children }
            </WelcomeScreen>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ core }) => ({
  showingSplashScreen: core.showingSplashScreen,
  username: 'Scott Mitchell'
});

const mapDispatchToProps = (dispatch) => ({
  onLoadConfiguration: () => dispatch(fetchConfiguration()),
  onApplicationStart: () => dispatch(setSplashScreen(true)),
  onApplicationLoaded: () => dispatch(setSplashScreen(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
