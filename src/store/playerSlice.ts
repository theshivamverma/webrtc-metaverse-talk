type Movement = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export const movementSlice = (set, get) => {
  return {
    movement: {
      forward: false,
      backward: false,
      left: false,
      right: false,
    },
    playerName: "",
    updatePlayerName(inputName: string) {
      set((state) => {
        return {
          playerName: inputName,
        };
      });
    },
    playerColor: "",
    updatePlayerColor(inputColor: string) {
      set((state) => {
        return {
          playerColor: inputColor,
        };
      });
    },
    enterStatus: "",
    updateEnterStatus(updatedStatus: boolean) {
      set((state) => {
        return {
          enterStatus: updatedStatus,
        };
      });
    },
    updateMovement(updatedMovement: Movement) {
      set((state) => {
        return {
          movement: { ...state.movement, ...updatedMovement },
        };
      });
    },
  };
};
