import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native'
import { Text, TextInput, Button } from 'react-native-paper'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [viewPassword, setViewPassword] = useState(false)

  const navigation = useNavigation()

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setLoading(false);
      Alert.alert(error.message);
    }
    else {
      setLoading(false);
      setEmail("");
      setPassword("");
      navigation.navigate("LoggedIn", { screen: "UserDash" });
    }
    

    

    
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={{ fontSize: 18 }}>Email</Text>
        <TextInput
          left={
            <TextInput.Icon
              icon="email"
            />
          }
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          activeUnderlineColor='#1d62d1'
          underlineColor='#1d62d1'
          style={{ backgroundColor: "transparent" }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={{ fontSize: 18 }}>Password</Text>
        <TextInput
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setViewPassword(!viewPassword)}
            />
          }
          left={
            <TextInput.Icon
              icon="lock"
            />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!viewPassword}
          placeholder="••••••••"
          placeholderTextColor={"grey"}
          autoCapitalize={"none"}
          activeUnderlineColor='#1d62d1'
          underlineColor='#1d62d1'
          style={{ backgroundColor: "transparent" }}
          
        />
      </View>
      <Button
        mode="contained"
        loading={loading}
        onPress={() => signInWithEmail()}
        style={{ marginTop: 20, backgroundColor: '#1d62d1' }}
      >
        {loading? "Logging In" : "Log In"}
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Button
          mode="text"
          disabled={loading}
          onPress={() => navigation.navigate("Signup")}
          style={{ flex: 1, marginRight: 8 }}
          textColor='#1d62d1'
        >
          Sign Up
        </Button>
        <Button
          mode="text"
          disabled={loading}
          onPress={() => navigation.navigate("Forgot Password")}
          style={{ flex: 1, marginLeft: 8,  }}
          textColor='#1d62d1'
        >
          Forgot Password?
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 6,
    paddingBottom: 6,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})