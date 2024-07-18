import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../../lib/supabase";

export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('')

    async function signUpWithEmail() {
        if(password !== passwordConfirm) {
            Alert.alert('Passwords do not match')
            return
        }
        else if(password.length < 6) {
            Alert.alert('Password must be at least 6 characters')
            return
        }
        else {
            setLoading(true);
            const {
              data: { session },
              error,
            } = await supabase.auth.signUp({
              email: email,
              password: password,
              options: {
                data: {
                  name: `${firstName} ${lastName}`,
                },
              },
            });

            if (error) Alert.alert(error.message);
            else if (!session) {
              Alert.alert("Please check your inbox for email verification!");
            }
            setLoading(false);
        }
        
      }

    return (
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Text style={{ fontSize: 18 }}>First Name</Text>
          <TextInput
            left={<TextInput.Icon icon="face-man" />}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholder="John"
            autoCapitalize={"none"}
            activeUnderlineColor="#1d62d1"
            underlineColor="#1d62d1"
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Text style={{ fontSize: 18 }}>Last Name</Text>
          <TextInput
            left={<TextInput.Icon icon="face-man" />}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder="Doe"
            autoCapitalize={"none"}
            activeUnderlineColor="#1d62d1"
            underlineColor="#1d62d1"
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Text style={{ fontSize: 18 }}>Email</Text>
          <TextInput
            left={<TextInput.Icon icon="email" />}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            activeUnderlineColor="#1d62d1"
            underlineColor="#1d62d1"
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
            left={<TextInput.Icon icon="lock" />}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!viewPassword}
            placeholder="••••••••"
            placeholderTextColor={"grey"}
            autoCapitalize={"none"}
            activeUnderlineColor="#1d62d1"
            underlineColor="#1d62d1"
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Text style={{ fontSize: 18 }}>Confirm Password</Text>
          <TextInput
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setViewPassword(!viewPassword)}
              />
            }
            left={<TextInput.Icon icon="lock" />}
            onChangeText={(text) => setPasswordConfirm(text)}
            value={passwordConfirm}
            secureTextEntry={!viewPassword}
            placeholder="••••••••"
            placeholderTextColor={"grey"}
            autoCapitalize={"none"}
            activeUnderlineColor="#1d62d1"
            underlineColor="#1d62d1"
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => signUpWithEmail()}
          style={{ marginTop: 20, backgroundColor: "#1d62d1" }}
        >
          {loading ? "Signing Up" : "Sign Up"}
        </Button>
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