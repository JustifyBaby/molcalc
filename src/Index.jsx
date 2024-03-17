import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul>
        <li style={{ fontSize: "2rem", padding: 10 }}>
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