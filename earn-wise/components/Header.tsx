import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>EarnWise</Text>
      <TouchableOpacity>
        <Text style={styles.notificationIcon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  notificationIcon: {
    fontSize: 20,
  },
});

export default Header;
