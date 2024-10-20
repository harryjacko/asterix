import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import { Body2, H2 } from "./Typography";

const ButtonView = styled.TouchableOpacity`
  background-color: ${Colors.asterix.altBackground};
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
const FABView = styled.TouchableOpacity`
  background-color: ${Colors.asterix.altBackground};
  height: 56px;
  width: 56px;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 56px;
  bottom: 26px;
  right: 26px;
  elevation: 1;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
`;

interface Props {
  title: string;
  onPress?: () => void;
  testId?: string;
}

export default function Button({ title, onPress }: Props) {
  return (
    <ButtonView onPress={onPress} activeOpacity={0.5}>
      <Body2 color={Colors.asterix.altText}>{title}</Body2>
    </ButtonView>
  );
}

export function FloatingActionButton({ title, onPress, testId }: Props) {
  return (
    <FABView onPress={onPress} activeOpacity={0.5} testID={testId} id={testId}>
      <H2 color={Colors.asterix.altText}>{title}</H2>
    </FABView>
  );
}
