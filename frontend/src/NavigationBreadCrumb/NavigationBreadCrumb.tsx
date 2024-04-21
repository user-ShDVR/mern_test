import { Breadcrumb } from "antd";
import { navigationBreadCrumbPaths } from "../constants/navigationBreadCrumbPaths";
import { Link } from "react-router-dom";
import styles from "./NavigationBreadCrumb.module.scss";

export const NavigationBreadCrumb = () => {
  // console.log(window.location.pathname);

  return (
    <Breadcrumb className={styles.wrapper} separator=">">
      {navigationBreadCrumbPaths.map((path) => (
        <Breadcrumb.Item key={path.href}>
          {path.href ? (
            <Link to={path.href}>{path.title}</Link>
          ) : (
            <span>{path.title}</span>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
