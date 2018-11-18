import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import TextField from 'common/components/inputs/TextField';
import Select from 'common/components/inputs/Select';
import TextFieldWithCounter from 'common/components/inputs/TextFieldWithCounter';
import ImageUploadPreview from 'common/components/inputs/ImageUploadPreview';
import Checkbox from 'common/components/inputs/Checkbox';
import Button from 'common/components/buttons/Button';
import { validateEmail, validateLength } from 'helpers/validators';
import { FieldCont } from './styled';

class ApplicationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      submitAttempted: false,
    };
  }

  onSubmit(values, { setSubmitting }) {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
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
      if (!validateLength(values[field], 1000, 500)) {
        errors[field] = gettext(
          'Please write at least 500 symbols, but not more than 1000.'
        );
      }
    });
    return errors;
  }

  render() {
    const uploadHelpText = (
      <Fragment>
        <p>
          {gettext('At least 5 and at most 30 photos, total size up to 150MB.')}
        </p>
        <p>
          {gettext(
            'Photos will be used in a collage, therefore some of them should have minimal, neutral background.'
          )}
        </p>
      </Fragment>
    );

    const categoryOptions = [
      { value: 'clothes', label: gettext('Clothes') },
      { value: 'jewelry', label: gettext('Jewelry') },
      { value: 'accessories', label: gettext('Accessories') },
      { value: 'home_decor', label: gettext('Home decor') },
      { value: 'shoes', label: gettext('Shoes') },
      { value: 'other', label: gettext('Other') },
    ];

    return (
      <Formik
        onSubmit={this.onSubmit}
        validate={this.validate}
        validateOnChange={this.state.submitAttempted}
        validateOnBlur={false}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
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
              <ImageUploadPreview
                name="images"
                label={gettext('Upload photos of your goods in good quality')}
                buttonText={gettext('Upload photos')}
                helperText={uploadHelpText}
                errorText={errors.images}
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
              {gettext('Create application')}
            </Button>
          </form>
        )}
      </Formik>
    );
  }
}

export default ApplicationForm;
