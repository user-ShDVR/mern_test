import { Form, Input, Select } from "antd";

import { DefaultOptionType } from "antd/es/select";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";

import { useGetImagesQuery } from "store/api/images/images-api";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general-constants";
import { typeItemDataIndexes, typeItemLabels } from "constants/types-constants";

import { getImageUrl } from "utils/get-image-url";

import { IType } from "types/IType";

interface IUseGetAddOrEditTypeFieldsProps {
  typeFields: IType;
  isEdit: boolean;
}

export const useGetAddOrEditTypeFields = (
  props: IUseGetAddOrEditTypeFieldsProps
) => {
  const { typeFields, isEdit } = props;

  const isRequired = isEdit ? false : true;

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

  const typesFields = [
    {
      name: typeItemDataIndexes.image_id,
      label: typeItemLabels.image,
      node: (
        <Select
          defaultValue={typeFields?.image?.id}
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
      name: typeItemDataIndexes.name,
      label: typeItemLabels.name,
      node: <Input defaultValue={typeFields.name} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} название`,
        },
      ],
    },
    {
      name: typeItemDataIndexes.url,
      label: typeItemLabels.url,
      node: <Input defaultValue={typeFields.url} />,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} ссылку латинскими буквами и без специальных знаков`,
          pattern: /^[a-zA-Z]+$/,
        },
      ],
    },
  ];

  const FormItems = typesFields.map((field) => (
    <Form.Item key={field.name} {...field}>
      {field.node}
    </Form.Item>
  ));

  return { FormItems };
};
