import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput,
} from 'react-native';
import Accordian from '../../../components/accordian';
import images from '../../constants/images';
import {fetchData} from './apis';
import styles from './styles';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const [data, setData] = useState([]);
  const getData = async () => {
    const dataToShow = await fetchData();
    setData(dataToShow);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderCategory = (colorCode, categoryName, servingSize) => {
    return (
      <View style={styles.category}>
        <View style={styles.categoryImageAndname}>
          <Image style={styles.image} source={images.dummyImage} />
          <Text style={{color: colorCode}}>{categoryName}</Text>
          {!!servingSize && <Text>({servingSize})</Text>}
        </View>
      </View>
    );
  };

  const [searchText, setSearchText] = useState('');
  const renderSearch = () => {
    return <TextInput onChangeText={setSearchText} style={styles.searchBox} />;
  };

  const searchTextInLower = searchText.toLowerCase();

  // Filter based on search
  const filteredData = data.filter(
    ({
      category: {categoryName = '', servingSize = '', subcategories = []} = {},
    }) => {
      // Check if available in sub category
      const isInSubCategories =
        subcategories.findIndex(({subCategoryname, items = []}) => {
          // Check if available in sub category items
          const isInCategoryItems =
            items.findIndex(
              (item) => item.toLowerCase().search(searchTextInLower) > -1,
            ) > -1;
          return (
            subCategoryname.toLowerCase().search(searchTextInLower) > -1 ||
            isInCategoryItems
          );
        }) > -1;
      // Check if available in category name and servig size
      return (
        categoryName.toLowerCase().search(searchTextInLower) > -1 ||
        servingSize.toLowerCase().search(searchTextInLower) > -1 ||
        isInSubCategories
      );
    },
  );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <SafeAreaView style={{flex: 1}}>
          {renderSearch()}
          <Text style={styles.heading}>Approved Foods List</Text>
          {filteredData.map(
            ({
              category: {
                colorCode,
                categoryName,
                servingSize,
                subcategories = [],
              } = {},
            }) => {
              return (
                <View style={styles.accordian}>
                  <Accordian
                    mainContent={renderCategory(
                      colorCode,
                      categoryName,
                      servingSize,
                    )}
                    childContent={subcategories.map(
                      ({subCategoryname, items = []}) => {
                        return (
                          <>
                            {!!subCategoryname && (
                              <Text
                                style={[
                                  styles.subCategoryName,
                                  {color: colorCode, marginBottom: 5},
                                ]}>
                                {subCategoryname}
                              </Text>
                            )}
                            {items.map((item) => (
                              <Text style={styles.subCategoryName}>{item}</Text>
                            ))}
                          </>
                        );
                      },
                    )}
                  />
                </View>
              );
            },
          )}
        </SafeAreaView>
      </Modal>

      {!modalVisible && (
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default Home;
