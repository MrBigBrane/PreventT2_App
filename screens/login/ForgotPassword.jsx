import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { supabase } from "../../lib/supabase";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function sendForgotPasswordEmail() {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: "https://nrivadpp.vercel.app/auth/callback",
        }
      );

      if (error) {
        console.log(error)
      } else {
        console.log(data)
        Alert.alert('Please check your email for a link to reset your password');
        setLoading(false);
      }
    }

    
    

    return (
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Text style={{ fontSize: 18 }}>Enter Account Email</Text>
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
        <Button
          mode="contained"
          loading={loading}
          onPress={() => sendForgotPasswordEmail()}
          style={{ marginTop: 20, backgroundColor: "#1d62d1" }}
        >
          {loading ? "Sending..." : "Submit"}
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