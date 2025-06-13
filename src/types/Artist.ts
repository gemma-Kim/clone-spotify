import { ItemTypes } from "@spotify/web-api-ts-sdk";

export interface Artist {
  id: string;
  name: string;
  type: ItemTypes;
  uri: string;
  href: string;
  followers: { href: string; total: number };
  popularity: number;
  genres: any[];
  // external_urls:
}

export interface ArtistDetail extends Artist {
  images: any[];
}
