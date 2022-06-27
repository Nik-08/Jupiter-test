declare module "*.scss";
declare module "*.png";

interface AppState {
  cards: CardsState;
}

interface CardsSatate {
  loading: boolean;
  error: null | string;
  items: CardItem[] | null;
}

interface CardItem {
  name: string;
  imageUrl: string;
  id: number;
  category: string;
}
