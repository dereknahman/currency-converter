import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { ConversionContext } from "../util/ConversionContext";

const screen = Dimensions.get("window");

export default ({ navigation }) => {
  const [value, setValue] = useState("100");

  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
  } = useContext(ConversionContext);

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const conversionRate = rates[quoteCurrency];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push("Options")}>
          <Entypo name="cog" size={32} color={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/background.png")}
              style={styles.logoBackground}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}>Currency Converter</Text>
          <View style={styles.inputContainer}>
            <ConversionInput
              text={baseCurrency}
              value={value}
              onButtonPress={() =>
                navigation.push("CurrencyList", {
                  title: "Base Currency",
                  isBaseCurrency: true,
                })
              }
              keyboardType="numeric"
              onChangeText={(text) => setValue(text)}
            />
            <ConversionInput
              text={quoteCurrency}
              value={
                value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
              }
              editable={false}
              onButtonPress={() =>
                navigation.push("CurrencyList", {
                  title: "Quote Currency",
                  isBaseCurrency: false,
                })
              }
            />
          </View>
          <Text style={styles.text}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
              date && format(new Date(date), "MMM do, yyyy")
            }`}
          </Text>

          <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
          <KeyboardSpacer
            onToggle={(keyboardIsVisible) =>
              setScrollEnabled(keyboardIsVisible)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width / 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
});
