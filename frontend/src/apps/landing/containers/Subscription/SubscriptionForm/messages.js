// @flow
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  emptyEmail: {
    id: 'Subscription.SubscriptionForm.emptyEmail',
    defaultMessage: 'Please type your email',
  },
  invalidEmail: {
    id: 'Subscription.SubscriptionForm.invalidEmail',
    defaultMessage: "Oops... There's a mistake. Please type a valid email",
  },
  unknownError: {
    id: 'Subscription.SubscriptionForm.unknownError',
    defaultMessage: 'Oops! Something went wrong. Please try again in a moment.',
  },
  getNotified: {
    id: 'Subscription.SubscriptionForm.getNotified',
    defaultMessage: "Get notified when it's ready",
  },
  emailPlaceholder: {
    id: 'Subscription.SubscriptionForm.emailPlaceholder',
    defaultMessage: 'Email',
  },
  buttonText: {
    id: 'Subscription.SubscriptionForm.buttonText',
    defaultMessage: 'Subscribe',
  },
  subscribeSuccess: {
    id: 'Subscription.SubscriptionForm.subscribeSuccess',
    defaultMessage: 'You were subscribed successfully!',
  },
  seeYa: {
    id: 'Subscription.SubscriptionForm.seeYa',
    defaultMessage: 'See ya!',
  },
  alreadySubscribed: {
    id: 'Subscription.SubscriptionForm.alreadySubscribed',
    defaultMessage:
      'Looks like you are already subscribed. Thank you for being with us!',
  },
});

export default messages;
