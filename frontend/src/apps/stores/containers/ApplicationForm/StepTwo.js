import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import ImageUploadPreview from 'common/components/inputs/ImageUploadPreview';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import { postWithFiles } from 'helpers/rest';
import {
  StyledForm,
  FieldCont,
  SpinnerCont,
  ErrorCont,
  LoadingTextCont,
} from './styled';

class StepTwo extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      images: [],
    };
  }

  async onSubmit(values, { setSubmitting, setFieldError }) {
    const resp = await postWithFiles(
      `stores/applications/${this.props.applicationId}/images/`,
      values,
      {
        images: this.state.images,
      }
    );
    if (resp.ok) {
      window.location.replace(
        `/application/success?pub_date=${resp.data.pub_date}`
      );
    } else {
      setFieldError(
        'nonFieldErrors',
        gettext(
          'Unknown error. Please contact us via email ira@holo-apollo.art or Instagram @holo.apollo.art'
        ) + `. Error code: ${resp.status}`
      );
      setSubmitting(false);
    }
  }

  validate() {
    let errors = {};
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

  formRenderer({ errors, handleSubmit, isSubmitting }) {
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
          <Button type="submit" width={250} disabled={isSubmitting}>
            {gettext('Create application')}
          </Button>
        </StyledForm>
      </Fragment>
    );
  }

  render() {
    return (
      <Formik onSubmit={this.onSubmit} validate={this.validate}>
        {this.formRenderer}
      </Formik>
    );
  }
}

export default StepTwo;
