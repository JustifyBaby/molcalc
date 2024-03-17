import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    >
      <ul style={{ listStyle: "none" }} className="home">
        <li>
          <Link to={`molecule/`}>原子量・分子量・式量</Link>
        </li>
        <li>
          {/* <Link to={`mass/`}>質量</Link> */}
          <del>
            封鎖中
          </del>
        </li>
      </ul>
    </div>
  )
}

export default Index