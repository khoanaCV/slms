import styles from "../../Assets/css/common/popup.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Popup(props) {
  return (
    <div className={cx("popup")}>
      <div className={cx("popup-content")}>{props.children}</div>
    </div>
  );
}
