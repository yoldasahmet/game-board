export interface Game {
  id: string;
  handle: string;
  url: string;
  bga_edit_url: string;
  template_url: string;
  name: string;
  price: string;
  price_ca: string;
  price_uk: string;
  price_au: string;
  msrp: number;
  msrps: Msrp[];
  discount: string;
  year_published: number;
  min_players: number;
  max_players: number;
  player_counts: number[];
  min_playtime: number;
  max_playtime: number;
  min_age: number;
  description: string;
  commentary: string;
  faq: string;
  thumb_url: string;
  image_url: string;
  matches_specs: any;
  specs: any[];
  mechanics: Category[];
  categories: Category[];
  publishers: Designer[];
  designers: Designer[];
  primary_publisher: Primary;
  primary_designer: Primary;
  developers: any[];
  related_to: any[];
  related_as: any[];
  artists: string[];
  names: any[];
  rules_url: string;
  amazon_rank?: number | null | undefined;
  official_url: string;
  sell_sheet_url?: string | null | undefined;
  store_images_url?: string | null | undefined;
  comment_count: number;
  num_user_ratings: number;
  average_user_rating: number;
  size_height: number;
  historical_low_prices: HistoricalLowPrice[];
  active: boolean;
  num_user_complexity_votes: number;
  average_learning_complexity: number;
  average_strategy_complexity: number;
  visits: number;
  lists: number;
  mentions: number;
  links: number;
  plays: number;
  rank: number;
  type: string;
  sku?: string | null | undefined;
  upc: string;
  isbn?: string | null | undefined;
  video_links?: any[] | null | undefined;
  availability_status?: string | null | undefined;
  num_distributors: number;
  trending_rank: number;
  listing_clicks: number;
  is_historical_low: boolean;
  skus?: string[];
  sku_objects?: SkuObject[];
  edit_url: string;
  players: string;
  playtime: string;
  msrp_text: string;
  price_text: string;
  tags: string[];
  images: Images;
  description_preview: string;
}

export interface Category {
  id: string;
  url: string;
}

export interface Designer {
  id: string;
  num_games: null | any;
  score: number;
  game: GameClass;
  url: string;
  images: Images;
}

export interface GameClass {}

export interface Images {
  thumb: null | string | undefined;
  small: null | string | undefined;
  medium: null | string | undefined;
  large: null | string | undefined;
  original: null | string | undefined;
}

export interface HistoricalLowPrice {
  country: string;
  date: Date | any;
  price: number;
  isLow: boolean;
}

export interface Msrp {
  country: string;
  price: number;
}

export interface Primary {
  id: string;
  name: string;
  url: string;
}

export interface SkuObject {
  name: string;
  sku: string;
}
