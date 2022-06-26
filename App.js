// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';;
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles/globalStyles.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import { useFonts } from 'expo-font';


export default function App() {
  const [pokemonProfile, setPokemonProfile] = useState('');
  const [loaded] = useFonts({
    Inter: require('./fonts/Inter.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const GradientText = ({colors, ...rest}) => {
    return (
      <MaskedView maskElement={<Text {...rest} />}>
        <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
          <Text {...rest} style={[rest.style, {opacity: 0}]} />
        </LinearGradient>
      </MaskedView>
    );
  };

  return (
    <>
        <View style={styles.container}>
          {(pokemonProfile === '') ? (<Home setPokemonProfile={setPokemonProfile} /> ) : ( <Profile setPokemonProfile={setPokemonProfile} mon={pokemonProfile} /> ) }
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