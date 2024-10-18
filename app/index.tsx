import Button from "@/shared/components/Button";
import { Link, router } from "expo-router";
import { useCallback } from "react";

export default function IndexScreen() {
  const handleOnUploadPress = useCallback(() => {
    router.push("/upload");
  }, []);

  return (
    <>
      <Button onPress={handleOnUploadPress} title="Upload" />
    </>
  );
}
