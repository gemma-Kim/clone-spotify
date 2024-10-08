import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveAccessToken } from "../../store/actions/authActons";
import { useNavigate } from "react-router-dom";

const AuthRedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token") ?? "";
    dispatch(saveAccessToken(accessToken));

    const previousUrl = localStorage.getItem("previous_url");
    if (previousUrl) {
      if (previousUrl.startsWith("http")) {
        const url = new URL(previousUrl);
        const path = url.pathname;
        navigate(path);
        localStorage.removeItem("previous_url");
      }
    } else {
      navigate("/"); // 이전 URL이 없으면 홈으로 리디렉션
    }
  }, [dispatch, navigate]);

  return <div>Redirecting…</div>;
};

export default AuthRedirectPage;
