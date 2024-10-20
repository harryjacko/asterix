import { CatImageWithFavouritesAndVotes } from "@/domain/cats/types";
import { actions } from "@/domain/rootActions";
import { selectors } from "@/domain/rootSelectors";
import Button from "@/shared/components/Button";
import { Body2, H2 } from "@/shared/components/Typography";
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
  Pressable,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/shared/constants/colors";

const ImageCard = styled.View`
  width: 100%;
  background-color: ${Colors.asterix.background};
`;
const Page = styled.View`
  background-color: ${Colors.asterix.background};
  flex: 1;
`;
const Row = styled.View`
  flex-direction: row;
`;

const ImageCardFooter = styled.View`
  width: 100%;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding-horizontal: 24px;
  padding-vertical: 16px;
  height: 56px;
`;

const Spacer = styled.View`
  margin-right: 12px;
`;

const CARD_HEIGHT = Dimensions.get("window").height * 0.5;
const assets = {
  thumbup: require("../../assets/images/thumbup.png"),
  thumbdown: require("../../assets/images/thumbdown.png"),
  favourite: require("../../assets/images/favourite.png"),
  favouriteFilled: require("../../assets/images/favourite-fill.png"),
};

export default function IndexScreen() {
  const dispatch = useDispatch();
  const images = useSelector(selectors.cats.getImagesWithFavouritesAndVotes);
  const requestStatus = useSelector(selectors.cats.getFetchImagesRequestStatus);
  const votesRequestStatus = useSelector(
    selectors.cats.getFetchVotesRequestStatus,
  );
  const submitVoteRequestStatus = useSelector(
    selectors.cats.getSubmitVoteRequestStatus,
  );
  const createFavRequestStatus = useSelector(
    selectors.cats.getCreateFavouritesRequestStatus,
  );
  const removeFavRequestStatus = useSelector(
    selectors.cats.getRemoveFavouritesRequestStatus,
  );

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

  // TODO: Move to it's own component?
  const renderImageCard: ListRenderItem<CatImageWithFavouritesAndVotes> = ({
    item: image,
  }) => {
    const handleUpVote = () => {
      dispatch(
        actions.cats.submitVote.base({ imageId: image.id, value: "up" }),
      );
      Haptics.selectionAsync();
    };

    const handleDownVote = () => {
      Haptics.selectionAsync();
      dispatch(
        actions.cats.submitVote.base({ imageId: image.id, value: "down" }),
      );
    };

    const handleOnFavourite = () => {
      Haptics.selectionAsync();
      if (!image.favouriteId) {
        dispatch(actions.cats.createFavourite.base(image.id));
      } else {
        dispatch(
          actions.cats.removeFavourite.base({
            imageId: image.id,
            favouriteId: image.favouriteId,
          }),
        );
      }
    };

    const disableFavouriteButton =
      createFavRequestStatus === RequestStatus.Pending ||
      removeFavRequestStatus === RequestStatus.Pending;

    const votesLoading =
      votesRequestStatus === RequestStatus.Pending ||
      submitVoteRequestStatus === RequestStatus.Pending;

    return (
      <ImageCard>
        <Image
          style={{ width: "100%", height: CARD_HEIGHT, resizeMode: "cover" }}
          source={{ uri: image.url }}
        />
        <ImageCardFooter>
          <Row>
            <Pressable
              onPress={handleUpVote}
              hitSlop={8}
              disabled={votesLoading}>
              <Image source={assets.thumbup} />
            </Pressable>
            <Spacer />
            <Pressable
              onPress={handleDownVote}
              hitSlop={8}
              disabled={votesLoading}>
              <Image source={assets.thumbdown} />
            </Pressable>
            <Spacer />
            <Body2>
              {votesLoading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                `${image.voteTotal} `
              )}
              votes
            </Body2>
          </Row>
          <Pressable
            onPress={handleOnFavourite}
            hitSlop={8}
            disabled={disableFavouriteButton}>
            <Image
              source={
                !!image.favouriteId ? assets.favouriteFilled : assets.favourite
              }
            />
          </Pressable>
        </ImageCardFooter>
      </ImageCard>
    );
  };

  const renderEmptyState = () => {
    if (requestStatus === RequestStatus.Pending) {
      return (
        <ActivityIndicator
          size={"large"}
          color={Colors.asterix.altBackground}
        />
      );
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
            onRefresh={refreshData}
            colors={[Colors.asterix.altBackground]} // Android
            tintColor={Colors.asterix.altBackground} // iOS
          />
        }
      />
    </Page>
  );
}
