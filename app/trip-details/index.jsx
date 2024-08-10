import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelsList from "../../components/TripDetails/HotelsList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

const TripDetails = () => {
  const navigation = useNavigation();

  const { tripData } = useLocalSearchParams();

  const [tripDetails, setTripDetails] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
    setTripDetails(JSON.parse(tripData));
  }, []);

  return (
    <ScrollView>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripDetails?.tripData?.locationInfo?.photoRef}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`,
        }}
        style={{
          width: "100%",
          height: 330,
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            // color: Colors.PRIMARY,
          }}
        >
          {tripDetails?.tripData?.locationInfo?.name}
        </Text>
        <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.GREY,
            }}
          >
            {moment(tripDetails?.tripData?.dates?.startDate).format(
              "DD MMM YYYY"
            )}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.GREY,
            }}
          >
            -
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GREY,
            }}
          >
            {moment(tripDetails?.tripData?.dates?.endDate).format(
              "DD MMM YYYY"
            )}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            color: Colors.GREY,
            marginTop: 5,
          }}
        >
          {`${tripDetails?.tripData?.tripType?.icon} ${tripDetails?.tripData?.tripType?.desc}`}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripDetails?.tripPlan?.flights} />

        {/* Hotels List */}
        <HotelsList hotelsList={tripDetails?.tripPlan?.hotels} />

        {/* plan */}
        <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
      </View>
    </ScrollView>
  );
};

export default TripDetails;
