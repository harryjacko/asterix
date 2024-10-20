import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import { Body1 } from "./Typography";

const ButtonView = styled.TouchableOpacity`
  background-color: ${Colors.asterix.altBackground};
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

interface Props {
  title: string;
  onPress?: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <ButtonView onPress={onPress} activeOpacity={0.5}>
      <Body1 color={Colors.asterix.altText}>{title}</Body1>
    </ButtonView>
  );
}
