import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as _ from 'lodash';
import theme from '../../theme';
import request from '../../request';

const createStyles = ({
  container,
  weatherText,
  weatherImage,
  temperatureText,
  temperatureLocation
}) => (
  StyleSheet.create({
    container: Object.assign({}, {
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent'
    }, container),
    conditions: {
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    weather: {
      display: 'flex',
      height: '100%',
      width: '15vw',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    weather__image: Object.assign({}, {
      height: '15vw',
      width: '15vw',
      marginBottom: 5
    }, weatherImage),
    weather__text: Object.assign({}, {
      color: theme.colors.white.toString(),
      fontSize: '1.5vw',
      fontWeight: 300
    }, weatherText),
    temperature: {
      display: 'flex',
      height: '100%',
      width: 'calc(100% - 15vw)',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    temperature__text: Object.assign({}, {
      fontSize: '5.5vw',
      fontWeight: 300
    }, temperatureText),
    temperature__location: Object.assign({}, {
      fontSize: '2vw',
      fontWeight: 300
    }, temperatureLocation)
  })
);

class Weather extends React.Component {

  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    type: PropTypes.string,
    style: PropTypes.shape({
      container: PropTypes.object,
      conditions: PropTypes.object
    })
  }

  static defaultProps = {
    apiKey: 'd52bf3e8ea19d8bb',
    locale: 'en',
    city: '',
    state: '',
    type: 'f',
    style: {}
  }

  constructor(props) {
    super(props);
    moment.locale(props.locale);
    this.timer = undefined;
    // Every 30 minutes update weather
    this.interval = 60000 * 30;
    this.state = {
      data: undefined,
      error: undefined
    };
    this.updateWeather = this.updateWeather.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.weatherRequestUrl = this.weatherRequestUrl.bind(this);
    this.temperatureDisplay = this.temperatureDisplay.bind(this);
    this.temperatureLocation = this.temperatureLocation.bind(this);
    this.imageDisplay = this.imageDisplay.bind(this);
    this.weatherDisplay = this.weatherDisplay.bind(this);
  }

  componentDidMount() {
    // Update weather once a minute
    this.timer = setInterval(this.updateWeather, this.interval);
    // Load inital weather call
    this.updateWeather();
  }

  componentWillReceiveProps({ locale }) {
    if (this.props.locale !== locale) {
      moment.locale(locale);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleResponse({ current_observation }) {
    this.setState({
      data: current_observation,
      error: undefined
    });
  }

  handleFailure(error) {
    this.setState({
      data: undefined,
      error
    });
  }

  weatherRequestUrl() {
    const { apiKey, city, state } = this.props;
    return (
      `http://api.wunderground.com/api/${apiKey}/conditions/q/${state}/${city}.json`
    );
  }

  updateWeather() {
    request(this.weatherRequestUrl())
      .then(this.handleResponse)
      .catch(this.handleFailure);
  }

  imageDisplay() {
    return (
      require(`./img/${_.get(this.state.data, 'icon', 'unknown')}.svg`)
    );
  }

  weatherDisplay() {
    return _.get(this.state.data, 'weather', 'Currently Unavailable');
  }

  temperatureDisplay() {
    const isFarenheit = this.props.type === 'f';
    const dataType = isFarenheit ? 'temp_f' : 'temp_c';
    const temp = _.get(this.state.data, dataType);
    const type = isFarenheit ? 'F' : 'C';
    return (
      temp ?
      `${temp} ${type}`
       :
       'N/A'
    );
  }

  temperatureLocation() {
    return _.get(this.state.data, ['display_location', 'full'], 'Unknown Location');
  }

  render() {
    const {
      container,
      conditions,
      temperature,
      temperature__text,
      temperature__location,
      weather,
      weather__image,
      weather__text
    } = createStyles(this.props.style);
    return (
      <div className={css(container)}>
        <div className={css(conditions)}>
          <div className={css(weather)}>
            <img
              className={css(weather__image)}
              role="presentation"
              src={this.imageDisplay()}
            />
            <span className={css(weather__text)}>
              {this.weatherDisplay()}
            </span>
          </div>
          <div className={css(temperature)}>
            <div className={css(temperature__location)}>
              {this.temperatureLocation()}
            </div>
            <div className={css(temperature__text)}>
              {this.temperatureDisplay()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
