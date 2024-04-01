import { useState } from 'react'
import { mc } from '../global';
import { type Material } from '../types';

const Molecule = ({ materials }: { materials: Material[] }) => {
  const [molecule, setMolecule] = useState<number>(0);
  const calc = (): undefined => {
    if (!materials[0]) {
      setMolecule(0)
      return
    }
    setMolecule(mc.molecular(materials))

  }

  return (
    <div>
      <h2>式量：{molecule}</h2>
      <button onClick={calc}></button>
    </div>
  )
}

export default Molecule
