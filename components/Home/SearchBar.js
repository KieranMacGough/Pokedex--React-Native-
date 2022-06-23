// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import globalStyles from '../../styles/globalStyles.js';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="What Pokémon are you looking for?"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",

  },
  searchBar__unclicked: {
    paddingLeft: 55,
    paddingRight: 25,
    paddingVertical: 20.5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: globalStyles.backgrounddefaultinput,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: '2px',
  },
  searchBar__clicked: {
    paddingLeft: 55,
    paddingRight: 25,
    paddingVertical: 20.5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: globalStyles.backgrounddefaultinput,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: 16
  },
  input: {
    fontSize: 16,
    marginLeft: 20,
    width: '100%'
  },
});