// List.js
import React from "react";
import Pokemon from './Pokemon.js';
import globalStyles from "../../styles/globalStyles.js";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text
} from "react-native";


// definition of the Item, which will be rendered in the FlatList
const Item = ({ item, setPokemonProfile, setSearchPhrase }) => (
  <View style={{ flex: 1 }}>
    <Pokemon mon={item} setPokemonProfile={setPokemonProfile} />
  </View>
  // console.warn(item),
);

// the filter
const List = ({ loading, searchPhrase, setClicked, setPokemonProfile, setSearchPhrase, filteredData, pokemonListRef }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <><Item item={item} setPokemonProfile={setPokemonProfile} /></>;
    }
    // filter by name / first type / second type / id
    if (true) {
      return <><Item item={item} setPokemonProfile={setPokemonProfile} /></>;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        {
          loading ?
          <View style={styles.warningBox}>
            <Text>Loading...</Text>
          </View>
            :
            filteredData && filteredData.length > 0 ? <FlatList
              ref={pokemonListRef}
              horizontal={false}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{ paddingBottom: 540 }}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              removeClippedSubviews={true}
            />
              :
              <View style={styles.warningBox}>
                <Text>Nothing found!</Text>
              </View>
        }
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

  warningBox: {
    padding: 10, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: globalStyles.backgroundtypenormal, 
    borderRadius: 10
  }
});