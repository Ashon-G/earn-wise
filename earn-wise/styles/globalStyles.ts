import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // Colors
  primary: {
    backgroundColor: "#21d760",
    color: "#000000",
  },
  secondary: {
    backgroundColor: "#213dd7",
    color: "#f9fafe",
  },
  background: {
    backgroundColor: "#1a1a1a", // --background
  },
  foreground: {
    backgroundColor: "#262626", // --foreground
  },
  border: {
    borderColor: "#404040", // --border
  },
  copy: {
    color: "#fbfbfb", // --copy
  },
  copyLight: {
    color: "#d9d9d9", // --copy-light
  },
  button: {
    backgroundColor: "#21d760", // --primary
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000", // --primary-content
  },
  card: {
    backgroundColor: "#262626", // --foreground
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderColor: "#404040", // --border
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#a6a6a6", // --copy-lighter
    marginTop: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#d9d9d9", // --copy-light
    marginBottom: 8,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statsText: {
    fontSize: 16,
    color: "#d9d9d9", // --copy-light
    marginLeft: 10,
  },
});

export default globalStyles;
