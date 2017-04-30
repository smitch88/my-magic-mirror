import React from 'react';
import PropTypes from 'prop-types';
import { tada, zoomIn, zoomOut } from 'react-animations';
import { StyleSheet, css } from 'aphrodite/no-important';
import theme from '../theme';

const styles = StyleSheet.create({
  welcome: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.black.string()
  },
  welcome__zoom: {
    animation: 'zoomOut 2s',
    animationDelay: '4s',
    animationName: zoomOut
  },
  welcome__content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'zoomIn 1s',
    animationName: zoomIn
  },
  welcome__text: {
    marginTop: 20,
    color: theme.colors.gray.string(),
    fontSize: '1.2em',
    textTransform: 'uppercase',
    animation: 'tada 3s',
    animationDelay: '1s',
    animationName: tada
  }
});

class WelcomeScreen extends React.Component {

  static propTypes = {
    message: PropTypes.string,
    children: PropTypes.element
  };

  constructor(props) {
    super(props);
    this.state = {
      showingWelcome: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showingWelcome: !this.state.showingWelcome });
    }, 5000);
  }

  render() {
    return (
      this.state.showingWelcome ?
        <div className={css(styles.welcome)}>
          <div className={css(styles.welcome__zoom)}>
            <div className={css(styles.welcome__content)}>
              <p className={css(styles.welcome__text)}>{ this.props.message }</p>
            </div>
          </div>
        </div>
        :
        this.props.children
    );
  }
}

export default WelcomeScreen;
