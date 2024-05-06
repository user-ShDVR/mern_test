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
import { searchedOptions } from "utils/searched-option";

import { IProduct } from "types/IProduct";
import { IType } from "types/IType";

interface IAddOrEditProductFieldsProps {
  productFields: IProduct;
  isEdit: boolean;
}

export const useGetAddOrEditProductFields = (
  props: IAddOrEditProductFieldsProps
) => {
  const { productFields, isEdit } = props;

  const isRequired = isEdit ? false : true;

  const [characteristics, setCharacteristics] = React.useState(
    productFields.characteristics ?? []
  );

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

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
      required: isRequired,
    },
    {
      name: productItemDataIndexes.name,
      label: productItemLabels.name,
      node: <Input defaultValue={productFields?.name} />,
      required: isRequired,
    },
    {
      name: productItemDataIndexes.description,
      label: productItemLabels.description,
      node: (
        <Input.TextArea defaultValue={productFields?.description} rows={4} />
      ),
      required: isRequired,
    },
    {
      name: productItemDataIndexes.price,
      label: productItemLabels.price,
      node: <InputNumber defaultValue={productFields?.price} />,
      required: isRequired,
    },
    {
      name: productItemDataIndexes.type_id,
      label: productItemLabels.type,
      node: (
        <Select
          defaultValue={productFields?.type?.name}
          options={typesOptions}
          showSearch
          filterOption={searchedOptions}
        />
      ),
      required: isRequired,
    },
    {
      label: productItemLabels.characteristics,
      node: (
        <AddCharacteristicsInfo
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
      ),
      required: isRequired,
    },
  ];

  const FormItems = productsFields.map((field, index) => (
    <Form.Item key={index} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems, characteristics };
};
