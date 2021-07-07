import error from '../../../assets/icons/404.png';
import './PageNotFound.sass';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <Link to="/">
        <img className="page-not-found__img" src={error} alt=""></img>
      </Link>
      <div className="page-not-found__text">
      Oops ... We can't find what you're looking for.
      </div>
      <Link to="/" className="page-not-found__a">
        Back
      </Link>
    </div>
  );
};
export default PageNotFound;
