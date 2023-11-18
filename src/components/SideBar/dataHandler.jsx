//!NOTA: NO TRATAR DE ENTENDER ESTE CODIGO, NI YO LO ENTIENDO Y LO QUE HACE ES MANEJAR OBJETOS PARA QUE SEAN USADOS EN EL SIDEBAR

import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import enumIcons from "../../enums/enumIcons";
import enumRoutes from "../../enums/enumRoutes";

export const getItem = (label, key, icon, children) => {
  return { label, key, icon, children };
};

export const transformData = (data) => {
  return Object.entries(data).reduce((acc, [moduleKey, moduleValue]) => {
    const children = Object.entries(moduleValue).reduce(
      (childrenAcc, [subModuleKey, methods]) => {
        const methodItems = methods.map((methodKey) => {
          let key;
          if (enumRoutes[methodKey]) {
            key = enumRoutes[methodKey];
          } else {
            key = `${moduleKey}/${subModuleKey}/${methodKey}`;
          }
          return getItem(
            methodKey,
            key,
            enumIcons[methodKey] || <AppstoreOutlined />
          );
        });
        return [...childrenAcc, ...methodItems];
      },
      []
    );

    acc.push(
      getItem(
        moduleKey,
        moduleKey,
        enumIcons[moduleKey] || <HomeOutlined />,
        children
      )
    );
    return acc;
  }, []);
};
