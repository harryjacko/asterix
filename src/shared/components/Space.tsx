import styled from "styled-components/native";

const DEFAULT_SCALE_FACTOR = 8;

const Container = styled.View<{
  verticalOffset: number;
  horizontalOffset: number;
}>`
  margin-bottom: ${(p) => p.verticalOffset * DEFAULT_SCALE_FACTOR}px;
  margin-right: ${(p) => p.horizontalOffset * DEFAULT_SCALE_FACTOR}px;
  pointer-events: none;
`;

interface Props {
  verticaloffset?: number;
  horizontaloffset?: number;
}

export default function Space(props: Props) {
  return (
    <Container
      verticalOffset={props.verticaloffset ?? 0}
      horizontalOffset={props.horizontaloffset ?? 0}
    />
  );
}
