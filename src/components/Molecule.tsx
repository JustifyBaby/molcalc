import { useState } from "react";
import { mc } from "../global"
import { Material } from "../types"

const Molecule = ({ materials }: { materials: Material[] }) => {
  const [molecule, setMolecule] = useState<number>(0);
  return (
    <div>
      <h2>式量：{molecule}</h2>
      <button onClick={() => setMolecule(mc.molecular(materials))}></button>
    </div>
  )
}

export default Molecule