import factory

from users.models import HoloUser, Subscription


class HoloUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = HoloUser

    username = factory.Sequence(lambda n: f'Holouser-{n}')
    first_name = 'Jane'
    last_name = 'Doe'
    email = factory.Sequence(lambda n: f'holouser{n}@holo-apollo.art')
    phone = factory.Sequence(lambda n: f'+380099{n}')


class SubscriptionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Subscription

    email = factory.Sequence(lambda n: f'holouser{n}@holo-apollo.art')
