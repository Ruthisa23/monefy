import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryCard from './components/categorysCard';
import { CategorysProvider, useCategorysState } from '../providers/CategorysProvider';


const CategorysScreenView = () => {
  const {

    categorys,
    loading,
    
    getCategorys

  } = useCategorysState();
 

  const renderCards = () => {
    if(!categorys)
    {
      return null;
    }
    console.log(categorys);
    
    return categorys?.map((category) => (<CategoryCard key={`category${category.id}`} category={category} />
    ));
  }

  useEffect(() => {
    getCategorys();
  }, []);

    return (
    <ScrollView>
      <Text style={styles.count}>Categories</Text>
      {renderCards()}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  }
});