import React from "react";
import { ScrollView, Text, View, Dimensions, Animated } from "react-native";

// import SlidingUpPanel from "rn-sliding-up-panel";



const Options = (props) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView scrollEnabled={true} style={[styles.scrollView, {height: screenHeight*3, width: screenWidth}]}>
      <View  style={styles.container}>
        <Text>Hello world, I am {props.homeOption}</Text>
      </View>
    </ScrollView>
  )
}

export default Options;

const styles = {
  scrollView: {
    position: 'absolute',
    top: 500,
    left: 0,
    backgroundColor: 'red'
  },

  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    backgroundColor: 'red',

  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: 180,
    backgroundColor: "#b197fc",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
  },
  iconBg: {
    backgroundColor: "#2b8a3e",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1
  }
};