import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";

import Button from "@/shared/components/Button";
import { Body2, H1 } from "@/shared/components/Typography";

export default function UploadScreen() {
  // TODO: Move from UI
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
  };

  const handleChoosePhotoPress = useCallback(() => {
    //
    pickImage();
  }, []);

  return (
    <>
      <H1>Add your cat!</H1>
      <Body2>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi totam
        sequi alias ducimus nam expedita, voluptates laudantium perspiciatis
        incidunt. Dignissimos commodi deserunt quisquam recusandae enim
        repudiandae earum ab amet aut!
      </Body2>
      <Button title="Choose photo" onPress={handleChoosePhotoPress} />
    </>
  );
}
