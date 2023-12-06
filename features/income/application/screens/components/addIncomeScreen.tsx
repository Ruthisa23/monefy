import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AddSavingProvider, useAddSavingState } from '../../providers/addIncomeProvider';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import backendConfig from '../../../../../config/backend/config';
import UsersResult from '../../../domain/entities/usersResult';
import User from '../../../domain/entities/users';

import SelectDropdown from 'react-native-select-dropdown';
import CategorysResult from '../../../domain/entities/categoryResult';
import Category from '../../../domain/entities/category';


const AddSavingModal = ({ isVisible, closeModal }) => {

  const { loading, saving, setSavingProp, saveSaving} = useAddSavingState();

  const [users, setUsers] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResult = await getUsers();
        setUsers(usersResult.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const getUsers = async () => {
    return fetch(`${backendConfig.url}/api/users`)
      .then((response) => response.json())
      .then((response) => {
        if (!response) {
          return new UsersResult([]);
        }
        const user = response.map((item) => new User(item.name, item.id));
        return new UsersResult(user);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categorysResult = await getCategorys();
        setCategorys(categorysResult.category);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const getCategorys = async () => {
    return fetch(`${backendConfig.url}/api/category`)
      .then((response) => response.json())
      .then((response) => {
        if (!response) {
          return new CategorysResult([]);
        }
        const category = response.map((item) => new Category(item.name, item.id));
        return new CategorysResult(category);
      });
  };

  
  const handleSaveSaving = async () => {
    try {
    await saveSaving();
    //updateSaving(); // Actualizar la lista de categorías
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
        <Text style={styles.info2}>Concepto</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Escribe aqui"
              placeholderTextColor="#808080"
              value={saving?.description || ''}
              onChangeText={(text) => {
                setSavingProp('description', text);
              }}
              textContentType="name"
            />
          </View>

          <Text style={styles.info2}>Concepto</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Escribe aqui"
              placeholderTextColor="#808080"
              value={saving?.acount || ''}
              onChangeText={(text) => {
                setSavingProp('acount', text);
              }}
              textContentType="name"
            />
          </View>

          <Text style={styles.info2}>Selecciona Categoria</Text>
          <View>
          <SelectDropdown
            data={categorys}
            onSelect={(selectedItem, index) => {
              if(selectedItem){
                setSavingProp('categoryId', selectedItem.id)
                console.log(selectedItem.id);
              } else {
                console.log("alerta de error, panal");  
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </View>

          <Text style={styles.info2}>Selecciona un Usuario</Text>
          <View>
          <View>
          <SelectDropdown
            data={users}
            onSelect={(selectedItem, index) => {
              if(selectedItem){
                setSavingProp('clientId', selectedItem.id)
                console.log(selectedItem.id);
              } else {
                console.log("alerta de error, panal");  
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </View>

          </View>



        <View style={styles.buttonContainer}>
          
          <TouchableOpacity onPress={() => handleSaveSaving()}>
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

const AddSavingScreen = (props: any) => (
  <AddSavingProvider>
    <AddSavingModal {...props} />
  </AddSavingProvider>
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
        padding: 20,
},
info2: {
  marginBottom: 2,
      textAlign: "center",
      color: 'black',
      fontSize: 15,
      padding: 5,
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
picker: {
  height: 10,
  width: 80,
},

});

export default AddSavingScreen;
