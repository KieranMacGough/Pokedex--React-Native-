// List.js
import React from "react";
import Pokemon from './Pokemon.js';

import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";


// definition of the Item, which will be rendered in the FlatList
const Item = ({ item, setPokemonProfile, setSearchPhrase }) => (
  <View style={{ flex: 1 }}>
    <Pokemon mon={item} setPokemonProfile={setPokemonProfile}  />
  </View>
    // console.warn(item),
);

// the filter
const List = ({ searchPhrase, setClicked, data, setPokemonProfile, setSearchPhrase }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <><Item item={item} setPokemonProfile={setPokemonProfile} /></>;
    }
    // filter by name / first type / second type / id
    if (item.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        || item.types[0].type.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        || (item.types[1] ? item.types[1].type.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g)) : '')
        || (item.id + '').includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        ){
      return <><Item item={item} setPokemonProfile={setPokemonProfile}/></>;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList 
          horizontal={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{paddingBottom: 540}}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 0,
    width: "100%",
    flex: 1
  },
});