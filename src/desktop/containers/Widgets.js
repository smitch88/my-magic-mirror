import React from 'react';
import { connect } from 'react-redux';
import { fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as _ from 'lodash';
import ReactGridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import theme from '../../common/theme';
import Widget from '../../common/widgets/Widget';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  widget__item: {
    height: '100%',
    width: '100%',
    backgroundColor: 'inherit',
    animation: 'fadeIn 2s',
    animationName: fadeIn
  },
  item__inner: {
    height: '100%',
    width: '100%',
    padding: 10
  }
});

class Widgets extends React.Component {

  static propTypes = {
    configuration: PropTypes.shape({
      layout: PropTypes.object,
      locale: PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    this.generateLayout = this.generateLayout.bind(this);
  }

  // Adds on identifier based on the items props
  generateLayout() {
    return _.map(this.props.configuration.layout, (value, key) => ({
      i: key,
      ...value
    }));
  }

  render() {
    const layout = this.generateLayout();
    const locale = this.props.configuration.locale || 'en';
    return (
      <AutoSizer>
        {({ height, width }) => {
          if (!height || !width) {
            return <div className={css(styles.container)} />;
          }
          const cols = 12;
          const rowHeight = height / cols;
          return (
            <div id="widget-layout" className={css(styles.container)}>
              <ReactGridLayout
                className="layout"
                layout={layout}
                cols={cols}
                rowHeight={rowHeight}
                verticalCompact={false}
                width={width - 20}
                margin={[0, 0]}
                containerPadding={[0, 0]}
              >
                {
                  layout.map(({ i, type, meta }) => (
                    <div
                      key={i}
                      className={css(styles.widget__item)}
                    >
                      <div className={css(styles.item__inner)}>
                        <Widget
                          type={type}
                          meta={{
                            ...meta,
                            locale
                          }}
                        />
                      </div>
                    </div>
                  ))
                }
              </ReactGridLayout>
            </div>
          );
        }}
      </AutoSizer>
    );
  }
}

const mapStateToProps = ({ core: { configuration } }) => ({
  configuration: configuration.toJS()
});

export default connect(mapStateToProps)(Widgets);
