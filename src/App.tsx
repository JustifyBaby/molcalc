import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { mc, rt } from './global';
import Index from './components/Index';
import ByMass from './components/ByMass';
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { InputMaterial } from './types';
import ByPiece from './components/ByPiece';
import Molecule from './components/Molecule';
import ByVolume from './components/ByVolume';

function App() {

  const [materials, setMaterials] = useState<InputMaterial[]>([]);

  const atomRef = useRef<HTMLInputElement>(null);
  const [atomVal, setAtomVal] = useState<string>('');
  const subRef = useRef<HTMLInputElement>(null);

  const [molecule, setMolecule] = useState(0);

  const add = (): never | undefined => {
    if (!atomRef.current) throw new Error("atomRef is nullish" + atomRef.current);
    if (!subRef.current) throw new Error("subRef is nullish" + subRef.current);
    const atomName = atomRef.current.value;
    let subVal: number = parseInt(subRef.current.value);
    if (atomName == undefined || subVal == undefined) return;
    if (atomName === '') return;

    if (isNaN(subVal)) {
      subVal = 1;
    } else if (subVal <= 0) {
      return;
    }

    setMaterials(
      [...materials,
      {
        id: uuid(),
        atomName: atomName,
        valence: subVal
      }
      ]
    );
    setAtomVal('');
    subRef.current.value = '';
  };

  const calc = () => {
    const molecule = mc.molecular(materials);
    setMolecule(molecule);
  };

  // 後で作ります
  // const recover = () => {
  //   const innerStr = localStorage.getItem("materials");
  //   if (innerStr) setMaterials(JSON.parse(innerStr));
  // };

  const upper = (e: React.ChangeEvent<HTMLInputElement>): never | undefined => {
    const target = e.target;
    if (!target) throw new Error("Target is nullish" + target);
    const inputed = target.value;

    if (inputed == "" || inputed.length < 1) {
      setAtomVal('');
    } else if (inputed.length === 1) {
      setAtomVal(`${inputed[0].toUpperCase()}`);
    } else {
      setAtomVal(`${inputed[0].toUpperCase()}${inputed[1]}`)
    }
    return;
  };


  return (
    <BrowserRouter>
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
                ref={subRef}
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
              <h2>{mat.atomName}
                <sub>{mat.valence === 1 ? '' : mat.valence}</sub>
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
      <Index />
      <Routes>
        <Route path={`${rt}/molecule`} element={<Molecule materials={materials} />} />
        <Route path={`${rt}/mass/`} element={<ByMass materials={materials} />} />
        <Route path={`${rt}/piece`} element={<ByPiece materials={materials} />} />
        <Route path={`${rt}/volume`} element={<ByVolume materials={materials} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
