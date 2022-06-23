import React, { useState, useEffect, startTransition } from 'react';
import { StatusBar, Image, ScrollView, View, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PokeballTop from '../../images/vectors/patterns/PokeballTop.png';

import { MainClient } from 'pokenode-ts';
import Navbar from './Navbar.js';
import SearchBar from './SearchBar.js';
import List from './List.js';
import globalStyles from '../../styles/globalStyles.js';

const Home = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [allPokemonData, setAllPokemonData] = useState([]);

// get data from the fake api endpoint
    useEffect(() => {
        var pokemonToAdd = [];
        const getAllPokemonNames = async () => {
            const api = new MainClient();
            await api.pokemon
                .listPokemons(1,5)
                .then((data) => {
                    const getAllPokemonData = async () => {                  
                        for (let i = 1; i < 800; i++){
                            await api.pokemon
                                .getPokemonById(i)
                                .then((data) => {
                                   // pokemonToAdd((pokemonToAdd) => ([...pokemonToAdd,data]));
                                   pokemonToAdd.push(data);
                                    // console.log(data);
                                })
                        } 
                        setAllPokemonData(pokemonToAdd);

                    } 
                    getAllPokemonData();
                })
        }  
        getAllPokemonNames();
        // console.log({allPokemonData});
    }, []);
   
    return (
        <View style={styles.container}>
            <Image style={styles.pokeballTop} source={PokeballTop} />
            <View style={styles.Home}> 
            <Navbar />
                <View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Pokédex</Text>
                        <Text style={styles.titleDescription}>Search for Pokémon by name or using the National Pokédex number.</Text>
                    </View>

                    <View style={styles.search}>
                        <SearchBar
                            searchPhrase={searchPhrase}
                            setSearchPhrase={setSearchPhrase}
                            clicked={clicked}
                            setClicked={setClicked}
                        />
                        <List 
                            searchPhrase={searchPhrase}
                            data={allPokemonData}
                            setClicked={setClicked}
                        />
                    </View>
                </View>
            </View>
        </View>

    );
};

export default Home;

const styles = StyleSheet.create({

    root: {
        boxSizing: 'border-box',
    },
  
    container: {
        padding: 0,
        margin: 0,
    },

    Home: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 40
    },

    pokeballTop: {
        position: 'absolute',
        width: '100%',
        overflow: 'visible',
        top: 0,
        margin: 0,
        padding: 0
    },

    title: {
      margin: 0,
    },
    
    titleText: {
        fontWeight: '700',
        fontSize: 32,
        color: globalStyles.textblack,
        margin: 0,
        marginBottom: 10,
    },
    
    titleDescription: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      color: globalStyles.textgrey,
      margin: 0,
    },
  })