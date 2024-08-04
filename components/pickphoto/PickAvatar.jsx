import { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';

export default function PickAvatar({ userId, editMode }) {
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState({});

  async function currentAvatar() {
    const avatar = await supabase.from('profiles').select('avatar_path').eq('id', userId);
    console.log(avatar)
    setImagePath(avatar.data[0].avatar_path);

    const { data, error } = await supabase.storage
      .from("user_avatars") // Replace with your bucket name
      .getPublicUrl(avatar.data[0].avatar_path);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setImage(data.publicUrl);
    }
  }

  useEffect(() => {
    currentAvatar();
  }, []);

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
      .from("user_avatars")
      .upload(path, arraybuffer, {
        contentType: "image/jpeg",
      });

      const deletePreviousImage = await supabase
      .storage
      .from('user_avatars')
      .remove([imagePath]);

    const image = await supabase
      .from("profiles")
      .update({ avatar_path: data.path })
      .eq("id", userId);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
    } else {
      console.log("Image uploaded:", data);
      console.log("Image deleted:", deletePreviousImage);
      setImagePath(data.path);
    }
  };

  console.log(image);

  return (
    <View>
      {editMode ? (
        <Pressable onPress={pickImage}>
          {image ? (
            <Avatar.Image
              source={{
                uri: image !== null ? image : "https://picsum.photos/700",
              }}
              size={100}
            />
          ) : (
            <Avatar.Icon size={100} icon="account" />
          )}
          {/* <Icon  name="pencil-outline" size={50} color="black" style={styles.icon}/> */}
        </Pressable>
      ) : (
        <Avatar.Image
          source={{ uri: image !== null ? image : "https://picsum.photos/700" }}
          size={100}
        />
      )}
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
    width: Dimensions.get('window').width * 0.9,
    height: 300,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});