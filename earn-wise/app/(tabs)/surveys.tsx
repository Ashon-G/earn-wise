import React, { useRef, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Platform } from "react-native";
import CpxResearch from "cpx-research-sdk-react-native";

interface Survey {
  id: string;
  title: string;
}

export default function SurveyScreen() {
  const [isCpxLayerHidden, setIsCpxLayerHidden] = useState(false);
  const openWebViewRef = useRef<(() => void) | null>(null);

  const onSurveysUpdate = (surveys: Survey[]) => {
    console.log("Surveys updated: ", surveys);
  };

  const onWebViewClosed = () => {
    console.log("CPX WebView was closed.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Surveys</Text>

      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <CpxResearch
          appId="YOUR_APP_ID"
          userId="YOUR_USER_ID"
          accentColor="#ff9800"
          isHidden={isCpxLayerHidden}
          onSurveysUpdate={onSurveysUpdate}
          onWebViewWasClosed={onWebViewClosed}
          bindOpenWebView={(openWebView) => (openWebViewRef.current = openWebView)}
          cornerWidget={{
            backgroundColor: "#ff9800",
            position: "bottomright",
            roundedCorners: 10,
            size: 50,
            text: "Surveys",
            textColor: "#ffffff",
            textSize: 12,
          }}
        />
      ) : (
        <Text style={styles.unsupportedText}>
          Surveys are not supported on this platform.
        </Text>
      )}

      <View style={styles.actions}>
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => openWebViewRef.current?.()}>
            <Text style={styles.buttonText}>Open Survey WebView</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, { backgroundColor: "#d3d3d3" }]} disabled>
            <Text style={[styles.buttonText, { color: "#666666" }]}>Not Supported</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  unsupportedText: {
    fontSize: 16,
    color: "#ff0000",
    marginBottom: 16,
    textAlign: "center",
  },
  actions: {
    marginTop: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
