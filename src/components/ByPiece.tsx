import { useRef, useState } from 'react';
import { type ByPiece, type Material } from '../types';
import { mc } from '../global'

const Piece = ({ materials }: { materials: Material[] }) => {
  const init: ByPiece = {
    mol: 0,
    mass: 0,
    volume: 0
  };

  const [byPiece, setByPiece] = useState<ByPiece>(init);

  const pieceValidRef = useRef<HTMLInputElement>(null);
  const pieceSupRef = useRef<HTMLInputElement>(null);

  const getByPieceParams = (): never | undefined => {
    if (!pieceValidRef.current) throw new Error()
    if (!pieceSupRef.current) throw new Error()

    const valid: number = parseInt(pieceValidRef.current.value)
    const sup: number = parseInt(pieceSupRef.current.value)
    if (isNaN(valid) || isNaN(sup)) return
    if (valid <= 0 || sup <= 0) return
    if (!materials[0]) {
      setByPiece(init)
      return
    }
    const piece = valid * 10 ** sup
    setByPiece({
      mol: mc.molByPiece(piece),
      mass: mc.massByPiece(materials, piece),
      volume: mc.volumeByPieceWithDefault(piece)
    })
    pieceValidRef.current.value = ''
    pieceSupRef.current.value = ''

  }

  return (
    <div>
      <section id="form">
        <label>個数:</label>
        <div>
          <input type="number" ref={pieceValidRef} />
          <span>* 10</span>
          <sup>
            <input type="number" ref={pieceSupRef} />
          </sup>
        </div>
        <button onClick={getByPieceParams}>計算</button>
      </section>
      {
        <ul>
          <li>物質量：{byPiece.mol} [mol]</li>
          <li>質量：{byPiece.mass} [g]</li>
          <li>体積：{byPiece.volume} [L]</li>
        </ul>
      }
    </div>
  )
}

export default Piece;
