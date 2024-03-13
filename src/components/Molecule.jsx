import { useRef, useState } from "react";
import { MolCalc } from "../mol";
import { v4 as uuid } from "uuid";

const Molecule = () => {
  const [materials, setMaterials] = useState([]);
  const atomRef = useRef();
  const subscriptRef = useRef();

  const [molecule, setMolecule] = useState(0);

  const add = () => {
    const atomName = atomRef.current.value;
    const subName = subscriptRef.current.value;
    setMaterials(
      [...materials, { id: uuid(), atom: atomName, subName: subName }]
    );
  };

  const calc = () => {
    const mol_i = new MolCalc;
    const args = materials.map(mat => [mat.atom, mat.subName]);
    setMolecule(mol_i.molecular(args));
  };

  return (
    <div className="molecule">
      <h1>Molecular</h1>
      <section id="form">
        <input type="text" required className="atom" ref={atomRef} />
        <input type="number" className="subscript" ref={subscriptRef} />
        <button onClick={add}>物質の追加</button>
      </section>

      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            <p>{mat.atom}</p>
            <sub>{mat.subName}</sub>
          </li>
        ))}
      </ul>

      <section id="result">
        <button onClick={calc}>計算</button>
        <h2>式量: {molecule}</h2>
      </section>
    </div>
  )
}

export default Molecule;