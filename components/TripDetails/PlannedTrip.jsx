import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getGooglePhotoRef } from "../../utils/GooglePlaceApi";

const PlannedTrip = ({ details }) => {
  return (
    <View style={{ marginTop: 20, width: "100%" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        {" "}
        🏕️ Plan Details
      </Text>
      {details?.map((item, index) => {
        return (
          <View>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                marginTop: 20,
              }}
            >
              Day {item.day} : {item.title}
            </Text>
            {item?.placesToVisit?.map((place, index) => (
              <PlacesCard place={place} key={index} />
            ))}
          </View>
        );
      })}
    </View>
  );
};

export default PlannedTrip;

const PlacesCard = ({ place }) => {
  const [photoRef, setPhotoRef] = useState(null);
  const [geoCoordinates, setGeoCoordinates] = useState({ lat: "", lng: "" });

  const getPhotoRef = async () => {
    const result = await getGooglePhotoRef(place.name);
    setPhotoRef(result?.results?.[0]?.photos?.[0]?.photo_reference);
    setGeoCoordinates(result?.results?.[0]?.geometry?.location);
  };

  //   const handlePress = async () => {
  //     const url =
  //       Platform.OS === "ios"
  //         ? `comgooglemaps://?center=${geoCoordinates.lat},${geoCoordinates.lng}`
  //         : `geo:${geoCoordinates.lat},${geoCoordinates.lng}`;

  //     const supported = await Linking.canOpenURL(url);

  //     if (supported) {
  //       Linking.openURL(url).catch((err) =>
  //         console.error("An error occurred", err)
  //       );
  //     } else {
  //       console.log("Google Maps is not installed or the URL cannot be opened");
  //     }
  //   };

  const handlePress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${geoCoordinates.lat},${geoCoordinates.lng}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  useEffect(() => {
    getPhotoRef();
  }, []);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 20,
        position: "relative",
      }}
    >
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`,
        }}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {place.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            color: Colors.GREY,
          }}
        >
          {place.details}
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontFamily: "outfit" }}>⏱️ {place.timeToSpend}</Text>
          <Text style={{ fontFamily: "outfit" }}>🎫 {place.ticketPrice}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={{ position: "absolute", top: 15, right: 10 }}>
        <Ionicons name="navigate-circle" size={40} color="black" />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};
