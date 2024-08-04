import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateTripData } from "../../state/createTripSlice";

const SelectDates = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { tripData } = useSelector((state) => state.createTrip);

  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setSelectedDates({ ...selectedDates, startDate: moment(date) });
    } else {
      setSelectedDates({ ...selectedDates, endDate: moment(date) });
    }
  };

  const onDateSelectionContinue = () => {
    if (!selectedDates?.startDate) {
      ToastAndroid.show("Please select a start date", ToastAndroid.BOTTOM);
      return;
    }
    if (!selectedDates?.endDate) {
      ToastAndroid.show("Please select an end date", ToastAndroid.BOTTOM);
      return;
    }
    const totalNoOfDays = selectedDates.endDate.diff(
      selectedDates.startDate,
      "days"
    );
    dispatch(
      updateTripData({
        ...tripData,
        dates: {
          ...selectedDates,
          totalNoOfDays: totalNoOfDays + 1,
        },
      })
    );
    router.push("/create-trip/select-budget");
  };

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
        Travel Dates
      </Text>

      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
        onPress={onDateSelectionContinue}
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

export default SelectDates;
