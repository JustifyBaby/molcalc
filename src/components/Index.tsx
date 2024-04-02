import { Link } from 'react-router-dom';
import { rt } from '../global';

const Index = () => {
  return (
    <div className="index">
      <ul className="home">
        <li>
          <Link to={`/${rt}/molecule`}>原子量・分子量・式量</Link>
        </li>
        <li>
          <Link to={`/${rt}/mass`}>質量から</Link>
        </li>
        <li>
          <Link to={`/${rt}/piece`}>元素の個数から</Link>
        </li>
        <li>
          <Link to={`/${rt}/volume`}>体積から</Link>
        </li>
      </ul>
    </div>
  );
};

export default Index;
