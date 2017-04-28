import React from 'react';
import { flash, fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite/no-important';
import theme from '../theme';

const styles = StyleSheet.create({
  splash: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.black.string(),
    animation: 'fadeIn 1.5s',
    animationName: fadeIn
  },
  splash__content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'flash 4s infinite',
    animationDelay: '1.5s',
    animationName: flash
  },
  splash__image: {
    width: 100,
    height: 100
  },
  splash__text: {
    marginTop: 20,
    color: theme.colors.gray.string(),
    fontSize: '1.2em',
    textTransform: 'uppercase'
  }
});

class SplashScreen extends React.Component {

  static propTypes = {
    image: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'My Magic Mirror'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ text: this.props.text });
    }, 2500);
  }

  render() {
    return (
      <div className={css(styles.splash)}>
        <div className={css(styles.splash__content)}>
          <img className={css(styles.splash__image)} src={this.props.image} />
          <p className={css(styles.splash__text)}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
