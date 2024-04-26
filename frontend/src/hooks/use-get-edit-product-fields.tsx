import { Form, Input, InputNumber, Select, Table } from "antd";
import {
  characteristicsListColumns,
  productItemDataIndexes,
  productItemLabels,
} from "../constants/products-constants";
import { IProduct } from "../types/IProduct";
import { useGetTypesQuery } from "../store/api/types/types-api";
import { IType } from "../types/ICatalogElement";
import { getImageUrl } from "../utils/get-image-url";

export const useGetEditProductFields = (product: IProduct) => {
  const { data: typesData } = useGetTypesQuery({ page: 1, limit: 100000 });

  console.log(product);

  const searchedOptions = (enteredValue: string, option) => {
    return option.label.toLowerCase().includes(enteredValue.toLowerCase());
  };

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id,
  }));

  const imageStyles = {
    width: "100%",
    height: "100%",
  };

  const productsFields = [
    {
      label: productItemLabels.image,
      node: (
        <img
          src={getImageUrl(product?.image?.filename)}
          alt=""
          style={imageStyles}
        />
      ),
    },
    {
      name: productItemDataIndexes.name,
      label: productItemLabels.name,
      node: <Input defaultValue={product.name} />,
    },
    {
      name: productItemDataIndexes.description,
      label: productItemLabels.description,
      node: <Input.TextArea defaultValue={product.description} rows={4} />,
    },
    {
      name: productItemDataIndexes.price,
      label: productItemLabels.price,
      node: <InputNumber defaultValue={product.price} />,
    },
    {
      name: productItemDataIndexes.category,
      label: productItemLabels.category,
      node: (
        <Select
          defaultValue={product.type?.name}
          options={typesOptions}
          showSearch
          filterOption={searchedOptions}
        />
      ),
    },
    {
      label: productItemLabels.characteristics,
      node: (
        <Table
          columns={characteristicsListColumns}
          dataSource={product.characteristics}
          pagination={false}
          showHeader={false}
          size="small"
          bordered
        />
      ),
    },
  ];

  const formItems = productsFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return formItems;
};
