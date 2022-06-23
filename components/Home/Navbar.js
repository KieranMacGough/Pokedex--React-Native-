import React, { useState, useEffect, startTransition } from 'react';
import { StatusBar, Image, ScrollView, View, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import generation from '../../images/vectors/icons/Generation.png';
import sort from '../../images/vectors/icons/Sort.png';
import filter from '../../images/vectors/icons/Filter.png';

const Navbar = () => {

    return (
    <View style={styles.container}>
        <Image style={styles.navGeneration} source={generation} alt="generation" onClick={() => setHomeOptions('generation')} />
        <Image style={styles.navSort} source={sort} alt="sort" onClick={() => setHomeOptions('sort')} />
        <Image style={styles.navFilter} source={filter} alt="filter" onClick={() => setHomeOptions('filter')} />
    </View>
    )
}

export default Navbar;

const styles = StyleSheet.create({
    container: {
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
        height: '100%',
        marginRight: 20,
      },
      
      navSort: {
        marginRight: 20,
      },
      
      navFilter: {
      },
})