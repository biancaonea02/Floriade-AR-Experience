import React, { Component } from "react";
import {
  StyleSheet,
  PermissionsAndroid,
  View,
  Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon, Overlay, OverlayComponent } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { locations1 } from "./source/Data1";
import { locations3 } from "./source/Data3";
import { RedZoneNotification, GreenZoneNotification } from "./source/LocalPushController";
import data from '../../modal/ModalData'
import ModalInfo from './../../modal/ModalInfo';
class MapFoot extends Component {

  state = {
    region: {
      latitude: 52.35791760634953,
      longitude: 5.231512084161243,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    error: "",
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    red: false,
    green: false
  }

  requestLocationPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
    } catch (err) {
      console.warn(err)
    }
  }
  componentDidMount() {
    this.requestLocationPermission();
    this.getCurrentLocation();
  }
  componentWillUnmount()
  {
    Geolocation.clearWatch(this.watchID);
  }
  
  // getting the current Location of a user...
  getCurrentLocation = () => {
    Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const { routeCoordinates } = this.state;
        const newCoordinate = { latitude, longitude };
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        };
        // if user enters red zone
        if (newCoordinate.latitude >= 52.35689572616387 &&
          newCoordinate.latitude <= 52.3601825874411 &&
          newCoordinate.longitude >= 5.230881148949374 &&
          newCoordinate.longitude <= 5.233653824154533) {
          if (this.state.red === false) {
            RedZoneNotification();
            this.setState({
              red: true,
              green: false
            });
          }
        }
        // if user enters green zone
        if (newCoordinate.latitude >= 52.35748082170889 &&
          newCoordinate.latitude <= 52.35930618713374 &&
          newCoordinate.longitude >= 5.2318254030630175 &&
          newCoordinate.longitude <= 5.2332707086240805) {
          if (this.state.green === false) {
            GreenZoneNotification();
            this.setState({
              green: true,
              red: false
            })
          }

        }
        this.setState({
          //       initialRegion: region,
          //     region: region,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),

          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        // maximumAge: 1000000,
        distanceFilter: 1
      }
    );
  };

  // animate to current user Location
  goToInitialLocation = () => {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    //  this.mapView.animateToRegion(initialRegion, 2000);
  };

  // lat & lng for Marker
  getMapRegion = () => ({
    latitude: this.state.region.latitude,
    longitude: this.state.region.longitude
  });

  render() {
    return (
      <View style={styles.mainbox}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          //region={this.state.region}
          initialRegion={this.state.region}
          //    followUserLocation={true}
          mapType="hybrid"
          //minZoomLevel={16}
          ref={ref => (this.mapView = ref)}
          showsUserLocation={true}
          //   onMapReady={this.goToInitialLocation}
          //    initialRegion={this.state.initialRegion}
          loadingEnabled={true}
          toolbarEnabled={false}
        >
          <Overlay
            //floriade map overlay
            image={require('./source/map.png')}
            bounds={[
              [52.352100497553614, 5.219157213655828],
              [52.362296180483575, 5.236044401151413]

            ]}
          />
          <Overlay
            // footprint 
            image={require('./source/Footprint3.png')}
            bounds={[
              [52.35689951720534, 5.230901881575736],
              [52.36026084232964, 5.233739658687145]
            ]}
            opacity={0.80}
          />

          { //green zone
            locations1.map(marker => (
              <Polygon
                key={marker.id}
                coordinates={locations1}
                // comment line below to see green zone
                strokeWidth={0}
              />
            ))
          }
          { // red zone
            locations3.map(marker => (
              <Polygon
                key={marker.id}
                coordinates={locations3}
                // comment line below to see red zone
                strokeWidth={0}
              />
            ))
          }

        </MapView>
        <ModalInfo
          title={data[0].title}
          description={data[0].description}
          image={data[0].photo}
          size={data[0].size}
          earths={data[0].earths}
          overshootDay={data[0].overshootDay}
          title1Open={data[0].title1Open}
          title2Open={data[0].title2Open}
          title3Open={data[0].title3Open}
          content1Open={data[0].content1Open}
          content2Open={data[0].content2Open}
          content3Open={data[0].content3Open}
          earthsNumber={data[0].earthsNumber}
          isOnMap={true}
          visible={true}
        ></ModalInfo>

        <Button
          title="Go Back"
          onPress={() =>  this.props.navigation.navigate('MainFoot')}
        />
      </View>
    );
  }
}
export default MapFoot;

const styles = StyleSheet.create({
  mainbox: {
    textAlign: 'center',
    margin: 0,
    flex: 5,
    justifyContent: 'space-between',
  },
  mapView: {
    flex: 25,
  }
});