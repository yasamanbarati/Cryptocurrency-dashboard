import { useEffect } from "react";
import { initializeAppData } from "services/server/service";

export const Home = () => {
  useEffect(() => {
    initializeAppData();
  }, []);
  return <></>;
};
