import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import moment from 'moment';
import theme from '../../../theme';

const createStyles = ({ container, time, date }) => (
  StyleSheet.create({
    container: Object.assign({}, {
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent'
    }, container),
    timestamp__container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    time: Object.assign({}, {
      fontSize: 96,
      color: theme.colors.white.toString(),
      fontWeight: 400
    }, time),
    date: Object.assign({}, {
      fontSize: 20,
      color: theme.colors.white.toString(),
      fontWeight: 300
    }, date)
  })
);

class Clock extends React.Component {

  static propTypes = {
    timeFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    locale: PropTypes.string,
    style: PropTypes.shape({
      container: PropTypes.object,
      time: PropTypes.object,
      date: PropTypes.object
    })
  }

  static defaultProps = {
    timeFormat: 'h:mm',
    dateFormat: 'dddd, MMMM Do',
    style: {}
  }

  constructor(props) {
    super(props);
    moment.locale(props.locale);
    this.timer = undefined;
    this.state = {
      currentTime: undefined
    };
    this.updateTimeTicker = this.updateTimeTicker.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTimeTicker, 1000);
  }

  componentWillReceiveProps({ locale }) {
    if (this.props.locale !== locale) {
      moment.locale(locale);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeTicker() {
    const currentTime = moment().format(this.props.timeFormat);
    const currentDate = moment().format(this.props.dateFormat);
    this.setState({
      currentTime,
      currentDate
    });
  }

  render() {
    const { container, timestamp__container, time, date } = createStyles(this.props.style);
    const { currentTime, currentDate } = this.state;
    return (
      <div className={css(container)}>
        <div className={css(timestamp__container)}>
          <div className={css(time)}>{ currentTime }</div>
          <div className={css(date)}>{ currentDate }</div>
        </div>
      </div>
    );
  }
}

export default Clock;
