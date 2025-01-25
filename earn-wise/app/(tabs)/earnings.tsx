import React from "react";
import { View, StyleSheet } from "react-native";
import TaskCard from "@/components/TaskCard";
import EarningsCard from "@/components/EarningsCard";

export default function EarningsScreen() {
  const tasks: { id: number; title: string; description: string; screen: `/${string}` }[] = [
    {
      id: 1,
      title: "Complete Survey",
      description: "Answer survey questions to earn coins.",
      screen: "/(tabs)/surveys",
    },
    {
      id: 2,
      title: "Update Profile",
      description: "Complete your profile and earn rewards.",
      screen: "/(tabs)/profile",
    },
    {
      id: 3,
      title: "Watch Reward Ads",
      description: "Earn extra coins by watching reward ads!",
      screen: "/(tabs)/ad-rewards",
    },
  ];

  return (
    <View style={styles.container}>
      <EarningsCard />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a", // --background
  },
});
