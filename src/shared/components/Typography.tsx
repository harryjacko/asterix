import styled from "styled-components/native";
import { Colors } from "../constants/colors";

type FontFamily = "OpenSansLight" | "OpenSans" | "OpenSansSemiBold";
interface TypographyProps {
  color?: string;
  fontFamily?: FontFamily;
}

export const Body1 = styled.Text<TypographyProps>`
  font-size: 20px;
  color: ${(p) => (p.color ? p.color : Colors.light.text)};
  font-family: ${(p) => (p.fontFamily ? p.fontFamily : "SpaceMono-Regular")};
`;

export const Body2 = styled.Text<TypographyProps>`
  font-size: 16px;
  color: ${(p) => (p.color ? p.color : Colors.light.text)};
  font-family: ${(p) => (p.fontFamily ? p.fontFamily : "SpaceMono-Regular")};
`;

export const H1 = styled.Text<TypographyProps>`
  font-size: 32px;
  color: ${(p) => (p.color ? p.color : Colors.light.text)};
  font-family: ${(p) => (p.fontFamily ? p.fontFamily : "SpaceMono-Regular")};
`;
export const H2 = styled.Text<TypographyProps>`
  font-size: 24px;
  color: ${(p) => (p.color ? p.color : Colors.light.text)};
  font-family: ${(p) => (p.fontFamily ? p.fontFamily : "SpaceMono-Regular")};
`;
