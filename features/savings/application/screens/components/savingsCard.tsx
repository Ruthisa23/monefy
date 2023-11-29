import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Cambia MaterialIcons por el conjunto de íconos que desees usar


import { getNextColor } from '../../../../../components/colors';
import backendConfig from "../../../../../config/backend/config";

import Saving from '../../../domain/entities/savings';
import EditSavingScreen from './savingEditModal';
import ConfirmationModal from '../../../../../components/modal';


type CardProps = {
    saving : Saving,
    onEdit?: Function,
}


const SavingCard: React.FC<CardProps> = ({
    saving,
    onEdit,
}) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleE, setModalVisibleE] = useState(false);

    const [deleted, setDeleted, ] = useState(false);

    const [currentColor, setCurrentColor] = useState(getNextColor());

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModalEdit = () => {
        setModalVisibleE(!isModalVisibleE);
    };

    const handleEdit = () => {
      //toggleModalEdit();
        if(onEdit){
            onEdit(saving);
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteC(saving.id);
            // Cierra el modal después de la eliminación
            toggleModal();
        } catch (error) {
            // Manejar cualquier error que ocurra durante la eliminación
        }
    }

    const deleteC = async (id:any) => {
      
        return fetch (`${backendConfig.url}/api/savings?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
         })
         .then((response) => response.json())
         .then((response) => {
            console.log(response);

        setDeleted(true);
    
        return response;
            
         });
    
    };

    useEffect(() => {
        setCurrentColor(getNextColor()); // Actualiza el color al montar el componente
    }, []); // Asegura que esto se ejecute solo una vez al montar

    // Verificar si la categoría se ha eliminado
    if (deleted) {
    // Puedes mostrar un mensaje o hacer cualquier otra acción aquí
        return null;
    }

    return (

            <View style={styles.container}>
            
                <TouchableOpacity style={{ ...styles.cardContainer, backgroundColor: currentColor}}>
           
                    <View>
                        <View style={styles.cardInfo}>
                        <Text style={styles.info}>Id: {saving.id}</Text>
                        <Text style={styles.info}>Descripcion: {saving.description}</Text>
                        <Text style={styles.info}>Monto: {saving.acount}</Text>
                        </View>
            
                    </View> 
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    
                    <Button style={styles.button} buttonColor='#6a9eda' onPress={handleEdit}>
                        <Icon name="refresh" size={20} color="white" /> 
                    </Button>

                    <Button style={styles.button} buttonColor='#f45572' onPress={() => toggleModal()}>
                        <Icon name="delete" size={20} color="white" />
                    </Button>
                    <ConfirmationModal
                        isVisible={isModalVisible}
                        onAccept={confirmDelete}
                        onCancel={toggleModal}
                    />
                </View>
            </View>
        
    );
}

export default SavingCard;


const styles = StyleSheet.create({

    container: {  

        display:'flex',
        height:'auto',
        width:'auto',
        
    },
    
    cardContainer: {

        padding: 8,
        borderRadius: 14,
        border: 1,
        width:144,
        minHeight: 110,
        overflow: "hidden",
        margin: 8
    },

    cardInfo: {
        padding: 8
       
    },

    info: {
        marginBottom: 2,
        textAlign: "center",
        color: 'black',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        width: 'auto',
        marginLeft: 8,
        marginRight: 8

    }
})
