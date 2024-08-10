import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";

const UserTripList = ({ userTrips }) => {
  const tripData = userTrips[0].tripData;
  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Image
          source={require("../../assets/images/placeholder.jpg")}
          style={{
            width: "100%",
            height: 240,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {tripData.locationInfo?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.GREY,
              }}
            >
              {moment(tripData?.dates?.startDate).format("DD MMM YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.GREY,
              }}
            >
              {` ${tripData?.tripType.desc}`}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 15,
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={userTrips}
          renderItem={({ item, index }) => <UserTripCard trip={item} />}
          keyExtractor={(item) => item.docId}
        />
      </View>
    </View>
  );
};

export default UserTripList;
