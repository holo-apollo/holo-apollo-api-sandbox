import factory

from users.models import HoloUser, Subscription


class HoloUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = HoloUser

    username = factory.Faker('word')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    phone = factory.Sequence(lambda n: f'+380099{n}')


class SubscriptionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Subscription

    email = factory.Faker('email')
