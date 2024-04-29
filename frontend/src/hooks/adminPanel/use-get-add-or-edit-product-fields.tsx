import { Form, Input, InputNumber, Select, Table } from "antd";
import {
  characteristicsListColumns,
  productItemDataIndexes,
  productItemLabels,
} from "../../constants/products-constants";
import { IProduct } from "../../types/IProduct";
import { useGetTypesQuery } from "../../store/api/types/types-api";
import { IImage, IType } from "../../types/ICatalogElement";
import { getImageUrl } from "../../utils/get-image-url";
import {
  DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "../../constants/types-constants";
import { useGetImagesQuery } from "../../store/api/images/images-api";
import styles from "../../components/AdminPanel/AdminPanelTab.module.scss";
import { AddCharacteristicsInfo } from "../../components/AddCharacteristicsInfo/AddCharacteristicsInfo";
import React from "react";

export const useGetAddOrEditProductFields = (product: IProduct) => {
  const [characteristics, setCharacteristics] = React.useState([]);

  const { data: typesData } = useGetTypesQuery({
    page: DEFAULT_TYPES_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_TYPES_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const { data: imagesData } = useGetImagesQuery(null);

  const searchedTypesOptions = (enteredValue: string, option) => {
    return option.label.toLowerCase().includes(enteredValue.toLowerCase());
  };

  const typesOptions = typesData?.types.map((type: IType) => ({
    label: type.name,
    value: type.id,
  }));

  const imageOptions = imagesData?.map((image: IImage) => ({
    label: image.filename,
    value: image.id,
  }));

  const renderImageOption = (image) => (
    <div className={styles.imageOptionWrapper} key={image.value}>
      <img
        className={styles.imageInOption}
        src={getImageUrl(image.label)}
        alt=""
      />
      {image.label}
    </div>
  );

  const productsFields = [
    {
      label: productItemLabels.image,
      name: productItemDataIndexes.image_id,
      node: (
        // <img
        //   src={getImageUrl(product?.image?.filename)}
        //   alt=""
        //   style={imageStyles}
        // />
        <Select
          defaultValue={product.image?.id}
          options={imageOptions}
          optionRender={renderImageOption}
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
          filterOption={searchedTypesOptions}
        />
      ),
    },
    {
      label: productItemLabels.characteristics,
      node: (
        // <Table
        //   columns={characteristicsListColumns}
        //   dataSource={characteristics}
        //   pagination={false}
        //   showHeader={false}
        //   size="small"
        //   bordered
        // />
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
