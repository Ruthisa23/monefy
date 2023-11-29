import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList  } from 'react-native';
import { AddCategoryProvider, useAddCategoryState } from '../../providers/addSavingProvider';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const AddCategoryModal = ({ isVisible, closeModal, updateCategories }) => {

  const { loading, saving, category, setCategoryProp, saveCategory} = useAddCategoryState();
  
  const handleSaveCategory = async () => {
    try {
    await saveCategory();
    updateCategories(); // Actualizar la lista de categorías
    closeModal();
    
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      console.log("Respuesta del servidor:", error.response);
  
      if (typeof error.response === 'string') {
        console.log("Respuesta del servidor (no JSON):", error.response);
      } else {
        throw error;
      }
    }
  };
  

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.info}>Registrar Categoria</Text>

        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Escribe aqui"
              placeholderTextColor="#808080"
              value={category?.name || ''}
              onChangeText={(text) => {
                setCategoryProp('name', text);
              }}
              textContentType="name"
            />
          </View>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity onPress={() => handleSaveCategory()}>
            <Button style={styles.button} buttonColor='#f45572' >
                  <Icon name="check" size={20} color="white" /> 
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal}> 
            <Button style={styles.button} buttonColor='#6a9eda'>
                <Icon name="close" size={20} color="white" /> 
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AddCategoryScreen = (props: any) => (
  <AddCategoryProvider>
    <AddCategoryModal {...props} />
  </AddCategoryProvider>
);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
},
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
},
button: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8

},
info: {
    marginBottom: 2,
        textAlign: "center",
        color: 'black',
        fontSize: 16,
},
inputView: {
  width: "80%",
  marginTop: 10,
  backgroundColor: "#fff", // Fondo blanco
  borderRadius: 10,
  height: 50,
  justifyContent: "center",
  padding: 15, // Reducido el relleno
  shadowColor: "#000", // Sombra
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // Sombra para plataformas Android
},
inputText: {
  textAlign: 'center',
  alignContent: 'center',
  height: 50,
  color: "#333", // Texto oscuro
},

});


export default AddCategoryScreen;
