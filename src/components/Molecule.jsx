import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { mc } from '../global';

const Molecule = () => {
  const [materials, setMaterials] = useState([]);

  const atomRef = useRef();
  const [atomVal, setAtomVal] = useState('');
  const subscriptRef = useRef();

  const [molecule, setMolecule] = useState(0);

  const add = () => {
    const atomName = atomRef.current.value;
    let subVal = subscriptRef.current.value;
    if (atomName == undefined || subVal == undefined) return;
    if (atomName === '') return;
    if (subVal === '') {
      subVal = 1;
    } else if (subVal <= 0) {
      return;
    }

    setMaterials(
      [...materials,
      {
        id: uuid(),
        atom: atomName,
        sub: subVal
      }
      ]
    );
    setAtomVal('');
    subscriptRef.current.value = '';
  };

  useEffect(() => {
    localStorage.setItem('materials', JSON.stringify(materials));
  }, [materials]);

  const calc = () => {
    const args = materials.map(mat => [mat.atom, parseInt(mat.sub)]);
    setMolecule(mc.molecular(args));
  };

  // 後で作ります
  // const recover = () => {
  //   const innerStr = localStorage.getItem("materials");
  //   if (innerStr) setMaterials(JSON.parse(innerStr));
  // };

  const upper = e => {
    const inputed = e.target.value;

    if (inputed == undefined || inputed.length < 1) {
      setAtomVal('');
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
            <h2>{mat.atom}
              <sub>{mat.sub === 1 ? '' : mat.sub}</sub>
            </h2>
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
            if (confirm('この化学式は削除されます。')) {
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