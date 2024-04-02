type Material = {
  atomName: string;
  valence: number;
}

type Atomics = {
  [key: string]: number;
}

type InputMaterial = {
  id: string;
  atomName: string;
  valence: number;
}

type ByMass = {
  mol: number;
  piece: number;
  volume: number;
}

type ByPiece = {
  mol: number;
  mass: number;
  volume: number;
}

type ByVolume = {
  mol: number;
  mass: number;
  piece: number;
}

export type { Material, Atomics, InputMaterial, ByMass, ByPiece, ByVolume };