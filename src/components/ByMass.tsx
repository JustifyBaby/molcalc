import { useRef, useState } from "react"
import { mc } from "../global"
import { ByMass, InputMaterial } from "../types"

const Mass = ({ materials }: { materials: InputMaterial[] }) => {
  const massRef = useRef<HTMLInputElement>(null);
  const [byMass, setBymass] = useState<ByMass>({
    mol: 0,
    piece: 0,
    volume: 0
  });
  const getByMassParams = (): never | undefined => {
    if (!massRef.current) throw new Error(`massRef is nullish ${massRef.current}`);
    const mass = parseInt(massRef.current.value)
    if (mass <= 0 || isNaN(mass)) return;
    if (materials[0] == undefined) return;

    const mol: number = mc.molByMass(materials, mass);
    const piece: number = mc.pieceByMass(materials, mass);
    const volume: number = mc.volumeByMassWithDefault(materials, mass);

    setBymass(
      {
        mol: mol,
        piece: piece,
        volume: volume
      }
    );
    massRef.current.value = "";
    return;
  };

  return (
    <div className="mass">
      <label>
        質量：
        <input type="number" ref={massRef} />
        <button onClick={getByMassParams}>計算</button>
      </label>
      <div className="results">
        {
          <ul>
            <li>物質量：{byMass.mol} [mol]</li>
            <li>原子の個数{byMass.piece} [個]</li>
            <li>標準状態での体積：{byMass.volume} [L]</li>
          </ul>
        }
      </div>
    </div>
  )
}

export default Mass