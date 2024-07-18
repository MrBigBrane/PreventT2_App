import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton } from 'react-native-paper';

export default function PickPhoto({ classData, backgroundUri }) {
  const [image, setImage] = useState(backgroundUri ? backgroundUri : null);
  const [imagePath, setImagePath] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await uploadImageToSupabase(uri);
    }
  };

  const uploadImageToSupabase = async (uri) => {
    const arraybuffer = await fetch(uri).then((res) => res.arrayBuffer());

    const fileExt = uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from("class_backgrounds")
      .upload(path, arraybuffer, {
        contentType: "image/jpeg",
      });

      const deletePreviousImage = await supabase
      .storage
      .from('class_backgrounds')
      .remove([imagePath]);

    const image = await supabase
      .from("coach_codes")
      .update({ background_picture_path: data.path })
      .eq("code", classData.code);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
    } else {
      console.log("Image uploaded:", data);
      console.log("Image deleted:", deletePreviousImage);
      setImagePath(data.path);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        {image && <Image source={{ uri: image !== null ? image : 'https://picsum.photos/700' }} style={styles.image} />}
        <IconButton icon="pencil-outline" iconColor='aqua' containerColor='teal' onPress={pickImage} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 300,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: "10%"
  }
});