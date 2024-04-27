import { Form, Input } from "antd";
import {
  typeItemDataIndexes,
  typeItemLabels,
} from "../../constants/types-constants";
import { useGetTypesQuery } from "../../store/api/types/types-api";
import { IType } from "../../types/ICatalogElement";
import { getImageUrl } from "../../utils/get-image-url";
import {
  DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "../../constants/types-constants";

export const useGetEditTypeFields = (type: IType) => {
  // const { data: typesData } = useGetTypesQuery({
  //   page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  //   limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  // });

  // const imagesOptions = typesData?.types.map((type: IType) => ({
  //   label: type.name,
  //   value: type.id,
  // }));

  const imageStyles = {
    width: "100%",
    height: "100%",
  };

  const typesFields = [
    {
      label: typeItemLabels.image,
      node: (
        <img
          src={getImageUrl(type?.image?.filename)}
          alt=""
          style={imageStyles}
        />
      ),
    },
    {
      name: typeItemDataIndexes.name,
      label: typeItemLabels.name,
      node: <Input defaultValue={type.name} />,
    },
    {
      name: typeItemDataIndexes.url,
      label: typeItemLabels.url,
      node: <Input defaultValue={type.url} />,
    },
  ];

  const formItems = typesFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return formItems;
};
