import { NavLink } from "../../node_modules/react-router-dom/index";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Reve from "../img/attrape-reve.svg";

export default function Menu() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand container-fluid justify-content-between">
      <div
        id="logo"
        className="d-flex flex-wrap align-items-center justify-content-center"
      >
        <strong>
          <span>Mel</span>
          <span>en</span>
          <span>os</span> <span>developpement</span>
        </strong>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502.68 509.29">
            <g>
              <g>
                <path
                  className="outline"
                  d="M454.6,96.25,394.43,63l-9.06-5-1.42-.8L363.1,45.6,303.89,12.86a104.85,104.85,0,0,0-98.32-1.22l-153,79.75c-30.67,16-49.85,46-50.3,78.65L0,333.14C-.5,365.83,17.82,396.29,48,413l150.71,83.45a104.71,104.71,0,0,0,98.32,1.16l153-79.7c30.67-16,49.8-45.95,50.25-78.64l2.33-163.15C503.13,143.42,484.81,113,454.6,96.25Zm-86.54-30c-3.14,5.87-22.21,39.17-68.67,70.45-51.16,34.46-58.45,61.94-60.27,69.43-1.57,6.53-2.23,24.14-1.87,33.7h-.1c0,.56.1,1.27.2,2a12.59,12.59,0,0,0,.1,1.47c.25,2.48.61,5.52,1,8.86,1,8.09,2.13,18.11,2.33,24.54,0,.1,0,.2-.15.2s-.15-.05-.2-.1c-2.89-6.88-7.65-19.68-9.47-32.28l.1.05c-.2-1.17-.35-2.33-.5-3.49,0-.16,0-.36,0-.51-.21-1.67-.36-3.29-.41-4.86a99.45,99.45,0,0,1,36.39-79.65C295.9,131.83,355.06,89.52,368.06,66.29Z"
                />
                <path
                  className="background"
                  d="M436,110.81,299.09,35.05A95.14,95.14,0,0,0,209.77,34l-139,72.4C43,120.87,25.57,148.09,25.15,177.79L23.06,326c-.42,29.69,16.22,57.33,43.64,72.51l136.86,75.77a95.17,95.17,0,0,0,89.32,1.09l139-72.4c27.85-14.51,45.26-41.74,45.67-71.43l2.09-148.16C480,153.64,463.37,126,436,110.81Z"
                />
                <path
                  className="weather"
                  d="M394.43,63l-9.06-5-5.92,5.67a62.13,62.13,0,0,0,4.5-6.47L363.1,45.6a107.91,107.91,0,0,1-20,18.37l-3.24,18.72-1.16-17.81c-19.53,17.05-79.15,36.89-79.15,36.89l-3.39,30.46-6.83-25s-23.68,21.26-29.15,37.45,14,47.42,14,47.42c-12.4-3.29-20.9-20-20.9-20-8.75,36.18,10.37,63.61,15,69.63,1.47,13.82,6.83,28.44,10,36a2.51,2.51,0,0,0,2.88,1.57v-.05a2.47,2.47,0,0,0,2-2.58c-.2-6.58-1.37-16.65-2.33-24.75-.56-4.95-1.06-9.21-1.26-11.89,2.27-14.12,9.46-26.36,23-34.05,13.87-7.9,67.91-46.71,67.91-46.71C304,168.92,290.79,162,290.79,162c26.31-2.53,73.68-20.7,91.29-43.17C393.77,103.79,394.93,78.29,394.43,63Zm-95,73.79c-51.16,34.46-58.45,61.94-60.27,69.43-1.57,6.53-2.23,24.14-1.87,33.7h-.1c0,.56.1,1.27.2,2a12.59,12.59,0,0,0,.1,1.47c.25,2.48.61,5.52,1,8.86,1,8.09,2.13,18.11,2.33,24.54,0,.1,0,.2-.15.2s-.15-.05-.2-.1c-2.89-6.88-7.65-19.68-9.47-32.28l.1.05c-.2-1.17-.35-2.33-.5-3.49,0-.16,0-.36,0-.51-.21-1.67-.36-3.29-.41-4.86a99.45,99.45,0,0,1,36.39-79.65c29.4-24.24,88.56-66.55,101.56-89.78C364.92,72.16,345.85,105.46,299.39,136.74Z"
                />
                <path
                  className="dev-icon"
                  d="M278.91,247.77c10-14.86,18.94-26.11,28.17-32.44,13.45-9.24,32.45-7.62,44.16,3.41L397,261.88a12.73,12.73,0,0,1,.16,18.5L335,341"
                />
                <path
                  className="center-icon"
                  d="M245.64,289.83q2.19-3.43,4.32-6.68"
                />
                <path
                  className="dev-icon"
                  d="M156.83,216,94.76,274.5A12.74,12.74,0,0,0,94.6,293l50.61,49.28c8.58,8.36,21.56,11.64,33.69,8.59,12.44-3.13,26.25-10.85,40.55-25"
                />
              </g>
            </g>
          </svg>
        </Link>
      </div>
      <ul className="navbar-nav">
        <div className="d-flex">
          <li className="navbar__item">
            <NavLink to="/references">Références</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/formules">Formules</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/temoignages">Témoignages</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/devis">Devis</NavLink>
          </li>
        </div>
      </ul>

      <div className="navbar__coach">
        <span className="navbar__item">Dreams Développeur</span>
        <img src={Reve} />
      </div>
    </nav>
  );

  /*
  return (
    <nav className="navbar navbar-expand navbar-light justify-content-center">
      <ul className="navbar-nav menu d-none">
        <li className="nav__item home">
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li className="nav__item home">
          <NavLink to="/">Portfolio</NavLink>
        </li>
        <li className="nav__item home">
          <NavLink to="/">Formules</NavLink>
        </li>
        <li className="nav__item home">
          <NavLink to="/">Commentaires</NavLink>
        </li>
      </ul>
    </nav>
  );
*/
}
