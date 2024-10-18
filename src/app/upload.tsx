import { useCallback } from "react";
import Button from "@/shared/components/Button";
import { Body2, H1 } from "@/shared/components/Typography";
import { useDispatch } from "react-redux";
import { actions } from "@/domain/rootActions";

export default function UploadScreen() {
  const dispatch = useDispatch();

  const handleChoosePhotoPress = useCallback(() => {
    dispatch(actions.cats.selectAndUploadCatPhoto.base());
  }, [dispatch]);

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
