# Generated by Django 2.1.7 on 2019-02-27 20:01

import django.contrib.postgres.fields.citext
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_color_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='color',
            name='definition',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='color',
            name='definition_en',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='color',
            name='definition_ru',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='color',
            name='definition_uk',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='size',
            name='definition',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='size',
            name='definition_en',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='size',
            name='definition_ru',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='size',
            name='definition_uk',
            field=django.contrib.postgres.fields.citext.CICharField(max_length=30, null=True, unique=True, verbose_name='Definition'),
        ),
    ]
