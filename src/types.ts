type Material = {
  atomName: string;
  valence: number;
}

type Atomics = { [H: string]: number; He: number; Li: number; Be: number; B: number; C: number; N: number; O: number; F: number; Ne: number; Na: number; Mg: number; Al: number; Si: number; P: number; S: number; Cl: number; Ar: number; K: number; Ca: number; Sc: number; Ti: number; V: number; Cr: number; Mn: number; Fe: number; Co: number; Ni: number; Cu: number; Zn: number; Ga: number; Ge: number; As: number; Se: number; Br: number; Kr: number; Rb: number; Sr: number; Y: number; Zr: number; Nb: number; Mo: number; Tc: number; Ru: number; Rh: number; Pd: number; Ag: number; Cd: number; In: number; Sn: number; Sb: number; Te: number; I: number; Xe: number; Cs: number; Ba: number; La: number; Ce: number; Pr: number; Nd: number; Pm: number; Sm: number; Eu: number; Gd: number; Tb: number; Dy: number; Ho: number; Er: number; Tm: number; Yb: number; Lu: number; Hf: number; Ta: number; W: number; Re: number; Os: number; Ir: number; Pt: number; Au: number; Hg: number; Tl: number; Pb: number; Bi: number; Po: number; At: number; Rn: number; Fr: number; Ra: number; Ac: number; Th: number; Pa: number; U: number; Np: number; Pu: number; Am: number; Cm: number; Bk: number; Cf: number; Es: number; Fm: number; Md: number; No: number; Lr: number; Rf: number; Db: number; Sg: number; Bh: number; Hs: number; Mt: number; Ds: number; Rg: number; Cn: number; Nh: number; Fl: number; Mc: number; Lv: number; Ts: number; Og: number; }

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