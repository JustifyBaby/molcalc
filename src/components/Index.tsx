import { Link } from "react-router-dom"
import { rt } from "../global"

const Index = () => {
  return (
    <div className="index">
      <ul className="home">
        <li>
          <Link to={`/${rt}/molecule`}></Link>
        </li>
        <li>
          <Link to={`/${rt}/mass`}>質量</Link>
        </li>
        <li>
          <Link to={`/${rt}/piece`}>元素の個数</Link>
        </li>
        <li>
          <Link to={`/${rt}/volume`}>体積</Link>
        </li>
      </ul>
    </div>
  )
}

export default Index