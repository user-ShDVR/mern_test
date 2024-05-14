import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

import styles from "./DynamicBreadCrumb.module.scss";

const pathTranslations: Record<string, string> = {
  catalog: "Каталог",
  cart: "Корзина",
  orders: "Заказы",
  admin_panel: "Админ-панель",
  account: "Аккаунт",
  forbidden: "Нет доступа к странице",
  not_authorized: "Не авторизован",
  wine: "Вино",
  cognac: "Коньяк",
  sparkling_wine: "Игристое вино",
  whisky: "Виски",
  brandy: "Бренди",
  beer: "Пиво",
  liquor: "Ликер",
};

export const DynamicBreadCrumb = () => {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>,

    ...segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;

      const isNumber = /^\d+$/.test(segment);
      const translatedSegment = isNumber
        ? "Товар"
        : pathTranslations[segment] || segment.replace(/-/g, " ");

      const item = isLast ? (
        <>{translatedSegment}</>
      ) : (
        <Link to={url}>{translatedSegment}</Link>
      );

      return <Breadcrumb.Item key={url}>{item}</Breadcrumb.Item>;
    }),
  ];

  return (
    <Breadcrumb className={styles.breadcrumbWrapper} separator=">">
      {breadcrumbItems}
    </Breadcrumb>
  );
};
