import { useEffect, useRef, useState } from "react";
import { MolCalc } from "../mol";
import { v4 as uuid } from "uuid";

const Molecule = () => {
  const [materials, setMaterials] = useState([]);

  const atomRef = useRef();
  const [atomVal, setAtomVal] = useState("");
  const subscriptRef = useRef();

  const [molecule, setMolecule] = useState(0);

  const add = () => {
    const atomName = atomRef.current.value;
    const subName = subscriptRef.current.value;
    if (atomName === undefined || subName === undefined) return;

    setMaterials(
      [...materials,
      {
        id: uuid(),
        atom: atomName,
        subName: subName === "" ? 1 : subName
      }
      ]
    );
    setAtomVal("");
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

  // 後で作ります
  // const recover = () => {
  //   const innerStr = localStorage.getItem("materials");
  //   if (innerStr) setMaterials(JSON.parse(innerStr));
  // };

  const upper = e => {
    const inputed = e.target.value;

    if (inputed == undefined || inputed.length < 1) {
      setAtomVal("");
    } else if (inputed.length === 1) {
      setAtomVal(`${inputed[0].toUpperCase()}`);
    } else {
      setAtomVal(`${inputed[0].toUpperCase()}${inputed[1]}`)
    }
  };

  return (
    <div className="molecule">
      <h1>Molecular Amount</h1>
      <section id="form">
        <div className="input">
          <input type="text" required className="atom" ref={atomRef} onInput={upper} autoFocus={true} value={atomVal} />
          <input type="number" className="subscript" ref={subscriptRef} />
        </div>
        <button onClick={add} className="add">物質の追加</button>
      </section>

      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            <h2>{mat.atom}</h2>
            <sub>{mat.subName === 1 ? "" : mat.subName}</sub>
          </li>
        ))}
      </ul>

      <section id="result">
        <button onClick={calc} className="calc">計算</button>
        <h2>式量: {molecule}</h2>
      </section>
      {materials.length > 0 ? <button onClick={() => { if (confirm("この化学式は削除されます。")) setMaterials([]); }} className="delete">化学式の削除</button> : <div></div>}
      {/* <button onClick={recover}>以前の化学式を復元</button> */}
    </div >
  )
}

export default Molecule;