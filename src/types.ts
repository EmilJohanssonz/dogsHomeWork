export type Color = "Svart" | "Vit" | "Grå" | "Orange" | "Brun";
export type Breed = "Husky" | "Mops" | "Golden" | "Beagle" | "Berner sennen";

export interface Dog {
  name: string;
  age: number;
  color: Color;
  breed: Breed;
}