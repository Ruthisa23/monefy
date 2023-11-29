import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryCard from './components/categorysCard';

import { CategorysProvider, useCategorysState } from '../providers/CategorysProvider';

import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Cambia MaterialIcons por el conjunto de íconos que desees usar


import AddCategoryScreen from './components/addCategoryScreen';


import EditCategoryScreen from './components/categoryEditModal';

const CategorysScreenView = () => {

  const { 
    categorys,
    loading,
    categorySelected,

    //actions
    getCategorys,
    setCategorySelected,
    onUpdateCategory,
   } = useCategorysState();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderCards = () => {
    if(!categorys)
    {
      return null;
    }
    
    return categorys?.map((category) => (
      <CategoryCard 
      key={`category${category.id}`} 
      category={category} 
      onEdit={setCategorySelected}
      />
      )
    );
  }

  useEffect(() => {
    getCategorys();
  }, []);

    return (
    <ScrollView>

    <View style={styles.buttonContainer}>
      <Button style={styles.button} buttonColor='#6a9eda' mode="contained" onPress={toggleModal}>
          <Icon name="add" size={25} color="white" />
      </Button>
    </View>
   
      <View style={styles.container}>
      
      {renderCards()}

    
      </View>
      
      <AddCategoryScreen 
      isVisible={isModalVisible} 
      closeModal={toggleModal}
      />

      {!!categorySelected ? (

        <EditCategoryScreen
        categoryEdit={categorySelected}
        isVisible={!!categorySelected}
        onSaved={onUpdateCategory}
        closeModal={setCategorySelected}
        />

      ) : null }
      
      
  
    </ScrollView>
  );
}

const CategorysScreen = (props: any) => (
  <CategorysProvider>
    <CategorysScreenView {...props} /> 
  </CategorysProvider>
)

export default CategorysScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection:'row'
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: 'auto',
    height: 70,
    justifyContent:'center'

  }

});