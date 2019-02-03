// @flow
import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik, type FormikActions, type FormikProps } from 'formik';
import type { IntlShape } from 'react-intl';

import ImageUploadPreview from 'common/components/inputs/ImageUploadPreview';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import { requestWithFiles } from 'helpers/rest';
import messages from './messages';
import { MIN_IMAGES, MAX_IMAGES, MAX_IMAGES_SIZE } from './constants';
import {
  StyledForm,
  FieldCont,
  SpinnerCont,
  ErrorCont,
  LoadingTextCont,
  StepCont,
} from '../styled';

type FileChoiceEvent = SyntheticInputEvent<HTMLInputElement>;

type Props = {
  applicationId: number,
  visible: boolean,
  intl: IntlShape,
};

type State = {
  images: File[],
};

type Values = {};

class StepTwo extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind(this);
    this.state = {
      images: [],
    };
  }

  async onSubmit(
    values: Values,
    { setSubmitting, setFieldError }: FormikActions<Values>
  ) {
    const {
      applicationId,
      intl: { formatMessage },
    } = this.props;
    const resp = await requestWithFiles(
      'put',
      `stores/applications/${applicationId}/images/`,
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
        formatMessage(messages.unknownError, { errorCode: resp.status })
      );
      setSubmitting(false);
    }
  }

  validate() {
    const formatMessage = this.props.intl.formatMessage;
    let errors = {};
    const imagesErrors = [];
    const nonImages = this.state.images.filter(
      item => !item.type.startsWith('image/')
    );
    if (nonImages.length) {
      const nonImagesNames = nonImages.map(item => item.name).join(', ');
      imagesErrors.push(
        formatMessage(messages.invalidImages, { nonImagesNames })
      );
    }
    const imagesCount = this.state.images.length;
    const imagesSize = this.state.images.reduce(
      (acc, curr) => acc + curr.size,
      0
    );
    if (imagesCount < MIN_IMAGES) {
      imagesErrors.push(
        formatMessage(messages.tooFewImages, { minNumber: MIN_IMAGES })
      );
    } else if (imagesCount > MAX_IMAGES) {
      imagesErrors.push(
        formatMessage(messages.tooManyImages, { maxNumber: MAX_IMAGES })
      );
    }
    if (imagesSize > MAX_IMAGES_SIZE * 1024 * 1024) {
      imagesErrors.push(
        formatMessage(messages.tooBigImages, {
          maxSize: MAX_IMAGES_SIZE,
          actualSize: Math.round(imagesSize / 1024 / 1024),
        })
      );
    }
    if (imagesErrors.length) {
      errors.images = imagesErrors.join('. ');
    }
    return errors;
  }

  handleImagesChange(event: FileChoiceEvent) {
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

  handleImageRemove(file: File) {
    this.setState({
      images: this.state.images.filter(image => image !== file),
    });
  }

  formRenderer({ errors, handleSubmit, isSubmitting }: FormikProps<Values>) {
    const formatMessage = this.props.intl.formatMessage;

    const uploadHelpText = (
      <Fragment>
        <p>
          {formatMessage(messages.imagesHelpText1, {
            minNumber: MIN_IMAGES,
            maxNumber: MAX_IMAGES,
            maxSize: MAX_IMAGES_SIZE,
          })}
        </p>
        <p>{formatMessage(messages.imagesHelpText2)}</p>
      </Fragment>
    );

    return (
      <Fragment>
        {isSubmitting && (
          <SpinnerCont>
            <DoubleBounceSpinner />
            <LoadingTextCont>
              {formatMessage(messages.loadingText)}
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
              label={formatMessage(messages.imagesLabel)}
              buttonText={formatMessage(messages.imagesButtonText)}
              helperText={uploadHelpText}
              errorText={errors.images}
              onChange={this.handleImagesChange}
              onRemove={this.handleImageRemove}
            />
          </FieldCont>
          <Button type="submit" width={250} disabled={isSubmitting}>
            {formatMessage(messages.submitButtonText)}
          </Button>
        </StyledForm>
      </Fragment>
    );
  }

  render() {
    return (
      <StepCont visible={this.props.visible}>
        <Formik onSubmit={this.onSubmit} validate={this.validate}>
          {this.formRenderer}
        </Formik>
      </StepCont>
    );
  }
}

export default StepTwo;
