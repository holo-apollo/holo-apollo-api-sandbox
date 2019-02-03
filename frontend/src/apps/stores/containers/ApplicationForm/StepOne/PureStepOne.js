// @flow
import React from 'react';
import { type FormikProps } from 'formik';
import type { IntlShape } from 'react-intl';

import type { SelectOption } from 'common/types';
import TextField from 'common/components/inputs/TextField';
import Select from 'common/components/inputs/Select';
import TextFieldWithCounter from 'common/components/inputs/TextFieldWithCounter';
import Checkbox from 'common/components/inputs/Checkbox';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import {
  StyledForm,
  FieldCont,
  SpinnerCont,
  ErrorCont,
  StepCont,
} from '../styled';
import messages from './messages';
import { TEXTAREAS_MAX_LENGTH } from './constants';
import type { Values } from './types';

type Props = FormikProps<Values> & {
  applicationId?: number,
  intl: IntlShape,
  visible: boolean,
  categoryOptions: SelectOption<string>[],
};

const PureStepOne = ({
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  submitCount,
  visible,
  applicationId,
  categoryOptions,
  intl: { formatMessage },
}: Props) => (
  <StepCont visible={visible}>
    {isSubmitting && (
      <SpinnerCont>
        <DoubleBounceSpinner />
      </SpinnerCont>
    )}
    <StyledForm onSubmit={handleSubmit} isSubmitting={isSubmitting}>
      {errors.nonFieldErrors && <ErrorCont>{errors.nonFieldErrors}</ErrorCont>}
      <FieldCont>
        <TextField
          name="name"
          label={formatMessage(messages.nameLabel)}
          onChange={handleChange}
          maxLength={61}
          errorText={submitCount > 0 ? errors.name : undefined}
        />
      </FieldCont>
      <FieldCont>
        <TextField
          name="email"
          type="email"
          label={formatMessage(messages.emailLabel)}
          onChange={handleChange}
          maxLength={254}
          errorText={submitCount > 0 ? errors.email : undefined}
        />
      </FieldCont>
      <FieldCont>
        <TextField
          name="instagram_name"
          label={formatMessage(messages.instagramNameLabel)}
          onChange={handleChange}
          maxLength={254}
          errorText={submitCount > 0 ? errors.instagram_name : undefined}
        />
      </FieldCont>
      <FieldCont>
        <Select
          name="category"
          label={formatMessage(messages.categoryLabel)}
          options={categoryOptions}
          onChange={handleChange}
          errorText={submitCount > 0 ? errors.category : undefined}
        />
      </FieldCont>
      <FieldCont>
        <TextFieldWithCounter
          name="selling_goods"
          label={formatMessage(messages.sellingGoodsLabel)}
          multiline={true}
          maxLength={500}
          onChange={handleChange}
          errorText={submitCount > 0 ? errors.selling_goods : undefined}
        />
      </FieldCont>
      <FieldCont>
        <TextFieldWithCounter
          name="goods_description"
          label={formatMessage(messages.goodsDescriptionLabel)}
          helperText={formatMessage(messages.goodsDescriptionHelpText)}
          multiline={true}
          maxLength={TEXTAREAS_MAX_LENGTH}
          onChange={handleChange}
          errorText={submitCount > 0 ? errors.goods_description : undefined}
        />
      </FieldCont>
      <FieldCont>
        <TextFieldWithCounter
          name="philosophy"
          label={formatMessage(messages.philosophyLabel)}
          multiline={true}
          maxLength={TEXTAREAS_MAX_LENGTH}
          onChange={handleChange}
          errorText={submitCount > 0 ? errors.philosophy : undefined}
        />
      </FieldCont>
      <FieldCont>
        <Checkbox
          name="data_usage_agreement"
          label={formatMessage(messages.dataUsageLabel)}
          errorText={submitCount > 0 ? errors.data_usage_agreement : undefined}
          onChange={e =>
            setFieldValue('data_usage_agreement', e.target.checked)
          }
        />
      </FieldCont>
      <Button type="submit" width={250} disabled={isSubmitting}>
        {applicationId
          ? formatMessage(messages.saveChanges)
          : formatMessage(messages.nextStep)}
      </Button>
    </StyledForm>
  </StepCont>
);

export default PureStepOne;
