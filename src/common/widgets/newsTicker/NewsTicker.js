import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';

const createStyles = ({ container }) => (
  StyleSheet.create({
    container: Object.assign({}, {
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent'
    }, container)
  })
);

class NewsTicker extends React.Component {

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

  render() {
    const { container } = createStyles(this.props.style);
    return (
      <div className={css(container)}>
        NewsTicker
      </div>
    );
  }
}

export default NewsTicker;
