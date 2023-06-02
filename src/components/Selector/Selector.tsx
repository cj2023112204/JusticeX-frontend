import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const data = [
  { label: '行政管理', value: '1' },
  { label: '金融與保險', value: '2' },
  { label: '商務與市場推廣', value: '3' },
  { label: '客戶服務與支援', value: '4' },
  { label: '專案管理與諮詢', value: '5' },
  { label: '技術與工程', value: '6' },
  { label: '生產與製造', value: '7' },
  { label: '物流與供應鏈', value: '8' },
  { label: '品質與安全', value: '9' },
  { label: '醫療與健康', value: '10' },
  { label: '軍警消防', value: '11' },
  { label: '教師', value: '12' },
  { label: '法律相關', value: '13' },
];

const Selector = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  

  return (
    <View style={styles.container}>
      
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? '職業類型' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    width:'100%',
    marginVertical: '5',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default Selector