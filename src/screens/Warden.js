import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Warden = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cont}>
      <View style={styles.head}>
        <Text style={styles.title}>Warden</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Maintenance List");
          }}
        >
          <Text style={styles.Text}>Maintanace List</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Student List");
          }}
        >
          <Text style={styles.Text}>Student List</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Leave List");
          }}
        >
          <Text style={styles.Text}>Leave List</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Warden;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
  },
  pressable: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  Text: {
    color: "#fff",
    fontSize: 16,
  },
});
