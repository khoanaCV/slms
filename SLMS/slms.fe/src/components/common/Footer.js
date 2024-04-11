import styles from "../../Assets/css/common/footer.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
export default function Footer() {
  return (
    <div className={cx("wrapper_footer")}>
      <div className={cx("inner_footer")}>
        <h4 className={cx("footer_title")}>
          Nền tảng quản lý giải đấu, đội thi đấu
        </h4>
        <div className={cx("menu_footer")}>
          <ul className={cx("menu_text")}>
            <li className={cx("menu_text_item")}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Điều khoản sử dụng
              </Link>
            </li>
            <li className={cx("menu_text_item")}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Chính sách thanh toán
              </Link>
            </li>
            <li className={cx("menu_text_item")}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Chính sách bảo mật
              </Link>
            </li>
            <li className={cx("menu_text_item")}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Nhận xét về Smart League
              </Link>
            </li>
          </ul>
          <ul className={cx("menu_icon")}>
            <li className={cx("menu_icon_item")}>
              <Link to={"/"}>
                <FontAwesomeIcon style={{ color: "white" }} icon={faEnvelope} />
              </Link>
            </li>
            <li className={cx("menu_icon_item")}>
              <Link to={"/"}>
                <FontAwesomeIcon style={{ color: "white" }} icon={faEnvelope} />
              </Link>
            </li>
            <li className={cx("menu_icon_item")}>
              <Link to={"/"}>
                <FontAwesomeIcon style={{ color: "white" }} icon={faEnvelope} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
