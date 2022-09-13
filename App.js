import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Data from './src/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const App = () => {
  const [myData, setmyData] = useState(Data);
  const deleteItems = useCallback(
    id => {
      const newDeletedData = myData.map(item => {
        item.id == id ? (item.isDelete = true) : null;
        return {...item};
      });
      setmyData(newDeletedData);
    },
    [myData],
  );

  const OnSelectedItems = id => {
    const newDeletedData = myData.map(item => {
      item.id == id ? (item.isSelected = !item.isSelected) : null;
      return {...item};
    });
    setmyData(newDeletedData);
  };

  const onDeleteSelectedValue = () => {
    const newDeletedData = myData.map(item => {
      if (item.isSelected) {
        item.isDelete = true;
        item.isSelected = false;
      }
      return {...item};
    });
    setmyData(newDeletedData);
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          backgroundColor: item.isSelected ? '#ceee' : '#EECC',
        }}>
        <View style={{width: '5%'}}>
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            {item.id}
          </Text>
        </View>

        <View style={{width: '25%'}}>
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            {item.name}
          </Text>
        </View>
        <View style={{width: '25%'}}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            {item.email}
          </Text>
        </View>
        <View style={{width: '25%'}}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            {item.role}
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center', alignItems: 'center', width: '20%'}}
          onPress={() => {
            deleteItems(item.id);
          }}>
          {/* <MaterialIcons name="delete" size={24} color="red" /> */}
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            isChecked={item.isSelected == true ? true : false}
            // text="Custom Checkbox"
            iconStyle={{borderColor: 'red'}}
            innerIconStyle={{borderWidth: 2}}
            // textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={(isChecked, index) => {
              OnSelectedItems(item.id);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'flex-start'}}>
      <ImageBackground>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={myData.filter((item, index) => item.isDelete != true)}
          renderItem={renderItem}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{...styles.heading, width: '5%'}}>
                  <Text>ID</Text>
                </View>
                <View style={styles.heading}>
                  <Text>Name</Text>
                </View>

                <View style={styles.heading}>
                  <Text>Email</Text>
                </View>

                <View style={styles.heading}>
                  <Text>Roll</Text>
                </View>
                <View style={styles.heading}>
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="black"
                    onPress={() => onDeleteSelectedValue()}
                  />
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  zIndex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 20,
                    marginHorizontal: 5,
                    borderRadius: 25,
                    backgroundColor: 'green',
                  }}>
                  <AntDesign name="left" size={10} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 20,
                    borderRadius: 25,
                    backgroundColor: 'green',
                  }}>
                  <AntDesign name="right" size={10} color="white" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  heading: {
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  textStyle: {
    textAlign: 'center',
  },
});
