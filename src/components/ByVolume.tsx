import { useRef, useState } from "react"
import { ByVolume, Material } from "../types"
import { mc } from "../global";

const ByVolume = ({ materials }: { materials: Material[] }) => {
  const [byVolume, setByVolume] = useState<ByVolume>({
    mol: 0,
    mass: 0,
    piece: 0
  });
  const defaultVolumeRef = useRef<HTMLInputElement>(null);

  const getByVolumeParams = (): never | undefined => {
    if (!defaultVolumeRef.current) throw new Error(`massRef is nullish ${defaultVolumeRef.current}`);
    if (!materials[0]) return;
    const volume = parseInt(defaultVolumeRef.current.value)
    if (volume <= 0 || isNaN(volume)) return;

    const mol: number = mc.molByVolumeWithDefault(volume);
    const mass: number = mc.massByVolumeWithDefault(materials, volume);
    const piece: number = mc.pieceByVolumeWithDefault(volume);

    setByVolume(
      {
        mol: mol,
        piece: piece,
        mass: mass
      }
    );
    defaultVolumeRef.current.value = "";
    return;
  };

  return (
    <div>
      <label>
        体積：
        <input type="number" ref={defaultVolumeRef} />
        <button onClick={getByVolumeParams}>計算</button>
      </label>
      <div className="results">
        {
          <ul>
            <li>物質量：{byVolume.mol} [mol]</li>
            <li>質量：{byVolume.mass} [g]</li>
            <li>原子の個数{byVolume.piece} [個]</li>
          </ul>
        }
      </div>
    </div>
  )
}

export default ByVolume;