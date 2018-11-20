import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import TextField from 'common/components/inputs/TextField';
import Select from 'common/components/inputs/Select';
import TextFieldWithCounter from 'common/components/inputs/TextFieldWithCounter';
import ImageUploadPreview from 'common/components/inputs/ImageUploadPreview';
import Checkbox from 'common/components/inputs/Checkbox';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import { validateEmail, validateLength } from 'helpers/validators';
import { postWithFiles } from 'helpers/rest';
import {
  StyledForm,
  FieldCont,
  SpinnerCont,
  ErrorCont,
  LoadingTextCont,
} from './styled';

class ApplicationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      submitAttempted: false,
      images: [],
    };
  }

  async onSubmit(values, { setSubmitting, setFieldError }) {
    const resp = await postWithFiles('stores/applications/', values, {
      images: this.state.images,
    });
    if (resp.status === 201) {
      window.location.replace(
        `/application/success?pub_date=${resp.data.pub_date}`
      );
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
          )
        );
      }
      setSubmitting(false);
    }
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
    const imagesErrors = [];
    const nonImages = this.state.images.filter(
      item => !item.type.startsWith('image/')
    );
    if (nonImages.length) {
      const nonImagesNames = nonImages.map(item => item.name).join(', ');
      imagesErrors.push(
        gettext('Following files are not images: ') + nonImagesNames
      );
    }
    const imagesCount = this.state.images.length;
    const imagesSize = this.state.images.reduce(
      (acc, curr) => acc + curr.size,
      0
    );
    if (imagesCount < 5) {
      imagesErrors.push(gettext('Please choose at least 5 images'));
    } else if (imagesCount > 12) {
      imagesErrors.push(gettext('Please choose at most 12 images'));
    }
    if (imagesSize > 60 * 1024 * 1024) {
      imagesErrors.push(
        gettext(
          'Total size of images is too big. Maximum size is 60 MB, you uploaded '
        ) + `${Math.round(imagesSize / 1024 / 1024)}`
      );
    }
    if (imagesErrors.length) {
      errors.images = imagesErrors.join('. ');
    }
    return errors;
  }

  handleImagesChange(event) {
    const files = event.target.files;
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        newFiles.push(file);
      }
    }
    this.setState({ images: [...this.state.images, ...newFiles] });
  }

  handleImageRemove(file) {
    this.setState({
      images: this.state.images.filter(image => image !== file),
    });
  }

  formRenderer({
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  }) {
    const uploadHelpText = (
      <Fragment>
        <p>
          {gettext('At least 5 and at most 12 photos, total size up to 60 MB.')}
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
      <Fragment>
        {isSubmitting && (
          <SpinnerCont>
            <DoubleBounceSpinner />
            <LoadingTextCont>
              {gettext('We are loading your photos. Please wait a moment.')}
            </LoadingTextCont>
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
            <ImageUploadPreview
              name="images"
              label={gettext('Upload photos of your goods in good quality')}
              buttonText={gettext('Upload photos')}
              helperText={uploadHelpText}
              errorText={errors.images}
              onChange={this.handleImagesChange}
              onRemove={this.handleImageRemove}
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
        </StyledForm>
      </Fragment>
    );
  }

  render() {
    return (
      <Formik
        onSubmit={this.onSubmit}
        validate={this.validate}
        validateOnChange={this.state.submitAttempted}
        validateOnBlur={false}
      >
        {this.formRenderer}
      </Formik>
    );
  }
}

export default ApplicationForm;
