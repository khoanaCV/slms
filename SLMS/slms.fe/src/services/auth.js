import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER;


const register = (email, password, rePassword, fullname) => {
  return axios
    .post(url + "/api/User/register", {
      email,
      password,
      rePassword,
      fullname,
    })
    .then((response) => {
      return response.data;
    });
}
const login = (email, password) => {
  return axios
    .post(url + "/api/User/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data);
      }
      return response.data;
    });
}

const useLogout = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate('/');
  }, [navigate]);

  return logout;
}

const forgotpassword = (email, newPassword, confirmPassword) => {
  return axios
    .post(url + "/api/User/forgotPassword?email=" + email, {
      newPassword,
      confirmPassword,
    })
    .then((response) => {
      return response.data;
    });
}

const sendEmail = (email) => {
  return axios
    .post(url + "/api/User/send-email/?email=" + email, {
      email,
    })
    .then((response) => {
      return response.data;
    });
}
const sendEmailOTP = (email) => {
  return axios
    .post(url + "/api/User/send-otp?email=" + email,)
    .then((response) => {
      return response.data;
    });
}

const AuthorEmailOTP = (email, otp) => {
  return axios
    .post(url + "/api/User/validate-otp?email=" + email + "&otp=" + otp,)
    .then((response) => {
      return response.data;
    });
}
const ReSendEmailOTP = (email) => {
  return axios
    .post(url + "/api/User/resend-otp?email=" + email,)
    .then((response) => {
      return response.data;
    });
}


export { login, useLogout, register, forgotpassword, sendEmail, sendEmailOTP, AuthorEmailOTP, ReSendEmailOTP };