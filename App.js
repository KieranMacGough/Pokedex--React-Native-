// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';;
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles/globalStyles.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import { useFonts } from 'expo-font';
import { MainClient } from 'pokenode-ts';
import { GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import svgTypes from './images/vectors/types/index.js';

export default function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonProfile, setPokemonProfile] = useState('');
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  // Saved Filters
  const [searchPhrase, setSearchPhrase] = useState("");
  const [generationFilters, setGenerationFilters] = useState([false, false, false, false, false, false, false, false]);
  const [typeFilters, setTypeFilters] = useState({
    'bug': false,
    'dark': false,
    'dragon': false,
    'electric': false,
    'fairy': false,
    'fighting': false,
    'fire': false,
    'flying': false,
    'ghost': false,
    'grass': false,
    'ground': false,
    'ice': false,
    'normal': false,
    'poison': false,
    'psychic': false,
    'rock': false,
    'steel': false,
    'water': false,
  });
  const [rangeFilter, setRangeFilter] = useState([1, globalStyles.MAX_POKEMON_NUMBER])

  const [loaded] = useFonts({
    Inter: require('./fonts/Inter.ttf'),
  });

  async function pokePromises() {
    const api = new MainClient();
    let promises = [];
    for (let i = 1; i <= globalStyles.MAX_POKEMON_NUMBER; i++) {
      promises.push(api.pokemon.getPokemonById(i));
    }
    return Promise.all(promises);
  }
  const [loading, setLoading] = useState(true)

useEffect(() => {
  console.log("typeFilters",typeFilters);
}, [typeFilters])


  // get data from the api endpoint
  useEffect(() => {
    // Make filters
 
    // Get API Data
    console.log("pokemonLoaded: ", pokemonLoaded);
    if (!pokemonLoaded) {
      pokePromises().then(results => {
        setAllPokemonData(results);
        setLoading(false)
      })
    }
  }, []);

  useEffect(() => {
    console.log("pokemonLoaded: ", pokemonLoaded);;
  }, [pokemonLoaded]);

  if (!loaded) {
    return null;
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {(pokemonProfile === '')
          ? (<Home
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            loading={loading}
            setPokemonProfile={setPokemonProfile}
            allPokemonData={allPokemonData}
            generationFilters={generationFilters}
            setGenerationFilters={setGenerationFilters}
            typeFilters={typeFilters}
            setTypeFilters={setTypeFilters}
            rangeFilter={rangeFilter}
            setRangeFilter={setRangeFilter}

          />)
          : (<Profile setPokemonProfile={setPokemonProfile} mon={pokemonProfile} />)}
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: StatusBar.currentHeight,
    fontFamily: 'serif'
  }
})