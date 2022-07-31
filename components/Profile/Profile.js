import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Dimensions, StatusBar, Image, View, Text, StyleSheet } from 'react-native';
import TypeBadge from '../Home/TypeBadge';
import globalStyles from '../../styles/globalStyles.js';
import GradientNameText from '../GradientNameText';
import DotsSixByThree from '../../images/vectors/patterns/6x3.png';
import Circle from '../../images/vectors/patterns/Circle.png';
import Back from '../../images/vectors/icons/Back.png';
import { MainClient, EvolutionClient } from 'pokenode-ts';
import StatsTable from './StatsTable';
import DataLine from './DataLine';
import Tab from './Tab';
import Evolution from './Evolution';

const Profile = (props) => {
  const [tab, setTab] = useState("About");
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState([]);
  const [species, setSpecies] = useState('Unknown');
  const [weight, setWeight] = useState('Unknown');
  const [height, setHeight] = useState('Unknown');
  const [growthRate, setGrowthRate] = useState('Unknown');
  const [catchRate, setCatchRate] = useState('Unknown');
  const [eggCycles, setEggCycles] = useState('Unknown');
  const [pokedexEntry, setPokedexEntry] = useState('Unknown');
  const [eggGroups, setEggGroups] = useState([]);
  const [evolutionChainId, setEvolutionChainId] = useState();
  const [evolutionChainData, setEvolutionChainData] = useState();

  function cmToFtInches(num) {
    const realFeet = ((num * 0.393700) / 12);
    const feet = Math.floor(realFeet);
    let inches = (Math.round(10 * ((realFeet - feet) * 12)) / 10).toFixed(0);
    inches = inches.toString().padStart(2, '0');
    return feet + "\'" + inches + "\""
  }

  useEffect(() => {
    const getPokemonSpeciesData = async () => {
      setWeight(props.mon.weight / 10 + 'kg (' + (props.mon.weight / 10 * 2.20462).toFixed(1) + ' lbs)')
      setHeight(props.mon.height / 10 + 'm (' + cmToFtInches(props.mon.height * 10) + ')')
      const api = new MainClient();
      await api.pokemon
        .getPokemonSpeciesById(props.mon.id)
        .then((data) => {
          setPokemonSpeciesData(data);
          setGrowthRate(data.growth_rate.name.replace(/\-/g, " "));
          setCatchRate(data.capture_rate);
          setEggCycles(data.hatch_counter + ' (' + (data.hatch_counter * 255).toLocaleString('en-US') + '-' + (data.hatch_counter * 257).toLocaleString('en-US') + ' steps)');
          for (let i = 0; i < data.genera.length; i++) {
            if (data.flavor_text_entries[i].language.name === 'en') {
              setPokedexEntry(data.flavor_text_entries[i].flavor_text.replace(/[\n\f]/g, ' '));
            }
          }

          for (let i = 0; i < data.genera.length; i++) {
            if (data.genera[i].language.name === 'en') {
              setSpecies(data.genera[i].genus);
            }
          }
          setEggGroups(data.egg_groups.map(x => (x.name)))

          // Get Evolution Data
          const urlPath = data.evolution_chain.url;
          setEvolutionChainId(urlPath.substring(urlPath.indexOf('chain/') + 6).slice(0, -1));
        })
    }
    getPokemonSpeciesData();
  }, []);

  useEffect(() => {
    const getEvolutionChainData = async () => {
    if (evolutionChainId != null) {
      console.log(evolutionChainId);
        const api = new EvolutionClient();
        await api
          .getEvolutionChainById(evolutionChainId)
          .then((data) => {
            setEvolutionChainData(data);
          })
      }
    }
    getEvolutionChainData();
  }, [evolutionChainId]);

  // console.log(props);
  // console.log(pokemonSpeciesData);
  // console.log(growthRate);
  // console.log(pokedexEntry);
  // console.log(props.mon);
  function formatId(id) {
    var num = '' + id;
    while (num.length < 3) {
      num = '0' + num;
    }
    num = '#' + num;
    return num;
  }



  return (
    <ScrollView style={[styles.container, { backgroundColor: globalStyles["backgroundtype" + props.mon.types[0].type.name] }]}>
      <TouchableOpacity style={styles.backArrowTouchable} activeOpacity={.8} onPress={() => (props.setPokemonProfile(''))}>
        <Image style={styles.backArrow} source={Back} />
      </TouchableOpacity>
      <View style={styles.pokemonTitleContainerContainer}>
        <View style={styles.pokemonTitleContainer}>
          <GradientNameText style={styles.pokemonTitle} color={globalStyles["backgroundtype" + props.mon.types[0].type.name]} name={props.mon.species.name} />
        </View>
      </View>
      <View style={styles.Profile}>
        <View style={styles.top}>
          <View style={styles.topImage}>
            <Image style={styles.circle} source={Circle} />
            <Image onError={(e) => console.log(e.nativeEvent.error)} style={styles.sprite} source={{ uri: `${props.mon.sprites.other["official-artwork"].front_default}` }} />
          </View>
          <View style={styles.cardData}>
            <Text style={styles.cardId}>{formatId(props.mon.id)}</Text>
            <Text style={styles.cardName}>{props.mon.species.name}</Text>
            <View style={styles.cardTypes}>
              <TypeBadge type={props.mon.types[0].type.name} />
              {props.mon.types.length === 2 &&
                <TypeBadge type={props.mon.types[1].type.name} />
              }
            </View>
          </View>
        </View>
        <View style={styles.tabs}>
          <Tab tab={tab} setTab={setTab} name="About" />
          <Tab tab={tab} setTab={setTab} name="Stats" />
          <Tab tab={tab} setTab={setTab} name="Evolution" />
        </View>

      </View>
      <View style={styles.box}>
        {tab === "About" &&
          <View style={styles.boxContent}>
            {/* TODO: Fix Pokedex Entry language to be English on all. Eg. 746 Wishiwashi is Japanese*/}
            <Text style={styles.boxPokedexEntry}>{pokedexEntry}</Text>

            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Pokédex Data</Text>
            <DataLine tag={"Species"} data={species} />
            <DataLine tag={"Height"} data={height} />
            <DataLine tag={"Weight"} data={weight} />
            <DataLine tag={"Abilities"} data={''} />
            <DataLine tag={"Weaknesses"} data={''} />

            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Training</Text>
            <DataLine tag={"EV Yield"} data={''} />
            <DataLine tag={"Catch Rate"} data={catchRate} />
            <DataLine tag={"Base Friendship"} data={pokemonSpeciesData.base_happiness} />
            <DataLine tag={"Base Exp"} data={props.mon.base_experience} />
            <DataLine tag={"Growth Rate"} data={growthRate} />

            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Breeding</Text>
            <DataLine tag={"Egg Groups"} data={eggGroups.join(", ")} />
            <DataLine tag={"Egg Cycles"} data={eggCycles} />

            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Location</Text>
            <View style={{ height: 10 }}></View>
          </View>
        }
        {tab === "Stats" &&
          <View style={styles.boxContent}>
            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Base Stats</Text>
            <View style={styles.statGrid}>
              <StatsTable stats={props.mon.stats} type={props.mon.types[0].type.name} />
            </View>
            <Text style={styles.statsExplained}>The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs</Text>
            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Type Defences</Text>
            <View style={{ height: 10 }}></View>
          </View>
        }
        {tab === "Evolution" &&
          <View style={styles.boxContent}>
            <Text style={[styles.boxTitle, { color: globalStyles["type" + props.mon.types[0].type.name] }]}>Evolution Chart</Text>
            <Evolution evolutionChainData={evolutionChainData} />
            <View style={{ height: 10 }}></View>
          </View>
        }

      </View>

    </ScrollView>
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
    width: 20,
    zIndex: 1
  },

  backArrow: {
    height: 20,
    width: 20
  },

  pokemonTitleContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
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

  Profile: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 40,
    marginTop: 55
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    height: 155,
    padding: 0,
    justifyContent: 'center'
  },

  topImage: {
    width: 125,
    height: 125,
    marginRight: 25
  },

  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 125,
    width: 125,
  },

  //   dotsSixByThree: {
  //     position: 'absolute',
  //     top: 5,
  //     left: 90,
  //     height: 32,
  //     width: 74
  //   },

  sprite: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 125,
    width: 125
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

  tabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    alignItems: 'center',
  },

  box: {
    flexGrow: 1,
    backgroundColor: globalStyles.backgroundwhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  boxContent: {
    marginHorizontal: 40,
    marginTop: 40,
    flexGrow: 0
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: globalStyles.typenormal,
    marginBottom: 22.5
  },

  boxPokedexEntry: {
    fontSize: 16,
    fontWeight: '400',
    color: globalStyles.textgrey,
    marginBottom: 30,
  },

  boxAbout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  boxAboutTagContainer: {
    width: 85
  },
  boxAboutTag: {
    fontSize: 12,
    fontWeight: '500',
    color: globalStyles.textblack,
  },

  boxAboutData: {
    fontSize: 16,
    fontWeight: '400',
    color: globalStyles.textgrey,
    textTransform: 'capitalize',
  },

  statsExplained: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 20,
    color: globalStyles.textgrey
  },

  statGrid: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
  },

})