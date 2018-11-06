# Generated by Django 2.0.2 on 2018-08-27 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0001_initial'),
        ('goods', '0004_auto_20180826_1829'),
    ]

    operations = [
        migrations.AddField(
            model_name='good',
            name='seller',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='goods', to='stores.Store'),
            preserve_default=False,
        ),
    ]