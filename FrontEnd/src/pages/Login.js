import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { userlogin } from "../slice/authSlice";
// import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [valid, setValid] = useState({
        email: false,
        password: false,
        emailError: "",
        passwordError: "",
    });

    const [msg, responseMsg] = useState();

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };

    //   VALIDATIONS
    const validateemail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailIsValid = pattern.test(email);

        if (emailIsValid) {
            setValid((previousValue) => ({
                ...previousValue,
                email: false,
                emailError: "",
            }));
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                email: true,
                emailError: "Please Enter Email",
            }));
        }
    };

    const validatePassword = (password) => {
        const pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        const passIsvalid = pattern.test(password);
        if (passIsvalid) {
            setValid((previousValue) => ({
                ...previousValue,
                password: false,
                passwordError: "",
            }));
        } else {
            setValid((previousValue) => ({
                ...previousValue,
                password: true,
                passwordError: "Please Enter your password",
            }));

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    const buttonHandler = async () => {
        const res = await teacherLogin(input);
        console.log(res.data.status)
        if (res.data.status === 200) {
            dispatch(userlogin(res.data));
            navigate('/Dashboard')
        }
        console.log(res.data)

    }
    return (
        <div className="container my-3">

            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <h4>Login</h4>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Email</label><br />
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter your email"
                            onBlur={(e) => validateemail(e.target.value)}
                            onChange={handleChange}
                        /><br />
                        {valid.email && (
                            <span className="text-danger">{valid.emailError}</span>
                        )}
                        <br />
                        <br />
                        <label>Password</label><br />
                        <input
                            type="text"
                            className="form-control"
                            name="password"
                            placeholder="Enter your password"
                            onBlur={(e) => validatePassword(e.target.value)}
                            onChange={handleChange}
                        /><br />
                        {valid.password && (
                            <span className="text-danger">{valid.passwordError}</span>
                        )}
                        <br />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-info "
                            onClick={buttonHandler}
                        >
                            login{" "}
                        </button>
                        {<b className="text-info">{responseMsg}</b>}
                    </form>

                    <div id="formFooter">
                        <a class="underlineHover" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
