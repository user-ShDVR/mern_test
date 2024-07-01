import React from "react";

import { Form, Input, InputNumber, Select } from "antd";

import { DefaultOptionType } from "antd/es/select";

import { AddCharacteristicsInfoTable } from "components/AddCharacteristicsInfoTable/AddCharacteristicsInfoTable";
import { ImageInCard } from "components/ImageInCard/ImageInCard";

import { useGetImagesQuery } from "store/api/images/images-api";
import { useGetTypesQuery } from "store/api/types/types-api";

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_VALIDATE_MESSAGE,
} from "constants/general-constants";
import {
  adminProductFieldsDataIndexes,
  adminProductFieldsLabels,
} from "constants/products-constants";

import { searchedOptions } from "utils/searched-option";

import { IProduct, IProductCharacteristics } from "types/IProduct";
import { IType } from "types/IType";

interface IProductFieldsProps {
  productFields: IProduct;
  isEdit: boolean;
  styles: Record<string, string>;
}

export const useGetProductFields = (props: IProductFieldsProps) => {
  const { productFields, isEdit, styles } = props;

  const isRequired = isEdit ? false : true;

  const [editingRowKey, setEditingRowKey] = React.useState("");
  const [characteristics, setCharacteristics] = React.useState<
    IProductCharacteristics[]
  >([]);

  const isEditingInProgress = editingRowKey !== "";

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_CURRENT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
  });

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id.toString(),
  }));

  const { data: imagesData } = useGetImagesQuery();

  const imageOptions = imagesData?.images.map((image) => ({
    label: image.filename,
    value: image.id.toString(),
  }));

  const renderImageOption = (imageOption: DefaultOptionType) => (
    <div className={styles.imageOptionWrapper} key={imageOption.value}>
      <ImageInCard
        className={styles.imageInOption}
        imageUrl={imageOption.data.label}
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
      node: (
        <Select
          defaultValue={productFields?.image?.id}
          options={imageOptions}
          optionRender={renderImageOption}
        />
      ),
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
        <AddCharacteristicsInfoTable
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
