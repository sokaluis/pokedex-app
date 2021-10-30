/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceValue } from '../hooks/useDebounceValue';

interface Props {
  onDebounce: (value: string) => void;
  styles?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ onDebounce, styles: inputStyles }: Props) => {
  const [textValue, setTextValue] = useState('');
  const { debounceValue } = useDebounceValue(textValue);

  useEffect(() => {
    onDebounce(debounceValue);
  }, [debounceValue]);

  return (
    <View style={[inputStyles, { ...styles.container }]}>
      <View style={{ ...styles.textBackground }}>
        <TextInput
          placeholder="Search your Pokemon"
          style={{ ...styles.textInput }}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={value => setTextValue(value)}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: Platform.OS === 'ios' ? 0 : 5,
  },
});
