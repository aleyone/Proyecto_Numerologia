import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import DrawNavigation from "../components/DrawNavigation";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text>Home</Text>
      <DrawNavigation />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    marginTop: 100,
    padding: 5,
  },
});
