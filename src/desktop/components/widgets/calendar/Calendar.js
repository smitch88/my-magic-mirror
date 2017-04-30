import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import theme from '../../../theme';
import calendarLocale from './locale';

const createStyles = ({ container }) => (
  StyleSheet.create({
    container: Object.assign({}, {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }, container)
  })
);

class Calendar extends React.Component {

  static propTypes = {
    locale: PropTypes.string,
    style: PropTypes.shape({
      container: PropTypes.object
    })
  }

  static defaultProps = {
    locale: 'en',
    style: {}
  }

  constructor(props) {
    super(props);
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    this.state = {
      today
    };
  }

  render() {
    const { container } = createStyles(this.props.style);
    const { today } = this.state;
    return (
      <div className={css(container)}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteCalendar
              width={width - 20}
              height={height}
              selected={today}
              locale={calendarLocale[this.props.locale]}
              displayOptions={{
                showHeader: false
              }}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default Calendar;
