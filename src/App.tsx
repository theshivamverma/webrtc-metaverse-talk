/* eslint-disable */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import {
  useHMSActions,
  HMSRoomProvider,
  HMSLogLevel,
} from "@100mslive/react-sdk";
import { RemotePlayers, CubePlayer } from "./player";
import { Keyboard } from "./utils";
import { WelcomeScreen } from "./components";
import { useStore } from "./store";

import "./App.css";

function Ground() {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={"lightgreen"} />
    </mesh>
  );
}

export default function App() {
  const { playerName, playerColor, enterStatus } = useStore((state) => {
    return {
      playerName: state.playerName,
      playerColor: state.playerColor,
      enterStatus: state.enterStatus,
    };
  });

  const hmsActions = useHMSActions();
  hmsActions.setLogLevel(HMSLogLevel.NONE);

  hmsActions.join({
    authToken: process.env.REACT_APP_HMS_AUTH_TOKEN,
    userName: playerName,
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({
      posX: 0,
      posY: 0,
      posZ: 0,
      playerColor,
    }),
  });

  return enterStatus ? (
    <Canvas>
      <HMSRoomProvider>
        <Sky />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <CubePlayer posX={0} posY={0} posZ={0} />
        {/* @ts-ignore */}
        <RemotePlayers />
        <Ground />
        <Keyboard />
      </HMSRoomProvider>
    </Canvas>
  ) : (
    <WelcomeScreen />
  );
}
