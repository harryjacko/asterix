import { useCallback, useEffect } from "react";
import Button from "@/shared/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/domain/rootActions";
import { selectors } from "@/domain/rootSelectors";
import { usePrevious } from "@/shared/hooks/usePrevious";
import { RequestStatus } from "@/shared/libs/apiClient";
import { router } from "expo-router";
import { Body1, Body2, H1 } from "@/shared/components/Typography";
import styled from "styled-components/native";
import { Colors } from "@/shared/constants/colors";
import LottieCat from "@/shared/components/LottieCat";
import Space from "@/shared/components/Space";

const Page = styled.View`
  background-color: ${Colors.asterix.background};
  flex: 1;
  padding-top: 56px;
  padding-horizontal: 40px;
`;

const assets = {
  lottieUploadCats: require("../../assets/lotties/uploadcats.json"),
  lottieLoadingCats: require("../../assets/lotties/loadingcats.json"),
};

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

  if (requestStatus === RequestStatus.Pending) {
    return (
      <Page>
        <LottieCat autoPlay source={assets.lottieLoadingCats} />
        <H1>Hold tight</H1>
        <Space verticaloffset={2} />
        <Body1>Just a moment while we paws for upload!</Body1>
      </Page>
    );
  }

  return (
    <Page>
      <LottieCat autoPlay source={assets.lottieUploadCats} />
      <H1>Upload a picture of your cat</H1>
      <Space verticaloffset={2} />

      <Body1>
        Upload a picture of your feline friend and let the voting begin!
      </Body1>
      <Space verticaloffset={2} />

      <Space verticaloffset={2} />

      <Button title="Choose photo" onPress={handleChoosePhotoPress} />
      {requestStatus === RequestStatus.Failed && (
        <>
          <Space verticaloffset={2} />

          <Body2>Oh no! Something went wrong, try adding your cat again.</Body2>
        </>
      )}
    </Page>
  );
}
