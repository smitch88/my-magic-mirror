import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import Clock from './clock/Clock';
import Weather from './weather/Weather';

class Calendar extends React.Component {

  render() {
    return (
      <div>
        Calendar
      </div>
    );
  }
}

class NewsTicker extends React.Component {

  render() {
    return (
      <div>
        NewsTicker
      </div>
    );
  }
}

class ErrorWidget extends React.Component {

  render() {
    return (
      <div>
        Error Loading Widget
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
});

class Widget extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    meta: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.widgets = {
      clock: Clock,
      calendar: Calendar,
      newsTicker: NewsTicker,
      weather: Weather
    };
  }

  render() {
    const Component = this.widgets[this.props.type];
    return (
      <div className={css(styles.container)}>
        {
          !Component ? <ErrorWidget /> : <Component {...this.props.meta} />
        }
      </div>
    );
  }
}

export default Widget;
