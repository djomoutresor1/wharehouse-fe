export interface IGame {
    gameId: number;
    gameName: string;
    gameCode: string;
    releaseDate: string;
    price: number;
    description: string;
    thumbRating: number;
    imageUrl: string;
}

export interface PositionTable {
    A:number;
    B:number;
    C:number;
    }