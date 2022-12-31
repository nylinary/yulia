from reasons.models import Reason
from django.core.management.base import BaseCommand


def read_reasons(path: str = "reasons_source.txt"):
    reasons = {}
    with open (path) as f:
        for line in f.readlines():
            if "#" not in line:
                item = line.split("^")
                reasons[item[0]] = item[1]

        return reasons


def create_reasons(reasons: dict):
    for reason in reasons.items():
        Reason.objects.get_or_create(name=reason[0], description=reason[1])


class Command(BaseCommand):
    help = "Создать функциональные и бизнес роли и назначить им права."

    def handle(self, *args, **options):
        create_reasons(read_reasons())