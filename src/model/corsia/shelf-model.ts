import { PositionModel } from './position-model';

export interface ShelfModel {
  shelf: number;
  freePlaces:number;
  positions: PositionModel[];
}
