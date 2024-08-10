import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import moment from "moment";

const UserTripCard = ({ trip }) => {
  const tripData = trip?.tripData;

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
      }}
    >
      {tripData?.locationInfo?.photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData?.locationInfo?.photoRef}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`,
          }}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 15,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/images/placeholder.jpg")}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 15,
          }}
        />
      )}
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {tripData.locationInfo?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GREY,
          }}
        >
          {moment(tripData?.dates?.startDate).format("DD MMM YYYY")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GREY,
          }}
        >
          {`${tripData?.tripType.desc}`}
        </Text>
      </View>
    </View>
  );
};

export default UserTripCard;
