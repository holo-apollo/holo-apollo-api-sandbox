import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import TextField from 'common/components/inputs/TextField';
import TextFieldWithCounter from 'common/components/inputs/TextFieldWithCounter';
import ImageUploadPreview from 'common/components/inputs/ImageUploadPreview';
import Checkbox from 'common/components/inputs/Checkbox';
import Button from 'common/components/buttons/Button';
import { FieldCont } from './styled';

class ApplicationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onSubmit(values, { setSubmitting }) {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
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

    return (
      <Formik onSubmit={this.onSubmit}>
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
              />
            </FieldCont>
            <FieldCont>
              <TextField
                name="email"
                type="email"
                label={gettext('Email to reach you out')}
                onChange={handleChange}
              />
            </FieldCont>
            <FieldCont>
              <TextField
                name="instagram_name"
                label={gettext('@Name in Instagram')}
                onChange={handleChange}
              />
            </FieldCont>
            <FieldCont>
              <TextFieldWithCounter
                name="selling_goods"
                label={gettext("What's being sold in your store?")}
                multiline={true}
                maxLength={500}
                onChange={handleChange}
              />
            </FieldCont>
            <FieldCont>
              <TextFieldWithCounter
                name="goods_description"
                label={gettext(
                  'Describe your goods (materials, technology, prices...)'
                )}
                multiline={true}
                maxLength={1000}
                onChange={handleChange}
              />
            </FieldCont>
            <FieldCont>
              <TextFieldWithCounter
                name="philosophy"
                label={gettext('Philosophy behind your store')}
                multiline={true}
                maxLength={1000}
                onChange={handleChange}
              />
            </FieldCont>
            <FieldCont>
              <ImageUploadPreview
                name="images"
                label={gettext('Upload photos of your goods in good quality')}
                buttonText={gettext('Upload photos')}
                helpText={uploadHelpText}
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
