import React from 'react';
import { flash, fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import theme from '../../common/theme';

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
    width: 200,
    height: 200
  },
  splash__text: {
    marginTop: 20,
    color: theme.colors.gray.string(),
    fontSize: '2em',
    textTransform: 'uppercase',
    fontWeight: 300
  }
});

class SplashScreen extends React.Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
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
    const { splash, splash__content, splash__image } = styles;
    return (
      <div className={css(splash)}>
        <div className={css(splash__content)}>
          <img
            role="presentation"
            className={css(splash__image)}
            src={this.props.image}
          />
          <p className={css(styles.splash__text)}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
