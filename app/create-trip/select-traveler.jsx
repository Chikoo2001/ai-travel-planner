import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { travelerOptions } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { useDispatch, useSelector } from "react-redux";
import { updateTripData } from "../../state/createTripSlice";

const SelectTraveler = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { tripData } = useSelector((state) => state.createTrip);

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

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
        Who's Travelling
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
          Choose your travellers
        </Text>

        <FlatList
          style={{ marginTop: 15 }}
          data={travelerOptions}
          renderItem={({ item, index }) => (
            <OptionCard
              option={item}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
        onPress={() => {
          if (!selectedOption) {
            ToastAndroid.show("Please select an option", ToastAndroid.BOTTOM);
            return;
          }
          dispatch(
            updateTripData({
              ...tripData,
              tripType: selectedOption,
            })
          );
          router.push("/create-trip/select-dates");
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTraveler;
