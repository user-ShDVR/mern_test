import React from "react";

import { Form, Input, InputNumber, Select } from "antd";

import { DefaultOptionType } from "antd/es/select";

import { AddCharacteristicsInfo } from "components/AddCharacteristicsInfo/AddCharacteristicsInfo";
import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useGetImagesQuery } from "store/api/images/images-api";
import { useGetTypesQuery } from "store/api/types/types-api";

import {
  productItemDataIndexes,
  productItemLabels,
} from "constants/products-constants";
import {
  DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "constants/types-constants";

import { getImageUrl } from "utils/get-image-url";

import { IProduct } from "types/IProduct";
import { IType } from "types/IType";

interface IAddOrEditProductFieldsProps {
  productFields: IProduct;
}

export const useGetAddOrEditProductFields = (
  props: IAddOrEditProductFieldsProps
) => {
  const { productFields } = props;

  const [characteristics, setCharacteristics] = React.useState(
    productFields.characteristics ?? []
  );

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const searchedTypesOptions = (enteredValue: string, option) => {
    return option.label.toLowerCase().includes(enteredValue.toLowerCase());
  };

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id,
  }));

  const { data: imagesData } = useGetImagesQuery(null);

  const imageOptions = imagesData?.map((image) => ({
    label: image.filename,
    value: image.id,
  }));

  const renderImageOption = (imageOption: DefaultOptionType) => (
    <div className={styles.imageOptionWrapper} key={imageOption.value}>
      <img
        className={styles.imageInOption}
        src={getImageUrl(imageOption.data.label)}
        alt=""
      />
      {imageOption.label}
    </div>
  );

  const productsFields = [
    {
      label: productItemLabels.image,
      name: productItemDataIndexes.image_id,
      node: (
        <Select
          defaultValue={productFields?.image?.id}
          options={imageOptions}
          optionRender={renderImageOption}
        />
      ),
    },
    {
      name: productItemDataIndexes.name,
      label: productItemLabels.name,
      node: <Input defaultValue={productFields?.name} />,
    },
    {
      name: productItemDataIndexes.description,
      label: productItemLabels.description,
      node: (
        <Input.TextArea defaultValue={productFields?.description} rows={4} />
      ),
    },
    {
      name: productItemDataIndexes.price,
      label: productItemLabels.price,
      node: <InputNumber defaultValue={productFields?.price} />,
    },
    {
      name: productItemDataIndexes.type_id,
      label: productItemLabels.type,
      node: (
        <Select
          defaultValue={productFields?.type?.name}
          options={typesOptions}
          showSearch
          filterOption={searchedTypesOptions}
        />
      ),
    },
    {
      label: productItemLabels.characteristics,
      node: (
        <AddCharacteristicsInfo
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
      ),
    },
  ];

  const FormItems = productsFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems, characteristics };
};
