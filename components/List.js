// List.js
import React from "react";
import globalStyles from '../styles/globalStyles.js';
import TypeBadge from './TypeBadge';
import Pokeball from '../images/vectors/patterns/Pokeball.png';
import DotsSixByThree from '../images/vectors/patterns/6x3.png';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image
} from "react-native";

function formatId(id) {
  var num = '' + id;
  while (num.length < 3){
      num = '0' + num;
  }
  num = '#'+num;
  return num;
}

// definition of the Item, which will be rendered in the FlatList
const Item = ({ item }) => (
    // console.warn(item),
    console.log(item.sprites.other["official-artwork"].front_default),
    <View style={styles.container}>
      <View style={[styles.card, {backgroundColor: globalStyles["backgroundtype"+item.types[0].type.name]}]}>
            <Image style={styles.pokeball} source={Pokeball}/>
            <Image style={styles.dotsSixByThree} source={DotsSixByThree} />           
            <Image onError={(e) => console.log(e.nativeEvent.error) } style={styles.sprite} source={{uri:`${item.sprites.other["official-artwork"].front_default}`}} />
            <Image source="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
        <View style={styles.cardData}>
            <Text style={styles.cardId}>{formatId(item.id)}</Text>
            <Text style={styles.cardName}>{item.name}</Text>
            <View style={styles.cardTypes}>
            <TypeBadge type={item.types[0].type.name} />
                    {item.types.length === 2 && 
                    <TypeBadge type={item.types[1].type.name} />
                    }
            </View>
        </View>
        
        
        </View>
    </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <><Item item={item} /></>;
    }
    // filter by name / first type / second type / id
    if (item.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        || item.types[0].type.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        || (item.types[1] ? item.types[1].type.name.includes(searchPhrase.toLowerCase().trim().replace(/\s/g)) : '')
        || (item.id + '').includes(searchPhrase.toLowerCase().trim().replace(/\s/g))
        ){
      return <><Item item={item} /></>;
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
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  },

  item: {
    margin: 30,
  },
  
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  
  container: {
    position: 'relative',
    margin: 0,
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 30,
    height: 115,
    padding: 20,
    backgroundColor: globalStyles.typenormal,
  },

  pokeball: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  dotsSixByThree: {
    position: 'absolute',
    top: 5,
    left: 90,
  },
  sprite: {
    height: 500
  },
  
  cardData: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  cardTypes: {
    display: 'flex',
    flexDirection: 'row'
  },
  
  cardId: {
    fontWeight: '700',
    fontSize: 12,
    color: globalStyles.textnumber
  },
  
  cardName: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 26,
    color: globalStyles.textwhite
  },
  
  cardImg: {
    position: 'absolute',
    right: 10,
    bottom: 25,
    height: 130,
    width: 130,
  },

//   @media screen and (max-width: 320px) {
//     .card-img, .card-sixbythree {
//       display: 'none';
//     }
//   }


});