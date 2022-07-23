// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState  } from 'react';;
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles/globalStyles.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import { useFonts } from 'expo-font';
import { MainClient } from 'pokenode-ts';


export default function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonProfile, setPokemonProfile] = useState('');
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  const [loaded] = useFonts({
    Inter: require('./fonts/Inter.ttf'),
  });

  async function pokePromises() {
    const api = new MainClient();
    let promises = [];
      for (let i = 1; i < 252; i++) {
        promises.push(api.pokemon.getPokemonById(i));
      }
      return Promise.all(promises);
  }

   // get data from the fake api endpoint
   useEffect(() => {
    console.log("pokemonLoaded: ", pokemonLoaded);
    if (!pokemonLoaded) {
        pokePromises().then(results => {
          setAllPokemonData(results);
        })
    }    
}, []);

useEffect( () => {
  console.log("pokemonLoaded: ", pokemonLoaded);;
}, [pokemonLoaded]);

  if (!loaded) {
    return null;
  }

 

  return (
    <>
        <View style={styles.container}>
          {(pokemonProfile === '') ? (<Home setPokemonProfile={setPokemonProfile} allPokemonData={allPokemonData} /> ) : ( <Profile setPokemonProfile={setPokemonProfile} mon={pokemonProfile} /> ) }
        </View>
    </>
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