import React, { useState, useEffect } from 'react';
import { PokemonClient } from 'pokenode-ts';
import TypeBadge from './TypeBadge';
import {ReactComponent as Pokeball} from '../images/vectors/patterns/Pokeball.svg';
import {ReactComponent as SixByThree} from '../images/vectors/patterns/6x3.svg'

export default function HomePokeCard(props) {
    const P = new PokemonClient();
    const [pokemon, setPokemon] = useState('');
    const [formattedId, setFormattedId] = useState('');

    useEffect(() => {
        searchPokemon(props.name);
     }, [])

    const searchPokemon = async (name) => {
        console.log("Attempt Search");
        P.getPokemonByName([name]) // with Promise
            .then((response) => {
                setPokemon(response);
                setFormattedId(formatId(response[0].id));
            // console.log("Pokemon is set to " + response[0].name);
            })
            .catch((error) => {
                console.log('There was an ERROR: ', error);
            });
    }

    function formatId(id) {
        var num = '' + id;
        while (num.length < 3){
            num = '0' + num;
        }
        num = '#'+num;
        return num;
    }
    return (
        <View className="HomePokeCard">
        {pokemon !== "" && 
            <View className="card" style={{backgroundColor: "var(--background-type-"+pokemon[0].types[0].type.name+")",   boxShadow: "0px 10px 20px var(--background-type-"+pokemon[0].types[0].type.name+")"}}>
            <View className="card-pokeball">
                <Pokeball fill='url(#Gradient)' width='145px' height='145px' />
            </View>
            <View className="card-sixbythree">
                <SixByThree fill='url(#Gradient)' width='74px' height='32px' />
            </View>
            <Image className="card-Image" source={pokemon[0].sprites.other["official-artwork"].front_default} />
            
            <View className="card-data">
                <Text className="card-id">{formattedId}</Text>
                <Text className="card-name">{pokemon[0].name}</Text>
                <View className="card-types">
                    <TypeBadge type={pokemon[0].types[0].type.name} />
                    {pokemon[0].types.length === 2 && 
                    <TypeBadge type={pokemon[0].types[1].type.name} />
                    }
                </View>
            </View>
            
        </View>
        }
        {/* {pokemon === "" && <Text></Text>} */}
    </View>
    )
}