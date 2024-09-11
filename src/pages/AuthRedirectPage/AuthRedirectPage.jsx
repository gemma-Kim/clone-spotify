import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveAccessToken } from "../../store/actions/authActons";
import { useNavigate } from "react-router-dom";

const AuthRedirectPage = () => {
  const hash = window.location.hash;
  const cleanHash = hash.substring(1);
  const params = cleanHash.split("&");
  let accessToken = null;
  params.forEach((param) => {
    const [key, value] = param.split("=");
    if (key === "access_token") {
      accessToken = value;
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(saveAccessToken(accessToken));
    // homepage 로 이동
    navigate("/");
  }, [accessToken]);

  return <div>RedirectPage</div>;
};

export default AuthRedirectPage;
