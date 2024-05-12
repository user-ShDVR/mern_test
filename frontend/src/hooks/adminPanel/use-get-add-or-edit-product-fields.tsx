import React from "react";

import { Form, Input, InputNumber, Select } from "antd";

import { DefaultOptionType } from "antd/es/select";

import { AddCharacteristicsInfo } from "components/AddCharacteristicsInfo/AddCharacteristicsInfo";
import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useGetImagesQuery } from "store/api/images/images-api";
import { useGetTypesQuery } from "store/api/types/types-api";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import {
  adminProductFieldsDataIndexes,
  adminProductFieldsLabels,
} from "constants/products-constants";
import {
  DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "constants/types-constants";

import { getImageUrl } from "utils/get-image-url";
import { searchedOptions } from "utils/searched-option";

import { ICharacteristicsInfoRow } from "types/ICharacteristicsInfoRow";
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

  const [editingRowKey, setEditingRowKey] = React.useState("");
  const [characteristics, setCharacteristics] = React.useState<
    ICharacteristicsInfoRow[]
  >([]);

  const isEditingInProgress = editingRowKey !== "";

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id.toString(),
  }));

  const { data: imagesData } = useGetImagesQuery(null);

  const imageOptions = imagesData?.images.map((image) => ({
    label: image.filename,
    value: image.id.toString(),
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

  const InputNumberStyles = {
    width: "100%",
  };

  const productsFields = [
    {
      label: adminProductFieldsLabels.image,
      name: adminProductFieldsDataIndexes.image_id,
      node: <Select options={imageOptions} optionRender={renderImageOption} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} ссылку на картинку`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.name,
      label: adminProductFieldsLabels.name,
      node: <Input defaultValue={productFields?.name} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} название`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.description,
      label: adminProductFieldsLabels.description,
      node: (
        <Input.TextArea defaultValue={productFields?.description} rows={4} />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} описание`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.price,
      label: adminProductFieldsLabels.price,
      node: (
        <InputNumber
          defaultValue={productFields?.price}
          style={InputNumberStyles}
        />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} цену`,
        },
      ],
    },
    {
      name: adminProductFieldsDataIndexes.type_id,
      label: adminProductFieldsLabels.type,
      node: (
        <Select
          defaultValue={productFields?.type?.name}
          options={typesOptions}
          showSearch
          filterOption={searchedOptions}
        />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} категорию`,
        },
      ],
    },
    {
      label: adminProductFieldsLabels.characteristics,
      node: (
        <AddCharacteristicsInfo
          characteristics={productFields.characteristics ?? []}
          setCharacteristics={setCharacteristics}
          editingRowKey={editingRowKey}
          setEditingRowKey={setEditingRowKey}
          isEditingInProgress={isEditingInProgress}
        />
      ),
    },
  ];

  const FormItems = productsFields.map((field, index) => (
    <Form.Item key={index} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems, characteristics, isEditingInProgress };
};
