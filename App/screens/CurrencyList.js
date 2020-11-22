import React from "react";
import {
  StatusBar,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";
import currencies from "../data/currencies.json";
import { RowItem, RowSeparator } from "../components/RowItem";
import { Entypo } from "@expo/vector-icons";

export default ({ navigation, route = {} }) => {
  const params = route.params || {};

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: colors.white }}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => {
            const selected = params.activeCurrency === item;
            return (
              <RowItem
                text={item}
                onPress={() => {
                  params.onChange && params.onChange(item);
                  navigation.pop();
                }}
                rightIcon={
                  selected && (
                    <View style={styles.icon}>
                      <Entypo name="check" size={20} color={colors.white} />
                    </View>
                  )
                }
              />
            );
          }}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <RowSeparator />}
          ListFooterComponent={() => <RowSeparator />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    backgroundColor: colors.blue,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
