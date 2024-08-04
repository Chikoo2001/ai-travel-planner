import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { updateTripData } from "../../state/createTripSlice";
import { EXPO_GOOGLE_MAPS_API_KEY } from "@env";

const SearchPlace = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
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
      <GooglePlacesAutocomplete
        placeholder="Search place..."
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          dispatch(
            updateTripData({
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos[0]?.photo_reference,
                url: details?.url,
              },
            })
          );
          router.push("/create-trip/select-traveler");
        }}
        query={{
          key: EXPO_GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            borderWidth: 2,
            borderRadius: 15,
            marginTop: 20,
          },
        }}
      />
    </View>
  );
};

export default SearchPlace;
