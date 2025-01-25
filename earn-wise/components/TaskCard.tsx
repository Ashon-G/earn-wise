import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "@/styles/globalStyles";

// Define the allowed paths as a union of string literals
type ValidPaths =
  | "/(tabs)/earnings"
  | "/(tabs)/surveys"
  | "/(tabs)/profile"
  | "/(tabs)/ad-rewards"
  | `/${string}`; // Allows dynamic paths

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
    screen: ValidPaths; // Matches the `/${string}` type
  };
  style?: object; // Optional custom styles
}

const TaskCard: React.FC<TaskProps> = ({ task, style }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(task.screen as any); // Cast to `any` for dynamic paths
  };

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={handlePress}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#262626", // --foreground
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#404040", // --border
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fbfbfb", // --copy
  },
  description: {
    fontSize: 14,
    color: "#a6a6a6", // --copy-lighter
    marginTop: 4,
  },
});

export default TaskCard;
