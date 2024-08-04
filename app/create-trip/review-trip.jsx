import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ReviewTrip = () => {
  const navigation = useNavigation();

  const { tripData } = useSelector((state) => state.createTrip);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  const tripDetails = [
    {
      id: 1,
      icon: "📍",
      header: "Destination",
      value: tripData?.locationInfo?.name,
    },
    {
      id: 2,
      icon: "📅",
      header: "Travel Date",
      value:
        moment(tripData?.dates?.startDate).format("DD MMM") +
        " to " +
        moment(tripData?.dates?.endDate).format("DD MMM"),
    },
    {
      id: 3,
      icon: "🚌",
      header: "Who is travelling",
      value: tripData?.tripType?.type,
    },
    {
      id: 4,
      icon: "💵",
      header: "Budget",
      value: tripData?.tripBudget?.type,
    },
  ];

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "outfit-bold",
          marginTop: 20,
        }}
      >
        Review your trip
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 23,
          }}
        >
          Before generating your trip please review your selection
        </Text>
        <FlatList
          data={tripDetails}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }}></View>}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "flex-start",
                gap: 20,
              }}
            >
              <Text style={{ fontSize: 30 }}>{item.icon}</Text>
              <View>
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: 20,
                    color: Colors.GREY,
                  }}
                >
                  {item.header}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          )}
          style={{
            marginTop: 20,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 40,
        }}
        // onPress={() => {
        //   router.push("/create-trip/review-trip");
        // }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Build my trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewTrip;
