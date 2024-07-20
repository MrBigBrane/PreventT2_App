import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NewDropdownList = ({ data, setSelected, onSelected, title, defaultValue }) => {

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem);
          console.log(selectedItem);
        }}
        // defaultValueByIndex={8} // use default value by index or default value
        defaultValue={defaultValue} // use default value by index or default value
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdown2ButtonStyle}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdown2ButtonIconStyle}
                />
              )}
              <Text style={styles.dropdown2ButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || title}
              </Text>
              <Icon
                name={isOpen ? "chevron-up" : "chevron-down"}
                style={styles.dropdown2ButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdown2ItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Icon name={item.icon} style={styles.dropdown2ItemIconStyle} />
              <Text style={styles.dropdown2ItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdown2MenuStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NewDropdownList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // marginBottom: 50,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 1.135,
  },
  dropdownButtonStyle: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 150,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdown2ButtonStyle: {
    width: '80%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B1BDC8',
  },
  dropdown2ButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdown2ButtonArrowStyle: {
    fontSize: 28,
  },
  dropdown2ButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdown2MenuStyle: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  dropdown2ItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdown2ItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdown2ItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});