import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StatusBar, Image, View, TextInput, Text, StyleSheet, ActivityIndicator, Dimensions, Button } from 'react-native';
import PokeballTop from '../../images/vectors/patterns/PokeballTop.png';
import { MainClient } from 'pokenode-ts';
import Navbar from './Navbar.js';
import SearchBar from './SearchBar.js';
import List from './List.js';
import Options from './Options.js';
import globalStyles from '../../styles/globalStyles.js';
import Animated from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Generations from "./Drawer/Generations.js";
import Filters from "./Drawer/Filters.js";

const Home = (props) => {
    const [clicked, setClicked] = useState(false);
    const [drawerOption, setDrawerOption] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [bottomSheetPosition, setBottomSheetPosition] = useState(-1);

    useEffect(() => {
        if (props.allPokemonData) {
            let _filteredData = []

            _filteredData = props.allPokemonData.filter((item) => {

                if (
                    // Search Term 
                    (item.name.includes(props.searchPhrase.toLowerCase().trim().replace(/\s/g))
                        || item.types[0].type.name.includes(props.searchPhrase.toLowerCase().trim().replace(/\s/g))
                        || (item.types[1] ? item.types[1].type.name.includes(props.searchPhrase.toLowerCase().trim().replace(/\s/g)) : '')
                        || (item.id + '').includes(props.searchPhrase.toLowerCase().trim().replace(/\s/g)))
                    &&
                    //Filter by Generation
                    (item.id >= 1 && item.id <= 151 && props.generationFilters[0]
                        || item.id >= 152 && item.id <= 251 && props.generationFilters[1]
                        || item.id >= 252 && item.id <= 386 && props.generationFilters[2]
                        || item.id >= 387 && item.id <= 493 && props.generationFilters[3]
                        || item.id >= 494 && item.id <= 649 && props.generationFilters[4]
                        || item.id >= 650 && item.id <= 721 && props.generationFilters[5]
                        || item.id >= 722 && item.id <= 809 && props.generationFilters[6]
                        || item.id >= 810 && item.id <= 905 && props.generationFilters[7]
                        || props.generationFilters.every(element => element === false))
                        && 
                    //Filter by type
                    (props.typeFilters[item.types[0].type.name] 
                        || (item.types[1] && props.typeFilters[item.types[1].type.name]) 
                        || Object.values(props.typeFilters).every(value => !value))
                    &&
                    //Filter by range
                    (item.id >= props.rangeFilter[0] && item.id <= props.rangeFilter[1])
                ) return item
            })
            setFilteredData(_filteredData)
        }
    }, [props.searchPhrase, props.generationFilters, props.allPokemonData, props.typeFilters, props.rangeFilter])


    useEffect(() => {
        console.log("Drawer option is now", drawerOption);
        if (drawerOption != "") {
            bottomSheetRef.current.snapToIndex(0);
        }
    }, [drawerOption]);

    useEffect(() => {
        console.log("Try close backdrop!");
        bottomSheetRef.current.close();
        bottomSheetRef.current.snapToIndex(-1);
    }, [])

    // refs
    const bottomSheetRef = useRef(null);
    const pokemonListRef = useRef(null)

    // variables
    const snapPoints = useMemo(() => ['50%', '95%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        setBottomSheetPosition(index);
        if (index == -1) {
            setDrawerOption("");
            setIsDrawerVisible(false);
        }
        if (index >= 0) {
            setIsDrawerVisible(true);
        }
        console.log('handleSheetChanges', index);

    }, []);

    // renders
    const renderBackdrop = useCallback(
        props => (
            // https://gorhom.github.io/react-native-bottom-sheet/components/bottomsheetbackdrop
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );


    return (
        <>
            <Image style={styles.pokeballTop} source={PokeballTop} />
            <View style={styles.container}>
                <View style={styles.Home}>
                    <View>
                        <View>
                            <Navbar
                                style={styles.Navbar}
                                setDrawerOption={setDrawerOption}
                            />
                        </View>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>Pokédex</Text>
                            <Text style={styles.titleDescription}>Search for Pokémon by name or using the National Pokédex number.</Text>
                        </View>

                        <View style={styles.search}>
                            <SearchBar
                                searchPhrase={props.searchPhrase}
                                setSearchPhrase={props.setSearchPhrase}
                                clicked={clicked}
                                setClicked={setClicked}
                            />
                            <List
                                pokemonListRef={pokemonListRef}
                                loading={props.loading}
                                searchPhrase={props.searchPhrase}
                                setSearchPhrase={props.setSearchPhrase}
                                setClicked={setClicked}
                                setPokemonProfile={props.setPokemonProfile}
                                filteredData={filteredData}
                            />
                            {/* <Options /> */}
                        </View>
                    </View>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                >
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.bottomSheetContent}>
                            {drawerOption == "generation" &&
                                <Generations
                                pokemonListRef={pokemonListRef}
                                    bottomSheetRef={bottomSheetRef}
                                    generationFilters={props.generationFilters}
                                    setGenerationFilters={props.setGenerationFilters}
                                />
                            }
                            {drawerOption == 'sort' &&
                                <Text>THIS IS THE SORT DRAWER!</Text>
                            }
                            {drawerOption == 'filter' &&
                                <Filters 
                                pokemonListRef={pokemonListRef}
                                    bottomSheetRef={bottomSheetRef}
                                    typeFilters={props.typeFilters}
                                    setTypeFilters={props.setTypeFilters}
                                    rangeFilter={props.rangeFilter}
                                    setRangeFilter={props.setRangeFilter}
                                />
                            }
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
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

    bottomSheetContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: globalStyles.backgroundwhite,
    },

    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
    }
})