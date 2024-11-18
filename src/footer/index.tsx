import React from "react";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const footerStyle: React.CSSProperties = {
    backgroundColor: "#343a40",
    color: "#ffffff",
    padding: "60px 0",
    marginTop: "150px",
  };

  const footerHeadingStyle: React.CSSProperties = {
    color: "#ffffff",
    marginBottom: "40px",
  };

  const contactInfoStyle: React.CSSProperties = {
    margin: "0",
  };

  const currentYear = new Date().getFullYear();
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h5 style={footerHeadingStyle}>{t("Company")}</h5>
            <p>
              {t(
                "Leading the industry with innovative tech solutions and exceptional service."
              )}
            </p>
          </div>
          <div className="col-md-3">
            <h5 style={footerHeadingStyle}>{t("Contact")}</h5>

            <p style={contactInfoStyle}>
              <i className="fas fa-phone"></i> {t("595850777")}
            </p>
            <p style={contactInfoStyle}>
              <i className="fas fa-envelope"></i>{" "}
              {t("totaltech.companyinfo@gmail.com")}
            </p>
          </div>
          <div className="col-md-3">
            <h5 style={footerHeadingStyle}>{t("Follow Us")}</h5>
            <p>{t("Connect with us on social media for updates and news.")}</p>
            <ul
              style={{
                display: "flex",
                gap: "30px",
                listStyleType: "none",
                marginLeft: "-30px",
              }}
            >
              <li>
                <a href="https://www.facebook.com/profile.php?id=61566252152735">
                  <i
                    className="fab fa-facebook-f"
                    style={{ fontSize: "20px" }}
                  ></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/totaltech.company/profilecard/?igsh=MXUyazF6bTduNGtx">
                  <i
                    className="fab fa-instagram"
                    style={{ fontSize: "20px" }}
                  ></i>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@totaltech.company?_r=1&_d=secCgYIASAHKAESPgo88%2F3TxT344WHHmGvo9IFOYqytxXU66%2BC7eamvkZkFPDNEqwa5cX1REHfFo5TMyb9NURe14HLMOb1mDP7TGgA%3D&checksum=1cf5a7be284823d942a4ed05072bdd3ffd81661f543f65ff9f4bfd5105454e58&sec_uid=MS4wLjABAAAAY12aR4NIFGh0BWgAp78wbHM9sozWlwud0H01uyQz0bKHkr7GdZMADSj9w2J9S0Ry&sec_user_id=MS4wLjABAAAAY12aR4NIFGh0BWgAp78wbHM9sozWlwud0H01uyQz0bKHkr7GdZMADSj9w2J9S0Ry&share_app_id=1233&share_author_id=7417520244019381255&share_link_id=002206AF-2BFB-4247-8CAE-FA231F68D572&sharer_language=en&social_share_type=4&source=h5_m&timestamp=1731581189&tt_from=copy&u_code=egakb9bm0i430h&ug_btm=b8727%2Cb0&user_id=7417520244019381255&utm_campaign=client_share&utm_medium=ios&utm_source=copy">
                  <i className="fab fa-tiktok" style={{ fontSize: "20px" }}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p>
              &copy; {currentYear} TOTALTECH.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
