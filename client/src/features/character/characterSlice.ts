/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Character } from '../../interfaces/character.interface';
import game from '../../data/gameMap.data';

const initialState: Character = {
  tileFrom: [1, 1],
  tileTo: [1, 1],
  timeMoved: 0,
  dimensions: [40, 40],
  position: [45, 45],
  delayMove: 700,
  direction: 'left',
  isMoving: false,
};

const { cols, layers, tileSize } = game;

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    //
    processMovement(state, action) {
      const [x, y] = action.payload.coordinates;
      const t = action.payload.time;
      if (
        state.tileFrom[0] === state.tileTo[0] &&
        state.tileFrom[1] === state.tileTo[1]
      ) {
        state.isMoving = false;
      }

      if (t - state.timeMoved >= state.delayMove) {
        state.tileFrom = [x, y];
        state.tileTo = [x, y];
        state.position = [
          tileSize * x + (tileSize - state.dimensions[0] / 2),
          tileSize * y + (tileSize - state.dimensions[1] / 2),
        ];
      } else {
        state.position[0] =
          state.tileFrom[0] * tileSize + (tileSize - state.dimensions[0]) / 2;
        state.position[1] =
          state.tileFrom[1] * tileSize + (tileSize - state.dimensions[1] / 2);

        if (state.tileFrom[0] !== state.tileTo[0]) {
          const diff = (tileSize / state.delayMove) * (t - state.timeMoved);
          state.position[0] +=
            state.tileTo[0] < state.tileFrom[0] ? 0 - diff : diff;
        }

        if (state.tileFrom[1] !== state.tileTo[1]) {
          const diff = (tileSize / state.delayMove) * (t - state.timeMoved);
          state.position[1] +=
            state.tileTo[1] < state.tileFrom[1] ? 0 - diff : diff;
        }

        state.position[0] = Math.round(state.position[0]);
        state.position[1] = Math.round(state.position[1]);
      }
      state.isMoving = true;
    },
  },
});

// export const player = (state: RootState): Character => state.character;

export const { processMovement } = characterSlice.actions;
export default characterSlice.reducer;

// placeAt(state, action) {
//   const [x, y] = action.payload.coordinates;
//   // console.log('coming from placeAt', x, y);
//   state.tileFrom = [x, y];
//   state.tileTo = [x, y];
//   state.position = [
//     game.tileSize * x + (game.tileSize - state.dimensions[0] / 2),
//     game.tileSize * y + (game.tileSize - state.dimensions[1] / 2),
//   ];
// },
