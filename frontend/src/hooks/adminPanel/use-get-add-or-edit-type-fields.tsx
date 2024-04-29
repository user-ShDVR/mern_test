import { Form, Input } from "antd";
import {
  typeItemDataIndexes,
  typeItemLabels,
} from "../../constants/types-constants";
import { IType } from "../../types/ICatalogElement";
import { getImageUrl } from "../../utils/get-image-url";

interface UseGetAddOrEditTypeFieldsProps {
  typeFields: IType;
  isAddMode?: boolean;
  isEditMode?: boolean;
}

export const useGetAddOrEditTypeFields = (
  props: UseGetAddOrEditTypeFieldsProps
) => {
  const { typeFields, isAddMode, isEditMode } = props;

  const imageStyles = {
    width: "100%",
    height: "100%",
  };

  const typesFields = [
    {
      label: typeItemLabels.image,
      node: (
        <img
          src={getImageUrl(typeFields?.image?.filename)}
          alt=""
          style={imageStyles}
        />
      ),
    },
    {
      name: typeItemDataIndexes.name,
      label: typeItemLabels.name,
      node: <Input defaultValue={typeFields.name} />,
    },
    {
      name: typeItemDataIndexes.url,
      label: typeItemLabels.url,
      node: <Input defaultValue={typeFields.url} />,
    },
  ];

  const formItems = typesFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return formItems;
};
