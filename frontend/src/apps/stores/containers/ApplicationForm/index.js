// @flow
import React from 'react';
import autoBind from 'react-autobind';
import { Formik } from 'formik';

import TextField from 'common/components/inputs/TextField';
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
    return (
      <Formik onSubmit={this.onSubmit}>
        {({ handleChange, handleSubmit, isSubmitting }) => (
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
