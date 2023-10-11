import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Character from "../../../domain/entities/character";

type CardProps = {
    character : Character,
}

export default function CharacterCard (props : CardProps) {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.cardContainer}>
                <Image
                    source={{ uri: props.character.image }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{props.character.name}</Text>
                    <View style={styles.cardInfo}>
                    <Text style={styles.info}>Status: {props.character.status}</Text>
                    <Text style={styles.info}>Gender: {props.character.gender}</Text>
                    <Text style={styles.info}>Origin: {props.character.gender}</Text>
                    <Text style={styles.info}>Specie: {props.character.gender}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        padding: 5,
        paddingHorizontal:2,
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
    },
    cardContainer: {
        backgroundColor: "black",
        padding: 8,
        borderRadius: 14,
        border: 1,
        width:300,
        height:500,
        overflow: "hidden",
        margin: 8
    },

    cardImage: {
        borderRadius: 5,
        width: 282,
        height: 200,
        position: "relative",
        objectFit: "cover",
        margin: 0
    },

    cardContent: {
        marginLeft: 10,
    },

    cardTitle: {
        textAlign: "center",
        fontSize: 30,
        color: "#FFFFFF"
    },

    cardInfo: {
        padding: 8,
        marginTop: 19,
       
    },

    info: {
        marginBottom: 10,
        textAlign: "center",
        color: 'grey',
        fontSize: 30,
    }
})