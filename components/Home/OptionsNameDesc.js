import React, { useState, useEffect, startTransition } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const Options = (props) => {
    const { height } = Dimensions.get("window");

    const sort = {
        title: "Sort",
        desc: "Sort Pokémons alphabetically or by National Pokédex number!"
    }

    const generations = {
        title: "Generations",
        desc: "Use search for generations to explore your Pokémon!"
    }

    const filter = {
        title: "Filters",
        desc: "Use advanced search to explore Pokémon by type, weakness, height and more!"
    }

    useEffect(() => {
        console.log("Options loaded as %s", props.option);
        // props.option != '' ? this._panel.show() : this._panel.hide()
    }, [props.option])

    const defaultProps = {
        draggableRange: { top: height + 180 - 64, bottom: 180 }
      };
    
    const _draggedValue = new Animated.Value(180);
    return (
        <>
            {props.option != '' &&
            
            <SlidingUpPanel 
                style={styles.SlideUp} 
                ref={c => this._panel = c}
                snappingPoints={[360]}
                height={height + 180}
                friction={0.5}
            >
                <View>
                    <Text>HELLO</Text>
                    <Text>WORLD</Text>
                </View>
                </SlidingUpPanel>
            }
            </>
    )
}
export default Options;

const styles = StyleSheet.create({
SlideUp: {
    backgroundColor: 'red'
},

container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center"
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: 180,
    backgroundColor: "#b197fc",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
  },
  iconBg: {
    backgroundColor: "#2b8a3e",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1
  }
})
