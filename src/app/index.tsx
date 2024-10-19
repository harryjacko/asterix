import { CatImage } from "@/domain/cats/types";
import { actions } from "@/domain/rootActions";
import { selectors } from "@/domain/rootSelectors";
import Button from "@/shared/components/Button";
import { H2 } from "@/shared/components/Typography";
import { useMountEffect } from "@/shared/hooks/useMountEffect";
import { RequestStatus } from "@/shared/libs/apiClient";
import { router } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const ImageCard = styled.View`
  width: 100%;
  padding-bottom: 56px;
  background-color: #211f15;
`;
const Page = styled.View`
  background-color: #211f15;
  flex: 1;
`;

const CARD_HEIGHT = Dimensions.get("window").height * 0.5;

export default function IndexScreen() {
  const dispatch = useDispatch();
  const images = useSelector(selectors.cats.getImages);
  const requestStatus = useSelector(selectors.cats.getFetchImagesRequestStatus);

  useMountEffect(() => {
    dispatch(actions.cats.fetchImages.base());
  });

  const handleOnUploadPress = useCallback(() => {
    router.push("/upload");
  }, []);

  const handleOnRefresh = useCallback(() => {
    dispatch(actions.cats.fetchImages.base());
  }, [dispatch]);

  const imageCardKeyExtractor = (image: CatImage) => image.id;

  const renderImageCard: ListRenderItem<CatImage> = ({ item: image }) => {
    return (
      <ImageCard>
        <Image
          style={{ width: "100%", height: CARD_HEIGHT, resizeMode: "cover" }}
          source={{ uri: image.url }}
        />
      </ImageCard>
    );
  };

  const renderEmptyState = () => {
    if (requestStatus === RequestStatus.Pending) {
      return <ActivityIndicator size={"large"} color={"#FFEA8B"} />;
    }
    return (
      <>
        <H2>You don't have any cats..</H2>
      </>
    );
  };

  return (
    <Page>
      <Button onPress={handleOnUploadPress} title="Upload" />

      <FlatList
        data={images}
        renderItem={renderImageCard}
        ListEmptyComponent={renderEmptyState}
        keyExtractor={imageCardKeyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={requestStatus === RequestStatus.Pending}
            onRefresh={handleOnRefresh}
            colors={["#FFEA8B"]} // Android
            tintColor={"#FFEA8B"} // iOS
          />
        }
      />
    </Page>
  );
}
