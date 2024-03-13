export class MolCalc {
  constructor() {
    // 原子量(atomic weight)をオブジェクトで保管

    this.atomics = {
      "H": 1,
      "He": 4,
      "Li": 7,
      "Be": 9,
      "B": 11,
      "C": 12,
      "N": 14,
      "O": 16,
      "F": 19,
      "Na": 23,
      "Mg": 24,
      "Al": 27,
      "Si": 28,
      "P": 31,
      "S": 32,
      "Cl": 35.5,
      "K": 39,
      "Ca": 40,
      "Fe": 56,
      "Cu": 63,
      "Ag": 108,
      "Pt": 195,
      "Au": 197,
      "Hg": 201
    }

    // 標準状態でのモル体積
    this.defaultVolume = 22.4
    // アボガドロ定数
    this.avogadro = 6.0 * 10 ** 23
  }
  // 式量を求めるメソッド。
  molecular(materials = [["H", 2], ["O"]]) {
    let amount = 0;
    // 物質のデータを取り出す
    materials.map(material => {
      let mol_mass = this.atomics[material[0]];
      let atomPiece = material[1] == undefined ? 1 : material[1];
      amount += mol_mass * atomPiece;
    });
    return amount;
  }

  // 質量によって物質量を求めるメソッド
  molByMass(materials = [["H", 2], ["O"]], mass = 18) {
    // 式量を演算。
    const mol_mass = this.molecular(materials);
    const mol = mass / mol_mass;
    return mol;
  }

  massByMol(materials = [["H", 2], ["O"]], mol = 1) {
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
  massByPiece(materials = [["H", 2], ["O"]], piece = 6.0 * 10 ** 23) {
    const mol = this.molByPiece(piece);
    const mass = this.massByMol(materials, mol);
    return mass;
  }
  massByVolumeWithDefault(materials = [["H", 2], ["O"]], volume = 22.4) {
    const mol = this.molByVolumeWithDefault(volume);
    const mass = this.massByMol(materials, mol);
    return mass;
  }

  pieceByMass(materials = [["H", 2], ["O"]], mass = 18) {
    const mol = this.molByMass(materials, mass);
    const piece = this.pieceByMol(mol);
    return piece;
  }

  pieceByVolumeWithDefault(volume = 22.4) {
    const mol = this.molByVolumeWithDefault(volume);
    const piece = this.pieceByMol(mol);
    return piece;
  }

  volumeByMassWithDefault(materials = [["H", 2], ["O"]], mass = 18) {
    const mol = this.molByMass(materials, mass);
    const vol = this.volumeByMol(mol);
    return vol;
  }
  volumeByPieceWithDefault(piece) {
    const mol = this.molByPiece(piece);
    const vol = this.volumeByMolWithDefault(mol);
    return vol;
  }

  concentrationByMass(materials, mass, volume) {
    const mol = this.molByMass(materials, mass);
    return mol / volume;
  }
  massByConcentration(materials, concentration, volume) {
    const mol = concentration * volume;
    const mass = this.massByMol(materials, mol);
    return mass;
  }

  concentrationMolToPercent(density = 1.0, molConcentration = 1, materials = [["H", 2], ["O"]]) {
    // １L当たりの質量
    const massOf1L = 1000 * density;
    //溶質の質量
    const massOfSolution = molConcentration * this.molecular(materials);
    // 求める濃度
    return massOfSolution / massOf1L * 100;
  }

  acidToBaseConcentration() { }
}
