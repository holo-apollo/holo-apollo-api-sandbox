import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import TextField from 'common/components/inputs/TextField';
import Select from 'common/components/inputs/Select';
import TextFieldWithCounter from 'common/components/inputs/TextFieldWithCounter';
import Checkbox from 'common/components/inputs/Checkbox';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import { validateEmail, validateLength } from 'helpers/validators';
import { api } from 'helpers/rest';
import {
  StyledForm,
  FieldCont,
  SpinnerCont,
  ErrorCont,
  StepOneCont,
} from './styled';

class StepOne extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      submitAttempted: false,
    };
  }

  async onSubmit(values, { setSubmitting, setFieldError }) {
    const { applicationId } = this.props;
    let resp;
    if (applicationId) {
      resp = await api.put(`stores/applications/${applicationId}/`, values);
    } else {
      resp = await api.post('stores/applications/', values);
    }
    if (resp.ok) {
      this.props.onSuccess(resp.data.id);
    } else {
      if (resp.data) {
        Object.keys(resp.data).forEach(field => {
          setFieldError(field, resp.data[field][0]);
        });
      } else {
        setFieldError(
          'nonFieldErrors',
          gettext(
            'Unknown error. Please contact us via email ira@holo-apollo.art or Instagram @holo.apollo.art'
          ) + `. Error code: ${resp.status}`
        );
      }
    }
    setSubmitting(false);
  }

  validate(values) {
    this.setState({ submitAttempted: true });
    const errors = {};
    const requiredFields = [
      'name',
      'email',
      'instagram_name',
      'category',
      'selling_goods',
      'goods_description',
      'philosophy',
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = gettext('This field is required');
      }
    });
    if (!validateEmail(values.email)) {
      errors.email = gettext('Please enter a valid email address');
    }
    if (!values.data_usage_agreement) {
      errors.data_usage_agreement = gettext(
        'You must allow your data usage to create application'
      );
    }
    ['goods_description', 'philosophy'].forEach(field => {
      if (!validateLength(values[field], 1000, 100)) {
        errors[field] = gettext(
          'Please write at least 100 symbols, but not more than 1000'
        );
      }
    });
    return errors;
  }

  formRenderer({
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  }) {
    const categoryOptions = [
      { value: 'clothes', label: gettext('Clothes') },
      { value: 'jewelry', label: gettext('Jewelry') },
      { value: 'accessories', label: gettext('Accessories') },
      { value: 'home_decor', label: gettext('Home decor') },
      { value: 'shoes', label: gettext('Shoes') },
      { value: 'other', label: gettext('Other') },
    ];

    return (
      <Fragment>
        {isSubmitting && (
          <SpinnerCont>
            <DoubleBounceSpinner />
          </SpinnerCont>
        )}
        <StyledForm onSubmit={handleSubmit} isSubmitting={isSubmitting}>
          {errors.nonFieldErrors && (
            <ErrorCont>{errors.nonFieldErrors}</ErrorCont>
          )}
          <FieldCont>
            <TextField
              name="name"
              label={gettext('What is your name?')}
              onChange={handleChange}
              maxLength={61}
              errorText={errors.name}
            />
          </FieldCont>
          <FieldCont>
            <TextField
              name="email"
              type="email"
              label={gettext('Email to reach you out')}
              onChange={handleChange}
              maxLength={254}
              errorText={errors.email}
            />
          </FieldCont>
          <FieldCont>
            <TextField
              name="instagram_name"
              label={gettext('@Name in Instagram')}
              onChange={handleChange}
              maxLength={254}
              errorText={errors.instagram_name}
            />
          </FieldCont>
          <FieldCont>
            <Select
              name="category"
              label={gettext('Category')}
              options={categoryOptions}
              onChange={handleChange}
              errorText={errors.category}
            />
          </FieldCont>
          <FieldCont>
            <TextFieldWithCounter
              name="selling_goods"
              label={gettext("What's being sold in your store?")}
              multiline={true}
              maxLength={500}
              onChange={handleChange}
              errorText={errors.selling_goods}
            />
          </FieldCont>
          <FieldCont>
            <TextFieldWithCounter
              name="goods_description"
              label={gettext('Describe your goods')}
              helperText={gettext('materials, technology, prices...')}
              multiline={true}
              maxLength={1000}
              onChange={handleChange}
              errorText={errors.goods_description}
            />
          </FieldCont>
          <FieldCont>
            <TextFieldWithCounter
              name="philosophy"
              label={gettext('Philosophy behind your store')}
              multiline={true}
              maxLength={1000}
              onChange={handleChange}
              errorText={errors.philosophy}
            />
          </FieldCont>
          <FieldCont>
            <Checkbox
              name="data_usage_agreement"
              label={gettext('I allow usage of data I provided')}
              errorText={errors.data_usage_agreement}
              onChange={e =>
                setFieldValue('data_usage_agreement', e.target.checked)
              }
            />
          </FieldCont>
          <Button type="submit" width={250} disabled={isSubmitting}>
            {this.props.applicationId
              ? gettext('Save changes')
              : gettext('Next step')}
          </Button>
        </StyledForm>
      </Fragment>
    );
  }

  render() {
    return (
      <StepOneCont visible={this.props.visible}>
        <Formik
          onSubmit={this.onSubmit}
          validate={this.validate}
          validateOnChange={this.state.submitAttempted}
          validateOnBlur={false}
        >
          {this.formRenderer}
        </Formik>
      </StepOneCont>
    );
  }
}

export default StepOne;
