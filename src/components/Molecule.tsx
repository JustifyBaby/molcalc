import { useState } from 'react';
import { mc } from '../global';
import { type Material } from '../types';

const Molecule = ({ materials }: { materials: Material[] }) => {
  const [molecule, setMolecule] = useState<number>(0);
  const calc = (): undefined => {
    if (!materials[0]) {
      setMolecule(0);
      return;
    }
    setMolecule(mc.molecular(materials));

  };

  return (
    <section className="molecule">
      <h2>式量：{molecule}</h2>
      <button onClick={calc}>計算</button>
    </section>
  );
};

export default Molecule;
