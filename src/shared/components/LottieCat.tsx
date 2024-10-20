import LottieView, { LottieViewProps } from "lottie-react-native";
import { Colors } from "../constants/colors";

export default function LottieCat({
  source,
  loop,
  ...otherProps
}: LottieViewProps) {
  return (
    <LottieView
      loop={loop}
      style={{
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: Colors.asterix.lottieBackground,
        alignSelf: "center",
        marginBottom: 44,
      }}
      source={source}
      {...otherProps}
    />
  );
}
