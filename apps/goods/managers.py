from django.db.models.manager import Manager


class GoodsCategoryManager(Manager):
    def main(self):
        return self.filter(parent_category__isnull=True)
