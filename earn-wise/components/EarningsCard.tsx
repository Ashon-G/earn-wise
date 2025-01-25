import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import globalStyles from "@/styles/globalStyles";

const EarningsCard = () => {
  return (
    <View style={[styles.earningsCard, globalStyles.card]}>
      {/* Static background image */}
      <View style={styles.backgroundImageContainer}>
        <Image source={require("@/assets/images/dark-gradient.gif")} style={styles.backgroundImage} />
      </View>

      {/* Content on top of the background image */}
      <Text style={globalStyles.cardTitle}>Total Earnings</Text>
      <Text style={styles.earningsAmount}>$12.50</Text>
      <TouchableOpacity style={[styles.redeemButton, globalStyles.button]}>
        <Text style={globalStyles.buttonText}>Redeem Rewards</Text>
      </TouchableOpacity>
      <Text style={[styles.monthlyGoalText, globalStyles.copyLight]}>Monthly Goal</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: "50%" }]} />
      </View>
      <Text style={[styles.monthlyGoalAmount, globalStyles.copyLight]}>$25.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  earningsCard: {
    alignItems: "center", // Center-align all content
    position: "relative", // To position the background image behind content
    overflow: "hidden", // Hide the image overflow
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject, // Fill the container completely
    zIndex: -1, // Ensure the background stays behind the content
    justifyContent: "center", // Center the image in the container
    alignItems: "center", // Center the image in the container
  },
  backgroundImage: {
    width: "100%", // Image is 1.5 times larger than the container (adjust as needed)
    height: "100%", // Increased height to make the image larger
    position: "absolute", // Keep the image positioned correctly
    top: 0,
    left: 0,
    resizeMode: "cover", // Ensure the image covers the container area
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
    marginVertical: 8,
  },
  redeemButton: {
    marginBottom: 12, // Add space between button and other content
  },
  monthlyGoalText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#a6a6a6", // --copy-lighter
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#404040", // --border
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#21d760", // --primary
  },
  monthlyGoalAmount: {
    fontSize: 14,
    color: "#a6a6a6", // --copy-lighter
  },
});

export default EarningsCard;
