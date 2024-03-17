import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`molecule/`}>原子量・分子量・式量</Link>
        </li>
        <li>
          {/* <Link to={`mass/`}>質量</Link> */}
          封鎖中
        </li>
      </ul>
    </div>
  )
}

export default Index