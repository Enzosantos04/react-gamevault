//essa interface vai ser usada para representar os dados do game
//que vai ser passado para o card
export interface GameData {
  id?: number;
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  imageUrl: string;
}
