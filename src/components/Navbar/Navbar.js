import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/authContext";

import IconButton from "../UI/IconButton";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [path, setPath] = useState(navigation.getCurrentRoute().name);
  let listner;
  useEffect(() => {
    listner = navigation.addListener("state", (e) => {
      setPath(navigation.getCurrentRoute().name);
    });
  }, []);

  useEffect(() => {
    setPath(navigation.getCurrentRoute().name);
    console.log("name", path);
  }, [listner]);
  return (
    <View style={styles.cont}>
      <Pressable
        style={styles.navItem}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <IconButton
          icon="person-circle-outline"
          color={path === "Home" ? "orange" : "black"}
          size={24}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      {authCtx?.user?.rollno == 0 && (
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Warden");
          }}
        >
          <IconButton
            icon="person"
            color={path === "Warden" ? "orange" : "black"}
            size={24}
            onPress={() => {
              navigation.navigate("Warden");
            }}
          />
          <Text style={styles.text}>Warden</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        <IconButton
          icon="home"
          color={path === "Dashboard" ? "orange" : "black"}
          size={24}
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />
        <Text style={styles.text}>Dashboard</Text>
      </Pressable>
      {authCtx?.user?.rollno != 0 && (
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Issue");
          }}
        >
          <IconButton
            icon="create"
            color={path === "Issue" ? "orange" : "black"}
            size={24}
            onPress={() => {
              navigation.navigate("Issue");
            }}
          />
          <Text style={styles.text}>Issue</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.navItem}
        onPress={() => {
          navigation.navigate("Employee List");
        }}
      >
        <IconButton
          icon="exit"
          color={path === "Employee List" ? "orange" : "black"}
          size={24}
          onPress={() => {
            navigation.navigate("Employee List");
          }}
        />
        <Text style={styles.text}>Employees</Text>
      </Pressable>
      <Pressable
        style={styles.navItem}
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        <IconButton
          icon="fast-food"
          color={path === "Menu" ? "orange" : "black"}
          size={24}
          onPress={() => {
            navigation.navigate("Menu");
          }}
        />
        <Text style={styles.text}>Menu</Text>
      </Pressable>
      {authCtx?.user?.rollno != 0 && (
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Leave Form");
          }}
        >
          <IconButton
            icon="reader"
            color={path === "Leave Form" ? "orange" : "black"}
            size={24}
            onPress={() => {
              navigation.navigate("Leave Form");
            }}
          />
          <Text style={styles.text}>Leave Form</Text>
        </Pressable>
      )}
      {authCtx?.user?.rollno != 0 && (
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Leave Status");
          }}
        >
          <IconButton
            icon="newspaper"
            color={path === "Leave Status" ? "orange" : "black"}
            size={24}
            onPress={() => {
              navigation.navigate("Leave Status");
            }}
          />
          <Text style={styles.text}>Leave Status</Text>
        </Pressable>
      )}
      {authCtx?.user?.rollno == 0 && (
        <Pressable
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("NewNotice");
          }}
        >
          <IconButton
            icon="exit"
            color={path === "NewNotice" ? "orange" : "black"}
            size={24}
            onPress={() => {
              navigation.navigate("NewNotice");
            }}
          />
          <Text style={styles.text}>New Notice</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  navItem: {
    paddingLeft: 6,
    paddingRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 10 },
});
