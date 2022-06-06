import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import {
  useHMSActions,
  useHMSStore,
  selectLocalPeerID,
  selectPeerMetadata,
} from "@100mslive/react-sdk";
import { useStore } from "../store";
import { movePlayer } from "../utils";

type PlayerProps = JSX.IntrinsicElements["mesh"] & {
  posX: number;
  posY: number;
  posZ: number;
};

export default function CubePlayer(props: PlayerProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { posX, posY, posZ } = props;

  const { movement, playerColor } = useStore((state) => {
    return {
      movement: state.movement,
      playerColor: state.playerColor,
    };
  });

  const { forward, backward, left, right } = movement;

  const hmsActions = useHMSActions();
  const localPeerId = useHMSStore(selectLocalPeerID);
  const userMetaData = useHMSStore(selectPeerMetadata(localPeerId));

  useFrame(() => {
    if (forward || backward || left || right) {
      movePlayer(ref, movement);
      // console.log("sending data...");

      hmsActions.changeMetadata(
        JSON.stringify({
          ...userMetaData,
          posX: ref.current.position.x,
          posY: ref.current.position.y,
          posZ: ref.current.position.z,
          color: playerColor,
        })
      );
    }
  });

  return (
    <mesh position={[posX, posY, posZ]} ref={ref} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={playerColor} />
    </mesh>
  );
}
