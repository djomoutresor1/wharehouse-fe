import { PositionModel } from './position-model';

export interface ShelfModel {
  shelf: string;
  positions: PositionModel[];
}
