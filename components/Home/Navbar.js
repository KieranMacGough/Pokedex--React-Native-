import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import generation from '../../images/vectors/icons/Generation.png';
import sort from '../../images/vectors/icons/Sort.png';
import filter from '../../images/vectors/icons/Filter.png';

export default function Navbar (props) {

    return (
    <View style={styles.navbar}>
        <TouchableOpacity activeOpacity = { .8 } onPress={() => props.setHomeOption('generation')}>
          <Image style={styles.navGeneration} source={generation} alt="generation" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity = { .8 } onPress={() => props.setHomeOption('sort')}>
          <Image style={styles.navSort} source={sort} alt="sort" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity = { .8 } onPress={() => props.setHomeOption('filter')}>
          <Image style={styles.navFilter} source={filter} alt="filter"  />
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2.5,
    marginRight: 2.5,
    marginBottom: 37.5,
    height: 30,
  },
      
      navGeneration: {
        height: 25,
        width: 25,
        marginRight: 20,
      },
      
      navSort: {
        height: 25,
        width: 25,
        marginRight: 20,
      },
      
      navFilter: {
        height: 25,
        width: 25,
      },
})