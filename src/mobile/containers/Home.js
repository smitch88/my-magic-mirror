import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { H2, View } from 'react-native';
import { fromHsv, ColorPicker } from 'react-native-color-picker';
import {
  Button,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Tab,
  Tabs
} from 'native-base';
import * as _ from 'lodash';
import { writeConfiguration } from '../../common/actions/core';
import widgetConfigurations from '../../common/widgets/configuration';

class Home extends Component {

  static propTypes = {
    configuration: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.handleColorChange = this.handleColorChange.bind(this);
    this.persistColorChange = _.debounce(this.persistColorChange, 200);
  }

  componentDidUpdate() {
    this.persistColorChange();
  }

  persistColorChange() {
    const { current } = this.state;
    if (current && this.state[current]) {
      this.props.onSetConfig(current, this.state[current]);
    }
  }

  handleColorChange(path, hsv) {
    const color = fromHsv(hsv);
    this.setState({
      current: path,
      [path]: color
    });
  }

  render() {
    const { configuration } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Configure</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1, backgroundColor: '#222' }}>
          <Tabs>
            {
              _.map(configuration.layout, (value, key) => {
                const { type, meta } = value;
                const customization = widgetConfigurations[type];
                console.log('customization fields', customization);
                const a = ['layout', key, 'meta', 'style', 'container', 'backgroundColor'];
                const path = a.join('/');
                const color = _.get(this.state, path, _.get(configuration, a));
                return (
                  <Tab
                    key={key}
                    heading={customization.label || _.capitalize(type)}
                  >
                    <Content>
                      <H2>{`Background Color: ${color}`}</H2>
                      <View style={{ height: 400 }}>
                        <ColorPicker
                          color={color}
                          onColorChange={this.handleColorChange.bind(null, path)}
                          style={{ flex: 1 }}
                        />
                      </View>
                    </Content>
                  </Tab>
                );
              })
            }
          </Tabs>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ core }) => ({
  configuration: core.configuration.toJS()
});

const mapDispatchToProps = (dispatch) => ({
  onSetConfig: (path, data) => {
    dispatch(writeConfiguration('smitchell', path, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
