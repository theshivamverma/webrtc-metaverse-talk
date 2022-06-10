import * as THREE from "three";
import { useHMSStore, selectPeers } from "@100mslive/react-sdk";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

let interpolatingPosition = new THREE.Vector3();

type RemotePlayerProps = JSX.IntrinsicAttributes & {
  posX: number;
  posY: number;
  posZ: number;
  color: string;
  name: string;
};

const RemotePlayer = React.memo((props: RemotePlayerProps) => {
  const { posX, posY, posZ, color, name } = props;
  const remoteModel = useRef<THREE.Mesh>();
  // console.log("remote player re-rendered");
  console.log(`RemotePlayer: ${name} re-rendered`);

  const currentPosition = {
    x: posX,
    y: posY,
    z: posZ,
  };

  useEffect(() => {
    // initial render
    if (remoteModel && remoteModel.current && !remoteModel?.current?.position) {
      // @ts-ignore
      remoteModel.current.position = currentPosition;
    }
  });

  const lerpFactor = 0.04;

  useFrame((_, delta: number) => {
    if (remoteModel?.current && currentPosition) {
      if (
        remoteModel.current.position.x !== currentPosition.x ||
        remoteModel.current.position.y !== currentPosition.y ||
        remoteModel.current.position.z !== currentPosition.z
      ) {
        interpolatingPosition.set(
          currentPosition.x,
          currentPosition.y,
          currentPosition.z
        );
        remoteModel.current.position.lerp(interpolatingPosition, lerpFactor);
      }
    }
  });

  return (
    <mesh
      ref={remoteModel}
      position={
        remoteModel?.current?.position
          ? remoteModel.current.position
          : [currentPosition.x, currentPosition.y, currentPosition.z]
      }
      scale={1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
});

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
