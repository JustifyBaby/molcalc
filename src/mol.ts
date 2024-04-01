// import atomics from "./atomics.json";
import { Atomics, Material } from "./types";
export class MolCalc {
  defaultVolume: number;
  avogadro: number;
  atomics: Atomics;

  constructor() {
    // 原子量(atomic weight)をオブジェクトで保管
    this.atomics = {
      "H": 1.008,
      "He": 4.0026,
      "Li": 6.94,
      "Be": 9.0122,
      "B": 10.81,
      "C": 12.011,
      "N": 14.007,
      "O": 15.999,
      "F": 18.998,
      "Ne": 20.18,
      "Na": 22.99,
      "Mg": 24.305,
      "Al": 26.982,
      "Si": 28.085,
      "P": 30.974,
      "S": 32.06,
      "Cl": 35.45,
      "Ar": 39.948,
      "K": 39.098,
      "Ca": 40.078,
      "Sc": 44.956,
      "Ti": 47.867,
      "V": 50.942,
      "Cr": 51.996,
      "Mn": 54.938,
      "Fe": 55.845,
      "Co": 58.933,
      "Ni": 58.693,
      "Cu": 63.546,
      "Zn": 65.38,
      "Ga": 69.723,
      "Ge": 72.63,
      "As": 74.922,
      "Se": 78.971,
      "Br": 79.904,
      "Kr": 83.798,
      "Rb": 85.468,
      "Sr": 87.62,
      "Y": 88.906,
      "Zr": 91.224,
      "Nb": 92.906,
      "Mo": 95.95,
      "Tc": 98.0,
      "Ru": 101.07,
      "Rh": 102.91,
      "Pd": 106.42,
      "Ag": 107.87,
      "Cd": 112.41,
      "In": 114.82,
      "Sn": 118.71,
      "Sb": 121.76,
      "Te": 127.6,
      "I": 126.9,
      "Xe": 131.29,
      "Cs": 132.91,
      "Ba": 137.33,
      "La": 138.91,
      "Ce": 140.12,
      "Pr": 140.91,
      "Nd": 144.24,
      "Pm": 145.0,
      "Sm": 150.36,
      "Eu": 151.96,
      "Gd": 157.25,
      "Tb": 158.93,
      "Dy": 162.5,
      "Ho": 164.93,
      "Er": 167.26,
      "Tm": 168.93,
      "Yb": 173.05,
      "Lu": 174.97,
      "Hf": 178.49,
      "Ta": 180.95,
      "W": 183.84,
      "Re": 186.21,
      "Os": 190.23,
      "Ir": 192.22,
      "Pt": 195.08,
      "Au": 196.97,
      "Hg": 200.59,
      "Tl": 204.38,
      "Pb": 207.2,
      "Bi": 208.98,
      "Po": 209.0,
      "At": 210.0,
      "Rn": 222.0,
      "Fr": 223.0,
      "Ra": 226.0,
      "Ac": 227.0,
      "Th": 232.04,
      "Pa": 231.04,
      "U": 238.03,
      "Np": 237.0,
      "Pu": 244.0,
      "Am": 243.0,
      "Cm": 247.0,
      "Bk": 247.0,
      "Cf": 251.0,
      "Es": 252.0,
      "Fm": 257.0,
      "Md": 258.0,
      "No": 259.0,
      "Lr": 266.0,
      "Rf": 267.0,
      "Db": 268.0,
      "Sg": 269.0,
      "Bh": 270.0,
      "Hs": 277.0,
      "Mt": 278.0,
      "Ds": 281.0,
      "Rg": 282.0,
      "Cn": 285.0,
      "Nh": 286.0,
      "Fl": 289.0,
      "Mc": 290.0,
      "Lv": 293.0,
      "Ts": 294.0,
      "Og": 294.0
    }
    // 標準状態でのモル体積
    this.defaultVolume = 22.4
    // アボガドロ定数
    this.avogadro = 6.0 * 10 ** 23
  }
  // 式量を求めるメソッド。
  molecular(materials: Material[]) {
    let amount = 0;
    // 物質のデータを取り出す
    materials.map(material => {
      const { atomName, valence } = material;
      const atom: number = this.atomics[atomName];
      amount += atom * valence;
    });
    return amount;
  }

  // 質量によって物質量を求めるメソッド
  molByMass(materials: Material[], mass: number) {
    // 式量を演算。
    const mol_mass = this.molecular(materials);
    const mol = mass / mol_mass;
    return mol;
  }

  massByMol(materials: Material[], mol: number) {
    const mol_mass = this.molecular(materials);
    const mass = mol_mass * mol;
    return mass;
  }

  molByPiece(piece = 6.0 * 10 ** 23) {
    // 個数 = mol * アボガドロ定数
    return piece / this.avogadro;
  }
  pieceByMol(mol = 1) {
    return mol * this.avogadro;
  }

  molByVolumeWithDefault(volume = 22.4) {
    // 標準状態での物質量 = 体積 / 22.4
    return volume / this.defaultVolume;
  }

  volumeByMolWithDefault(mol = 1) {
    return mol * this.defaultVolume;
  }

  // molを経由する演算。
  massByPiece(materials: Material[], piece: number) {
    const mol = this.molByPiece(piece);
    const mass = this.massByMol(materials, mol);
    return mass;
  }
  massByVolumeWithDefault(materials: Material[], volume: number) {
    const mol = this.molByVolumeWithDefault(volume);
    const mass = this.massByMol(materials, mol);
    return mass;
  }

  pieceByMass(materials: Material[], mass: number) {
    const mol = this.molByMass(materials, mass);
    const piece = this.pieceByMol(mol);
    return piece;
  }

  pieceByVolumeWithDefault(volume: number) {
    const mol = this.molByVolumeWithDefault(volume);
    const piece = this.pieceByMol(mol);
    return piece;
  }

  volumeByMassWithDefault(materials: Material[], mass: number) {
    const mol = this.molByMass(materials, mass);
    const vol = this.volumeByMolWithDefault(mol);
    return vol;
  }
  volumeByPieceWithDefault(piece: number) {
    const mol = this.molByPiece(piece);
    const vol = this.volumeByMolWithDefault(mol);
    return vol;
  }

  concentrationByMass(materials: Material[], mass: number, volume: number) {
    const mol = this.molByMass(materials, mass);
    return mol / volume;
  }
  massByConcentration(materials: Material[], concentration: number, volume: number) {
    const mol = concentration * volume;
    const mass = this.massByMol(materials, mol);
    return mass;
  }

  concentrationMolToPercent(density: number, molConcentration: number, materials: Material[]) {
    // １L当たりの質量
    const massOf1L = 1000 * density;
    //溶質の質量
    const massOfSolution = molConcentration * this.molecular(materials);
    // 求める濃度
    return massOfSolution / massOf1L * 100;
  }

}