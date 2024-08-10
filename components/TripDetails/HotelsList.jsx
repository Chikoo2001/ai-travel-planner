import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { getGooglePhotoRef } from "../../utils/GooglePlaceApi";

const HotelsList = ({ hotelsList }) => {
  const handlePress = (geoCoordinates) => {
    const url = `geo:${geoCoordinates}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={{ marginTop: 20, width: "100%" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        {" "}
        🏨 Hotel Recommendations
      </Text>
      {/* <FlatList
        data={hotelsList}
        renderItem={({ item, index }) => (
          <HotelCard hotel={item} handlePress={handlePress} />
        )}
        keyExtractor={(item, index) => index}
        // horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 8,
        }}
        contentContainerStyle={{
          gap: 15,
        }}
      /> */}
      <View style={{ marginTop: 8, gap: 15 }}>
        {hotelsList?.map((item, index) => (
          <HotelCard key={index} hotel={item} handlePress={handlePress} />
        ))}
      </View>
    </View>
  );
};

export default HotelsList;

const HotelCard = ({ hotel }) => {
  const { imageUrl, hotelName, rating, price, description } = hotel;

  const [photoRef, setPhotoRef] = useState(null);
  const [geoCoordinates, setGeoCoordinates] = useState({ lat: "", lng: "" });

  const getPhotoRef = async () => {
    const result = await getGooglePhotoRef(hotelName);
    setPhotoRef(result?.results?.[0]?.photos?.[0]?.photo_reference);
    console.log(result?.results?.[0]?.geometry?.location);
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
      onPress={() => handlePress()}
      style={{
        // width: 180,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 15,
        flex: 1,
      }}
    >
      <Image
        // source={require("../../assets/images/placeholder.jpg")}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`,
        }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
          {hotelName}
        </Text>
        <Text style={{ fontFamily: "outfit" }}>{description}</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontFamily: "outfit" }}>⭐{rating}</Text>
          <Text style={{ fontFamily: "outfit" }}>🏷️ {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
