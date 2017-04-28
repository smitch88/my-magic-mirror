import React from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite/no-important';
import theme from '../theme';

let ReactGridLayout = require('react-grid-layout');
const WidthProvider = require('react-grid-layout').WidthProvider;

ReactGridLayout = WidthProvider(ReactGridLayout);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  widget: {
    animation: 'fadeIn 2s',
    animationName: fadeIn
  }
});

class Widgets extends React.Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.widget)}>
          { JSON.stringify(this.props.configuration) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ core: { configuration } }) => ({
  configuration
});

export default connect(mapStateToProps)(Widgets);
