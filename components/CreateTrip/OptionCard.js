import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const OptionCard = ({ option, selectedOption, setSelectedOption }) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedOption(option)}
      style={[
        {
          padding: 25,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors.LIGHT_GREY,
          borderRadius: 15,
        },
        selectedOption?.id == option.id && { borderWidth: 2 },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            textTransform: "capitalize",
          }}
        >
          {option?.type}
        </Text>
        <Text
          style={{ fontSize: 17, fontFamily: "outfit", color: Colors.GREY }}
        >
          {option?.desc}
        </Text>
      </View>
      <Text style={{ fontSize: 40 }}>{option?.icon}</Text>
    </TouchableOpacity>
  );
};

export default OptionCard;
