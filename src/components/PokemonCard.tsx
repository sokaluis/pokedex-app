/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimplePokemon } from "../interfaces/pokemon";
import { FadeInImage } from "./FadeImage";
import { useImageColor } from "../hooks/useImageColor";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/core";

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get("window").width;

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name, url } = pokemon;
  const { bgColor } = useImageColor({ url });
  const { dispatch } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        dispatch(
          CommonActions.navigate("PokemonScreen", { pokemon, color: bgColor })
        )
      }
    >
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor ?? "#FFF",
          width: windowWidth * 0.4,
        }}
      >
        <Text style={{ ...styles.name }}>{name}</Text>
        <Text style={{ ...styles.name }}>{`#${id}`}</Text>
        <View style={{ ...styles.pokeballImageContainer }}>
          <Image
            source={require("../assets/pokebola-blanca.png")}
            style={styles.pokeballImage}
          />
        </View>
        <FadeInImage uri={url} style={{ ...styles.fadeImage }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    textTransform: "capitalize",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    left: 10,
  },
  pokeballImageContainer: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    overflow: "hidden",
  },
  pokeballImage: {
    width: 100,
    height: 100,
    opacity: 0.5,
    position: "absolute",
    right: -20,
    bottom: -20,
  },
  fadeImage: {
    width: 100,
    height: 100,
    position: "absolute",
    right: -6,
    bottom: -8,
  },
});
