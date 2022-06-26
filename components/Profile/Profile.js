import React, { useState, useEffect, startTransition } from 'react';
import { TouchableOpacity, Dimensions, StatusBar, Image, View, TextInput, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import PokeballTop from '../../images/vectors/patterns/PokeballTop.png';
import TypeBadge from '../Home/TypeBadge';
import globalStyles from '../../styles/globalStyles.js';
import GradientNameText from '../GradientNameText';
import Pokeball from '../../images/vectors/patterns/PokeballTab.png';
import DotsSixByThree from '../../images/vectors/patterns/6x3.png';
import Circle from '../../images/vectors/patterns/Circle.png';
import Back from '../../images/vectors/icons/Back.png';

const Profile = (props) => {
    const [tab, setTab] = useState("About");

    console.log(props.mon);
    function formatId(id) {
        var num = '' + id;
        while (num.length < 3){
            num = '0' + num;
        }
        num = '#'+num;
        return num;
    }


    
    return (
        <View style={[styles.container, {backgroundColor: globalStyles["backgroundtype"+props.mon.types[0].type.name]}]}>
            <TouchableOpacity style={styles.backArrowTouchable} activeOpacity = { .8 } onPress={() => (props.setPokemonProfile(''))}>
                <Image style={styles.backArrow} source={Back}/>
            </TouchableOpacity>
            <View style={styles.pokemonTitleContainerContainer}>
                <View style={styles.pokemonTitleContainer}>
                    <GradientNameText style={styles.pokemonTitle} color={globalStyles["backgroundtype"+props.mon.types[0].type.name]} name={props.mon.name}/>
                </View>
            </View>
            <View style={styles.Profile}> 
                <View style={styles.top}>
                    <View style={styles.topImage}>
                        <Image style={styles.circle} source={Circle}/>      
                        <Image onError={(e) => console.log(e.nativeEvent.error) } style={styles.sprite} source={{uri:`${props.mon.sprites.other["official-artwork"].front_default}`}} />
                    </View>
                    <View style={styles.cardData}>
                        <Text style={styles.cardId}>{formatId(props.mon.id)}</Text>
                        <Text style={styles.cardName}>{props.mon.name}</Text>
                        <View style={styles.cardTypes}>
                            <TypeBadge type={props.mon.types[0].type.name} />
                                    {props.mon.types.length === 2 && 
                                    <TypeBadge type={props.mon.types[1].type.name} />
                                    }
                        </View>
                    </View>
                </View>  
                <View style={styles.tabs}>
                    
                    <TouchableOpacity activeOpacity = { .8 } onPress={() => (setTab("About"))}>
                    <View style={styles.tab}>
                        {tab === "About"
                            ?  <><Image style={styles.tabPokeball} source={Pokeball} />
                                 <Text style={styles.tabActive}>About</Text></>
                            :  <Text style={styles.tabInactive}>About</Text>
                        }
                          </View>
                    </TouchableOpacity>
                  

                    <TouchableOpacity activeOpacity = { .8 } onPress={() => (setTab("Stats"))}>
                        <View style={styles.tab}>
                    {tab === "Stats"
                            ?      <><Image style={styles.tabPokeball} source={Pokeball} />
                                 <Text style={styles.tabActive}>Stats</Text></>
                            :  <Text style={styles.tabInactive}>Stats</Text>
                        }
                        </View>
                    </TouchableOpacity>
           
                    
                    <TouchableOpacity activeOpacity = { .8 } onPress={() => (setTab("Evolution"))}>
                    <View style={styles.tab}>
                    {tab === "Evolution"
                    
                            ?  <><Image style={styles.tabPokeball} source={Pokeball} />
                            <Text style={styles.tabActive}>Evolution</Text></>
                            :  <Text style={styles.tabInactive}>Evolution</Text>
                        }
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.box}>
                <View style={styles.boxContent}>
                    <Text style={styles.aboutDesc}>I AM A BOX!</Text>
                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({

    root: {
        boxSizing: 'border-box',
    },
  
    container: {
        padding: 0,
        margin: 0,
        width: '100%',
        backgroundColor: globalStyles.backgroundtypenormal,
        paddingTop: StatusBar.currentHeight,
    },

    backArrowTouchable: {
        position: 'absolute',
        top: 42.5,
        left: 42.5,
        height: 20,
        width: 20
    },
    backArrow: {
        height: 20,
        width: 20
    },

    pokemonTitleContainer: {
        position: 'absolute',
        top: 50,
        left:0,
        height: 120,
        width: Dimensions.get('window').width,
    },

    pokemonTitle: {
        position: 'relative',
        textTransform: 'capitalize',
        fontWeight: '700',
        fontSize: 100,
        alignSelf: 'center',
        color: 'rgba(255, 255, 255, 1.0)',
        fontFamily: 'Outline'
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

    Profile: {
      display: 'flex',
      flexDirection: 'column',

      marginHorizontal: 40,
      marginTop: 110
    },
    
    top: {
        display: 'flex',
        flexDirection: 'row',
        height: 155,
        width: 'auto',
        padding: 0,
    },

    topImage: {
        width: 125,
        height: 125,
        marginRight: 25
    },

    circle: {
        position: 'absolute',
        top:0,
        left:0,
        height: 125,
        width: 125,

      },
  
      dotsSixByThree: {
        position: 'absolute',
        top: 5,
        left: 90,
        height: 32,
        width: 74
      },
  
      sprite: {
        position: 'absolute',
        top:0,
        left:0,
        height: 125,
        width: 125
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
      color: globalStyles.textgrey,
      margin: 0,
    },

    cardData: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 125,
        margin: 0
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

      tabs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
        alignItems: 'center',
      },
      tab:{
        display: 'flex',
        alignItems: 'center',
        height: 50,
        width: 50
      },

      tabActive: {
        color: globalStyles.textwhite,
        fontSize: 16,
        fontWeight: '700',
        paddingTop: 16
      },

      tabInactive: {
        color: globalStyles.textwhite,
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 16
      },

      tabPokeball: {
        position: 'absolute',
        height: 100,
        width: 100
      },
      box: {
        height: 400,
        backgroundColor:  globalStyles.backgroundwhite,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      },

      boxContent: {
        marginHorizontal: 40,
        marginTop: 40
      }
  })