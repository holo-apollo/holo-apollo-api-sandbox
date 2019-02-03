// @flow
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  unknownError: {
    id: 'ApplicationForm.StepOne.unknownError',
    defaultMessage:
      'Unknown error. Please contact us via email ira@holo-apollo.art or Instagram @holo.apollo.art. Error code: {errorCode}',
  },
  fieldRequired: {
    id: 'ApplicationForm.StepOne.fieldRequired',
    defaultMessage: 'This field is required',
  },
  invalidEmail: {
    id: 'ApplicationForm.StepOne.invalidEmail',
    defaultMessage: 'Please enter a valid email address',
  },
  usageAgreementRequired: {
    id: 'ApplicationForm.StepOne.usageAgreementRequired',
    defaultMessage: 'You must allow your data usage to create application',
  },
  invalidLength: {
    id: 'ApplicationForm.StepOne.invalidLength',
    defaultMessage:
      'Please write at least {minLength} symbols, but not more than {maxLength}',
  },
  nameLabel: {
    id: 'ApplicationForm.StepOne.nameLabel',
    defaultMessage: 'What is your name?',
  },
  emailLabel: {
    id: 'ApplicationForm.StepOne.emailLabel',
    defaultMessage: 'Email to reach you out',
  },
  instagramNameLabel: {
    id: 'ApplicationForm.StepOne.instagramNameLabel',
    defaultMessage: '@Name in Instagram',
  },
  categoryLabel: {
    id: 'ApplicationForm.StepOne.categoryLabel',
    defaultMessage: 'Category',
  },
  sellingGoodsLabel: {
    id: 'ApplicationForm.StepOne.sellingGoodsLabel',
    defaultMessage: "What's being sold in your store?",
  },
  goodsDescriptionLabel: {
    id: 'ApplicationForm.StepOne.goodsDescriptionLabel',
    defaultMessage: 'Describe your goods',
  },
  goodsDescriptionHelpText: {
    id: 'ApplicationForm.StepOne.goodsDescriptionHelpText',
    defaultMessage: 'materials, technology, prices...',
  },
  philosophyLabel: {
    id: 'ApplicationForm.StepOne.philosophyLabel',
    defaultMessage: 'Philosophy behind your store',
  },
  dataUsageLabel: {
    id: 'ApplicationForm.StepOne.dataUsageLabel',
    defaultMessage: 'I allow usage of data I provided',
  },
  saveChanges: {
    id: 'ApplicationForm.StepOne.saveChanges',
    defaultMessage: 'Save changes',
  },
  nextStep: {
    id: 'ApplicationForm.StepOne.nextStep',
    defaultMessage: 'Next step',
  },
});

export default messages;
