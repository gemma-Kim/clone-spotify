export interface Artist {
  id: string;
  name: string;
  type: string; //artist
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
