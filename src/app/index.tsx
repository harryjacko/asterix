import { CatImageWithFavouritesAndVotes } from "@/domain/cats/types";
import { actions } from "@/domain/rootActions";
import { selectors } from "@/domain/rootSelectors";
import { FloatingActionButton } from "@/shared/components/Button";
import { useMountEffect } from "@/shared/hooks/useMountEffect";
import { RequestStatus } from "@/shared/libs/apiClient";
import { router } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { Colors } from "@/shared/constants/colors";
import { Body1, H1 } from "@/shared/components/Typography";
import LottieCat from "@/shared/components/LottieCat";
import Space from "@/shared/components/Space";
import CatCard from "@/shared/components/CatCard";

const Page = styled.View`
  background-color: ${Colors.asterix.background};
  flex: 1;
`;

const EmptyContainer = styled.View`
  padding-top: 56px;
  padding-horizontal: 40px;
`;

const assets = {
  lottieNoCats: require("../../assets/lotties/nocats.json"),
};

export default function IndexScreen() {
  const dispatch = useDispatch();
  const images = useSelector(selectors.cats.getImagesWithFavouritesAndVotes);
  const requestStatus = useSelector(selectors.cats.getFetchImagesRequestStatus);

  useMountEffect(() => {
    refreshData();
  });

  const handleOnUploadPress = useCallback(() => {
    router.push("/upload");
  }, []);

  const refreshData = useCallback(() => {
    dispatch(actions.cats.fetchImages.base());
    dispatch(actions.cats.fetchFavourites.base());
    dispatch(actions.cats.fetchVotes.base());
  }, [dispatch]);

  const imageCardKeyExtractor = (image: CatImageWithFavouritesAndVotes) =>
    image.id;

  const renderImageCard: ListRenderItem<CatImageWithFavouritesAndVotes> = ({
    item: image,
  }) => {
    return (
      <>
        <CatCard image={image} />
      </>
    );
  };

  const renderEmptyState = () => {
    if (requestStatus === RequestStatus.Pending) {
      return (
        <EmptyContainer>
          <ActivityIndicator
            size={"large"}
            color={Colors.asterix.altBackground}
          />
        </EmptyContainer>
      );
    }
    return (
      <EmptyContainer>
        <LottieCat autoPlay loop={false} source={assets.lottieNoCats} />
        <H1>Where are all the cats?</H1>
        <Space verticaloffset={2} />
        <Body1>Upload a picture of your furry friend!</Body1>
      </EmptyContainer>
    );
  };

  return (
    <Page>
      <FlatList
        data={images}
        renderItem={renderImageCard}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ paddingBottom: 89 }}
        keyExtractor={imageCardKeyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={requestStatus === RequestStatus.Pending}
            onRefresh={refreshData}
            colors={[Colors.asterix.altBackground]} // Android
            tintColor={Colors.asterix.altBackground} // iOS
          />
        }
      />
      <FloatingActionButton
        onPress={handleOnUploadPress}
        title="＋"
        testId="uploadFAB"
      />
    </Page>
  );
}
