// @flow
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  unknownError: {
    id: 'Subscription.Unsubscribe.unknownError',
    defaultMessage: 'Oops! Something went wrong. Please try again in a moment.',
  },
  confirmUnsubscribe: {
    id: 'Subscription.Unsubscribe.confirmUnsubscribe',
    defaultMessage: 'Are you sure that you want to unsubscribe?',
  },
  yesUnsubscribe: {
    id: 'Subscription.Unsubscribe.yesUnsubscribe',
    defaultMessage: "Yes, I'm sure",
  },
  unsubscribeSuccess: {
    id: 'Subscription.Unsubscribe.unsubscribeSuccess',
    defaultMessage: 'You were unsubscribed.',
  },
  seeYouAgain: {
    id: 'Subscription.Unsubscribe.seeYouAgain',
    defaultMessage: 'Hope to see you again.',
  },
});

export default messages;
