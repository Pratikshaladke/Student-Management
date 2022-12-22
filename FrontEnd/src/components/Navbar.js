import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userlogout } from "../slice/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userlogout());
    navigate("home");
  };

  return (
    <header id="header ">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="home">
            Grade Management
          </Link>

          <div className="text-right">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto ">
                {userdata.isLoggedIn ? (
                  <div>
                      {/* <button className="btn btn-md btn-success">
                        Dashboard
                      </button>
                        &nbsp; */}
                      <Link to="home">
                          <button className="btn btn-md btn-success" name="logout" onClick={handleLogout}>
                            LogOut
                          </button>
                      </Link>
                  </div>

                ) : (

                  <div>
                    <Link to="login">
                      <button className="btn btn-md btn-success m-2" name="login">
                        Login
                      </button>
                    </Link>

                    <Link to="Addstud">
                      <button className="btn btn-md btn-success" name="Addstud">
                     Addstud
                      </button>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
