import React, { useState, useEffect, startTransition } from 'react';
import { TouchableOpacity, ScrollView, Dimensions, StatusBar, Image, View, TextInput, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import PokeballTop from '../../images/vectors/patterns/PokeballTop.png';
import TypeBadge from '../Home/TypeBadge';
import globalStyles from '../../styles/globalStyles.js';
import GradientNameText from '../GradientNameText';
import Pokeball from '../../images/vectors/patterns/PokeballTab.png';
import DotsSixByThree from '../../images/vectors/patterns/6x3.png';
import Circle from '../../images/vectors/patterns/Circle.png';
import Back from '../../images/vectors/icons/Back.png';
import { Languages, MainClient } from 'pokenode-ts';
import StatsTable from './StatsTable';

const ProfileDataLine = (props) => {
    return (
        <Text style={styles.boxAbout}>
            <View style={styles.boxAboutTagContainer}>
            <Text style={styles.boxAboutTag}>{props.tag}</Text></View>
            <Text style={styles.boxAboutData}>{props.data}</Text>
        </Text>
    )
}

export default ProfileDataLine;

const styles = StyleSheet.create({
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

})