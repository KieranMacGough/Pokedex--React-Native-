import React, { useState, useEffect, startTransition } from 'react';
import { StatusBar, Image, View, TextInput, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import PokeballTop from '../../images/vectors/patterns/PokeballTop.png';

import { MainClient } from 'pokenode-ts';
import Navbar from './Navbar.js';
import SearchBar from './SearchBar.js';
import List from './List.js';
import Options from './Options.js';
import globalStyles from '../../styles/globalStyles.js';

const Home = (props) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    // const [allPokemonData, setAllPokemonData] = useState([]);
    const [homeOption, setHomeOption] = useState('');

// // get data from the fake api endpoint
//     useEffect(() => {
//         var pokemonToAdd = [];
//         const getAllPokemonNames = async () => {
//             const api = new MainClient();
//             await api.pokemon
//                 .listPokemons(1,5)
//                 .then((data) => {
//                     const getAllPokemonData = async () => {                  
//                         for (let i = 1; i < 30; i++){
//                             await api.pokemon
//                                 .getPokemonById(i)
//                                 .then((data) => {
//                                    // pokemonToAdd((pokemonToAdd) => ([...pokemonToAdd,data]));
//                                    pokemonToAdd.push(data);
//                                     // console.log(data);
//                                 })
//                         } 
//                         setAllPokemonData(pokemonToAdd);

//                     } 
//                     getAllPokemonData();
//                 })
//         }  
//         getAllPokemonNames();
//         // console.log({allPokemonData});
//     }, []);

    useEffect(() => {
        console.log("Home option is now %s", homeOption);
    }, [homeOption]);
    return (
        <>
        <Image style={styles.pokeballTop} source={PokeballTop} />
        <View style={styles.container}>
            <View style={styles.Home}> 
                <View>
                    <View>
                     <Navbar style={styles.Navbar} setHomeOption={setHomeOption} />
                    </View>
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
                            setSearchPhrase={setSearchPhrase}
                            data={props.allPokemonData}
                            setClicked={setClicked}
                            setPokemonProfile={props.setPokemonProfile}
                            allPokemonData={props.allPokemonData}
                        />
                        {/* <Options /> */}
                    </View>
                </View>

            </View>
        </View>
        </>

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

    Navbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 2.5,
        marginRight: 2.5,
        marginBottom: 37.5,
        height: 30,
      },

    Home: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 40
    },

    pokeballTop: {
        position: 'absolute',
        top: StatusBar.currentHeight,
        left: 0,
        width: Dimensions.get('window').width,
        height: Math.round(Dimensions.get('window').width) * (207 / 414),
    },

    title: {
      margin: 0,
      padding: 0
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