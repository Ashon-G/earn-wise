import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons"; // To use icons for statistics

// Extend the Window interface for invokeApplixirVideoUnit
declare global {
  interface Window {
    invokeApplixirVideoUnit: (options: {
      zoneId: number;
      accountId: string;
      siteId: string;
      userId: string;
      custom?: string;
      adStatusCb?: (status: string) => void;
    }) => void;
  }
}

const RewardAdScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [adStatus, setAdStatus] = useState<string | null>(null);

  // Tracking statistics
  const [adsWatched, setAdsWatched] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [totalAdTime, setTotalAdTime] = useState(0); // In seconds

  const userId = uuidv4(); // Unique user ID for ad mediation

  // Load the Applixir SDK script dynamically
  const loadApplixirScript = () => {
    if (!document.getElementById("applixir-sdk")) {
      const script = document.createElement("script");
      script.id = "applixir-sdk";
      script.src = "https://cdn.applixir.com/applixir.sdk4.0m.js";
      script.async = true;
      script.onload = initializeAdAnchor; // Ensure anchor is ready after script loads
      document.body.appendChild(script);
    } else {
      initializeAdAnchor(); // Ensure anchor exists if script is already loaded
    }
  };

  // Create the Applixir anchor in the DOM
  const initializeAdAnchor = () => {
    if (!document.getElementById("applixir_vanishing_div")) {
      const div = document.createElement("div");
      div.id = "applixir_vanishing_div";
      div.hidden = true;

      const iframe = document.createElement("iframe");
      iframe.id = "applixir_parent";
      div.appendChild(iframe);

      document.body.appendChild(div);
    }
  };

  // Initialize and show the ad
  const initializeAd = () => {
    if (typeof window.invokeApplixirVideoUnit !== "function") {
      console.error("Applixir SDK is not loaded yet.");
      return;
    }

    const options = {
      zoneId: 2050, // Development Zone ID
      accountId: "8582",
      siteId: "9111",
      userId, // Unique user ID
      adStatusCb: (status: string) => {
        console.log("Ad Status:", status);
        setAdStatus(status);

        // Update statistics based on ad status
        if (status === "ad-watched") {
          setAdsWatched(prev => prev + 1);
          setCoinsEarned(prev => prev + 10); // Assume 10 coins per ad watched
        }

        // Optionally track total ad time if the SDK provides this info (in seconds)
        if (status === "ad-started") {
          setTotalAdTime(prev => prev + 30); // Simulate 30 seconds for the ad duration
        }
      },
    };

    window.invokeApplixirVideoUnit(options);
  };

  useEffect(() => {
    loadApplixirScript();
  }, []);

  const handleShowAd = () => {
    setIsLoading(true);
    initializeAd();
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading completion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earn Rewards</Text>
      <Text style={styles.subtitle}>
        Watch a short video ad to earn exclusive rewards!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reward Video</Text>
        <Text style={styles.cardDescription}>
          Watch a quick video to earn extra in-app currency. It's quick and easy!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleShowAd}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading Ad..." : "Watch Ad"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Statistics</Text>
        <View style={styles.statsItem}>
          <Ionicons name="play-circle" size={24} color="#21d760" />
          <Text style={styles.statText}>Ads Watched: {adsWatched}</Text>
        </View>
        <View style={styles.statsItem}>
          <Ionicons name="cash" size={24} color="#21d760" />
          <Text style={styles.statText}>Coins Earned: {coinsEarned}</Text>
        </View>
        <View style={styles.statsItem}>
          <Ionicons name="time" size={24} color="#21d760" />
          <Text style={styles.statText}>Total Ad Time: {totalAdTime}s</Text>
        </View>
      </View>

      {adStatus && (
        <Text style={styles.adStatus}>
          Current Ad Status: {adStatus}
        </Text>
      )}
      {isLoading && <ActivityIndicator size="large" color="#21d760" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a", // --background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#d9d9d9", // --copy-light
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#262626", // --foreground
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
    marginBottom: 30,
    borderColor: "#404040", // --border
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#a6a6a6", // --copy-lighter
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#21d760", // --primary
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000000", // --primary-content
    fontWeight: "bold",
  },
  statsContainer: {
    backgroundColor: "#262626", // --foreground
    padding: 15,
    borderRadius: 12,
    width: "90%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderColor: "#404040", // --border
    borderWidth: 1,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
    marginBottom: 10,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statText: {
    fontSize: 16,
    color: "#d9d9d9", // --copy-light
    marginLeft: 10,
  },
  adStatus: {
    fontSize: 14,
    color: "#fbfbfb", // --copy
    marginTop: 20,
    textAlign: "center",
  },
});

export default RewardAdScreen;
