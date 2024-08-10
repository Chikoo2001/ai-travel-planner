import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const FlightInfo = ({ flightData }) => {
  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      ToastAndroid.show(
        `Don't know how to open this URL: ${url}`,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View style={{ marginTop: 20, width: "100%" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        {" "}
        ✈️ Flights
      </Text>
      {/* <FlatList
        data={flightData}
        renderItem={({ item, index }) => (
          <FlightCard item={item} handlePress={handlePress} />
        )}
        keyExtractor={(item) => item.flightNumber}
      /> */}
      <View>
        {flightData?.map((item, index) => (
          <FlightCard key={index} item={item} handlePress={handlePress} />
        ))}
      </View>
    </View>
  );
};

export default FlightInfo;

const FlightCard = ({ item, handlePress }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 20,
      borderWidth: 2,
      borderColor: Colors.GREY,
      padding: 10,
      borderRadius: 15,
      width: "100%",
      alignItems: "center",
    }}
  >
    <View style={{ flex: 1 }}>
      <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
        <Text style={{ fontFamily: "outfit-bold" }}>Airline:</Text>{" "}
        {item.airline}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 17 }}>
        <Text style={{ fontFamily: "outfit-bold" }}>Price:</Text> {item.price}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => handlePress(item.bookingUrl)}
      style={{
        backgroundColor: Colors.PRIMARY,
        padding: 5,
        width: 100,
        borderRadius: 7,
        flexGrow: 0,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: "outfit",
          color: Colors.WHITE,
        }}
      >
        Book Here
      </Text>
    </TouchableOpacity>
  </View>
);
