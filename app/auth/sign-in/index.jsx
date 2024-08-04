import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../configs/FirebaseConfig";
import { validateEmail, validatePassword } from "../../../utils/validation";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigattion = useNavigation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    navigattion.setOptions({ headerShown: false });
  }, []);

  const handleSignIn = () => {
    if (!validateEmail(formData.email)) {
      ToastAndroid.show("Please enter a valid email", ToastAndroid.BOTTOM);
      return;
    }

    if (!validatePassword(formData.password)) {
      ToastAndroid.show("Please enter a valid password", ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        router.replace("/mytrip");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("Invalid Credentials", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 80,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
          textTransform: "capitalize",
          marginTop: 30,
        }}
      >
        let's sign you in
      </Text>

      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit",
          color: Colors.GREY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit",
          color: Colors.GREY,
          marginTop: 10,
        }}
      >
        You've been missed
      </Text>

      {/* Email input */}
      <View style={{ marginTop: 50 }}>
        {/* <Text
          style={{
            fontFamily: "outfit",
            marginBottom: 5,
          }}
        >
          Email
        </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
      </View>

      {/* Password input */}
      <View style={{ marginTop: 20 }}>
        {/* <Text
          style={{
            fontFamily: "outfit",
            marginBottom: 5,
          }}
        >
          Password
        </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>

      {/* Sign in button */}
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
        onPress={handleSignIn}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
          //   borderColor: Colors.PRIMARY,
        }}
        onPress={() => router.replace("auth/sign-up")}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GREY,
    fontFamily: "outfit",
  },
});
