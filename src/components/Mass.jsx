import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { mc } from '../global';

const Mass = () => {
  const [materials, setMaterials] = useState([]);

  const atomRef = useRef();
  const [atomVal, setAtomVal] = useState('');
  const subscriptRef = useRef();

  const molRef = useRef();
  const [mol, setMol] = useState(0);
  const pieceRef = useRef();
  const pieceSupRef = useRef();
  const [piece, setPiece] = useState(0);
  const volumeRef = useRef();
  const [volume, setVolume] = useState(0);
  const massRef = useRef();
  const [mass, setMass] = useState(0);

  const add = () => {
    const atomName = atomRef.current.value;
    const subName = subscriptRef.current.value;
    if (atomName === undefined || subName === undefined) return;

    setMaterials(
      [...materials,
      {
        id: uuid(),
        atom: atomName,
        subName: subName === '' ? 1 : subName
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
    const molInput = molRef.current.value;
    const pieceInput = [
      pieceRef.current.value,
      pieceSupRef.current.value
    ];
    const volumeInput = volumeRef.current.value;
    const massInput = massRef.current.value;
    const args = materials.map(mat => [mat.atom, parseInt(mat.subName)]);

    if (molInput !== '') {
      setMass(mc.massByMol(args, parseInt(molInput)));
      molRef.current.value = '';
    }
    if (pieceInput !== '') {
      setMass(mc.massByPiece(
        args,
        (parseInt(pieceInput[0]) * 10 ** parseInt(pieceInput[1]))
      ));
      pieceRef.current.value = '';
      pieceSupRef.current.value = '';
    }
    if (volumeInput !== '') {
      setMass(mc.massByVolumeWithDefault(args, parseInt(volumeInput)));
      volumeRef.current.value = '';
    }
    if (massInput !== '') {
      setMol(mc.molByMass(args, parseInt(massInput)));
      setPiece(mc.pieceByMass(args, parseInt(massInput)));
      setVolume(mc.volumeByMassWithDefault(args, parseInt(ma)));
      massRef.current.value = '';
    }
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
          <div>
            <label>元素名</label>
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
            <label>個数</label>
            <input
              type="number"
              className="subscript"
              ref={subscriptRef}
            />
          </div>
        </div>
        <button onClick={add} className="add">物質の追加</button>
      </section>

      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            <h2>{mat.atom}</h2>
            <sub>{mat.subName === 1 ? '' : mat.subName}</sub>
          </li>
        ))}
      </ul>

      <section id="otherValForm">
        <div>
          <label>物質量：</label>
          <input type="number" ref={molRef} />
        </div>
        <div className="pieceInput">
          {/* ここは、flexの設定が必要なのでclassName設定 */}
          <label>個数：</label>
          <input type="number" ref={pieceRef} />*10
          <sup>
            <input type="number" ref={pieceSupRef} />
          </sup>
        </div>
        <div>
          <label>体積：</label>
          <input type="number" ref={volumeRef} />
        </div>
        <div>
          <label>質量：</label>
          <input type="number" ref={massRef} />
        </div>
      </section>

      <section id="result">
        <button onClick={calc}>計算</button>
        <h2>質量：{mass}</h2>
        <h2>物質量：{mol}</h2>
        <h2>個数：{piece}</h2>
        <h2>体積：{volume}</h2>
      </section>

      {materials.length > 0 ?
        <button
          onClick={() => {
            if (confirm('この化学式は削除されます。')) setMaterials([]);
          }}
          className="delete"
        >
          化学式の削除
        </button>
        : <div></div>
      }
      {/* <button onClick={recover}>以前の化学式を復元</button> */}
    </div>
  )
}

export default Mass;