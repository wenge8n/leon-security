import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import history_back from '../assets/images/history_back.png';
import backImg from '../assets/images/back.png';
import time from '../assets/images/time.png';
import {ifIphoneX} from 'react-native-iphone-x-helper-2';
import {strings} from '../assets/i18n';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

var {width, height} = Dimensions.get('window');

class BookingHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      bookingsGot: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      fetch('https://1eyeonu.com/APIv2/?action=getBookingHistory', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson) {
            this.setState({
              bookings: responseJson,
              bookingsGot: true,
            });
          } else {
            Alert.alert('Ouch...', responseJson.error.text);
          }
        })
        .catch(error => {
          Alert.alert('Ouch...', error.toString());
        });
    });
  }

  back() {
    const {navigation} = this.props;
    ReactNativeHapticFeedback.trigger('impactLight');
    navigation.goBack();
  }

  render() {
    console.disableYellowBox = true;
    const options = {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const styles = StyleSheet.create({
      main: {
        flex: 1,
        width: '100%',
        backgroundColor: '#141618',
      },
      bottonsView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        marginTop: 25,
        height: height,
        paddingBottom: 60,
      },
      header: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        // fontFamily: 'AvenirNextCyr-Bold',
        fontSize: 22,
      },
      bottonBackStyle: {
        marginLeft: 16,
        ...ifIphoneX(
          {
            paddingTop: 70,
          },
          {
            paddingTop: 30,
          },
        ),
        position: 'absolute',
        zIndex: 99,
      },
      line: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width / 2,
        marginTop: 2,
        marginBottom: 2,
      },
      lineHead: {
        color: '#777C80',
        fontSize: 14,
        width: '30%',
      },
      lineBody: {
        paddingLeft: 12,
        color: '#E7E7E8',
        fontSize: 14,
      },
      price: {
        color: '#4B505A',
        fontSize: 20,
        // fontFamily: 'AvenirNextCyr-Bold',
      },
      agentName: {
        color: '#777C80',
        paddingTop: 3,
        fontSize: 12,
      },
      col: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      colCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      oneBooking: {
        marginTop: 20,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        width: width,
      },
      noBookings: {
        fontSize: 20,
        color: '#fff',
        paddingTop: 40,
        textAlign: 'center',
        width: width,
      },
      flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      userImg: {height: 45, width: 45, borderRadius: 50},
      pin: {
        marginRight: 7,
        width: 10,
        height: 10,
        backgroundColor: '#777C80',
        borderRadius: 5,
      },
      pinIcon: {marginRight: 7, width: 10, height: 10},
    });
    return (
      <>
        <ImageBackground style={styles.main}>
          <TouchableOpacity
            style={styles.bottonBackStyle}
            onPress={() => this.back()}>
            <Image source={backImg} />
          </TouchableOpacity>
          <View style={styles.bottonsView}>
            <Text style={styles.header}>{strings('booking.Mes courses')}</Text>
            {this.state.bookingsGot && this.state.bookings.length === 0 && (
              <Text style={styles.noBookings}>
                {strings("booking.Il n'y a pas de réservations")}
              </Text>
            )}
            <ScrollView
              style={{position: 'relative', marginTop: 15, width: width}}>
              {this.state.bookings.map((booking, index) => (
                <ImageBackground
                  source={history_back}
                  style={styles.oneBooking}
                  key={index}>
                  <View style={styles.flex}>
                    <View style={styles.col}>
                      <View style={styles.line}>
                        <View style={styles.pin} />
                        <Text numberOfLines={1} style={styles.lineHead}>
                          {strings('booking.Déposer')}:
                        </Text>
                        <Text numberOfLines={1} style={styles.lineBody}>
                          {booking.pick_up}
                        </Text>
                      </View>
                      <View style={styles.line}>
                        <Image style={styles.pinIcon} source={time} />
                        <Text numberOfLines={1} style={styles.lineHead}>
                          {strings('booking.Durée')}:
                        </Text>
                        <Text numberOfLines={1} style={styles.lineBody}>
                          {booking.duration} {strings('booking.heure')}
                          {booking.duration > 1 && (
                            <Text style={styles.lineBody}>s</Text>
                          )}
                        </Text>
                      </View>
                      <View style={styles.line}>
                        <Image style={styles.pinIcon} source={time} />
                        <Text numberOfLines={1} style={styles.lineHead}>
                          {strings('booking.Date')}:
                        </Text>
                        <Text numberOfLines={1} style={styles.lineBody}>
                          {new Date(
                            booking.start_date.replace(/-/g, '/'),
                          ).toLocaleString(strings('booking.fr-FR'), options)}
                        </Text>
                      </View>
                    </View>
                    <Text numberOfLines={1} style={styles.price}>
                      €{booking.price}
                    </Text>
                  </View>
                </ImageBackground>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
      </>
    );
  }
}

export default BookingHistoryScreen;
