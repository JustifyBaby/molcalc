import { useEffect, useRef, useState } from "react";
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
    if (atomName === undefined || subName === undefined) return;

    setMaterials(
      [...materials, { id: uuid(), atom: atomName, subName: subName === "" ? 1 : subName }]
    );
    atomRef.current.value = "";
    subscriptRef.current.value = "";
  };

  useEffect(() => {
    localStorage.setItem("materials", JSON.stringify(materials));
  }, [materials]);

  const calc = () => {
    const mol_i = new MolCalc;
    const args = materials.map(mat => [mat.atom, parseInt(mat.subName)]);
    setMolecule(mol_i.molecular(args));
  };

  const upper = (e) => {
    e.target.value = e.target.value.toUpperCase();
  }

  const recover = () => {
    const innerStr = localStorage.getItem("materials");
    if (innerStr) setMaterials(JSON.parse(innerStr));
  };

  return (
    <div className="molecule">
      <h1>Molecular Amount</h1>
      <section id="form">
        <div className="input">
          <input type="text" required className="atom" ref={atomRef} onInput={upper} />
          <input type="number" className="subscript" ref={subscriptRef} />
        </div>
        <button onClick={add} className="add">物質の追加</button>
      </section>

      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            <p>{mat.atom}</p>
            <sub>{mat.subName === 1 ? "" : mat.subName}</sub>
          </li>
        ))}
      </ul>

      <section id="result">
        <button onClick={calc} className="calc">計算</button>
        <h2>式量: {molecule}</h2>
      </section>
      <button onClick={recover}>以前の化学式を復元</button>
    </div>
  )
}

export default Molecule;