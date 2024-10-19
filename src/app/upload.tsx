import { useCallback, useEffect } from "react";
import Button from "@/shared/components/Button";
import { Body2, H1, H2 } from "@/shared/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/domain/rootActions";
import { selectors } from "@/domain/rootSelectors";
import { usePrevious } from "@/shared/hooks/usePrevious";
import { RequestStatus } from "@/shared/libs/apiClient";
import { router } from "expo-router";

export default function UploadScreen() {
  const dispatch = useDispatch();
  const requestStatus = useSelector(selectors.cats.getUploadRequestStatus);
  const prevRequestStatus = usePrevious(requestStatus);

  const handleChoosePhotoPress = useCallback(() => {
    dispatch(actions.cats.selectAndUploadCatPhoto.base());
  }, [dispatch]);

  useEffect(() => {
    if (
      requestStatus === RequestStatus.Fulfilled &&
      prevRequestStatus === RequestStatus.Pending
    ) {
      router.dismiss();
    }
  }, [requestStatus, prevRequestStatus]);

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
      <H2>{requestStatus}</H2>
    </>
  );
}
