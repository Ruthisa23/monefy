import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Category from "../../../domain/entities/categorys";
import React from 'react';

type CardProps = {
    category : Category,
}

export default function CategoryCard (props : CardProps) {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={{ ...styles.cardContainer}}>
   
                <View style={styles.cardContent}>
                    <View style={styles.cardInfo}>
                    <Text style={styles.info}>Id: {props.category.id}</Text>
                    <Text style={styles.info}>Nombre: {props.category.name}</Text>
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
        height:150,
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
        fontSize: 20,
        color: "#FFFFFF"
    },

    cardInfo: {
        padding: 8,
        marginTop: 19,
       
    },

    info: {
        marginBottom: 10,
        textAlign: "center",
        color: 'white',
        fontSize: 20,
    }
})