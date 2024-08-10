import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { AI_PROMPT } from "../../constants/Options";
import { chatSession } from "../../configs/AiModal";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import { useRouter } from "expo-router";

const GenerateTrip = () => {
  const { tripData } = useSelector((state) => state.createTrip);
  const router = useRouter();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tripData && GenerateAiTrip();
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_AI_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.dates?.totalNoOfDays)
      .replace("{totalNights}", tripData?.dates?.totalNoOfDays - 1)
      .replace("{tripType}", tripData?.tripType?.type)
      .replace("{budget}", tripData?.tripBudget?.type)
      .replace("{totalDays}", tripData?.dates?.totalNoOfDays)
      .replace("{totalNights}", tripData?.dates?.totalNoOfDays - 1);
    console.log(FINAL_AI_PROMPT);
    const result = await chatSession.sendMessage(FINAL_AI_PROMPT);
    // console.log();
    const tripResponse = JSON.parse(result.response.text());
    setLoading(false);

    const docId = Date.now().toString();
    const res = await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      tripPlan: tripResponse,
      tripData: tripData,
      docId: docId,
    });
    // if (res) {
    router.push("(tabs)/mytrip");
    // }
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
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Please wait...
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip
      </Text>
      <Image
        source={require("../../assets/images/plane.gif")}
        style={{
          width: "100%",
          height: 200,
          objectFit: "contain",
        }}
      />
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GREY,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not go back
      </Text>
    </View>
  );
};

export default GenerateTrip;
