import { useHMSStore, selectPeers } from "@100mslive/react-sdk";
import React from "react";

type RemotePlayerProps = JSX.IntrinsicAttributes & {
  posX: number;
  posY: number;
  posZ: number;
  color: string;
  name: string;
};

const RemotePlayer = (props: RemotePlayerProps) => {
  const { posX, posY, posZ, color, name } = props;
  // console.log("remote player re-rendered");
  // console.log(`RemotePlayer: ${name} re-rendered`);
  return (
    <mesh position={[posX, posY, posZ]} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const RemotePlayers = () => {
  const peersData = useHMSStore(selectPeers);

  if (peersData && peersData.length > 0) {
    return peersData
      .filter((peer) => !peer.isLocal)
      .map((onePlayer, index) => {
        const { name } = onePlayer;
        const { posX, posY, posZ, color } =
          onePlayer.metadata && onePlayer.metadata !== ""
            ? JSON.parse(onePlayer.metadata)
            : { posX: 0, posY: 0, posZ: 0, color: "blue" };
        return (
          <RemotePlayer
            key={index}
            posX={posX}
            posY={posY}
            posZ={posZ}
            color={color}
            name={name}
          />
        );
      });
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export { RemotePlayers };
