import { CatImageWithFavouritesAndVotes } from "@/domain/cats/types";
import { ActivityIndicator, Dimensions, Image, Pressable } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import Space from "./Space";
import { Body1 } from "./Typography";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/domain/rootActions";
import * as Haptics from "expo-haptics";
import { selectors } from "@/domain/rootSelectors";
import { RequestStatus } from "../libs/apiClient";
import { Image as ExpoImage } from "expo-image";

const CARD_HEIGHT = Dimensions.get("window").height * 0.5;

const ImageCard = styled.View`
  width: 100%;
  background-color: ${Colors.asterix.background};
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

const assets = {
  thumbup: require("../../../assets/images/thumbup.png"),
  thumbdown: require("../../../assets/images/thumbdown.png"),
  favourite: require("../../../assets/images/favourite.png"),
  favouriteFilled: require("../../../assets/images/favourite-fill.png"),
};

interface Props {
  image: CatImageWithFavouritesAndVotes;
}

export default function CatCard({ image }: Props) {
  const dispatch = useDispatch();
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

  const handleUpVote = () => {
    dispatch(actions.cats.submitVote.base({ imageId: image.id, value: "up" }));
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
      <ExpoImage
        style={{ width: "100%", height: CARD_HEIGHT }}
        contentFit="cover"
        source={{ uri: image.url }}
      />
      <ImageCardFooter>
        <Row>
          <Pressable onPress={handleUpVote} hitSlop={8} disabled={votesLoading}>
            <Image source={assets.thumbup} />
          </Pressable>
          <Space horizontaloffset={1.5} />
          <Pressable
            onPress={handleDownVote}
            hitSlop={8}
            disabled={votesLoading}>
            <Image source={assets.thumbdown} />
          </Pressable>
          <Space horizontaloffset={1.5} />
          <Body1>{image.voteTotal} votes</Body1>
          <Space horizontaloffset={1.5} />
          {!!votesLoading && <ActivityIndicator size={"small"} />}
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
}
