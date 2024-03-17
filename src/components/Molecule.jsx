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
    if (atomName == undefined || subName == undefined) return;
    if (atomName == "") return;
    if (subName <= 0) return;

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
          <p>1.ここ入力</p>
          <div>
            <label>
              元素記号
            </label>
            <input
              type="text"
              required
              className="atom"
              ref={atomRef}
              onInput={upper}
              autoFocus={true}
              value={atomVal}
            />

          </div>

          <div>
            <label>
              個数
            </label>
            <input
              type="number"
              className="subscript"
              ref={subscriptRef}
            />
          </div>
        </div>
        <p>2. ここ押す</p>
        <button onClick={add} className="add">物質の追加</button>
      </section>
      <p>3. ここが自分の思う化学式なら</p>
      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            <h2>{mat.atom}</h2>
            <sub>{mat.subName === 1 ? "" : mat.subName}</sub>
          </li>
        ))}
      </ul>

      <section id="result">
        <p>ここを押す</p>
        <button onClick={calc} className="calc">計算</button>
        <h2>式量: {molecule}</h2>
      </section>
      {materials.length > 0 ?
        <button
          onClick={() => {
            if (confirm("この化学式は削除されます。")) {
              setMaterials([]);
              setMolecule(0);
            }
          }}
          className="delete"
        >
          化学式の削除
        </button>
        : <div></div>
      }
      {/* <button onClick={recover}>以前の化学式を復元</button> */}
    </div >
  )
}

export default Molecule;