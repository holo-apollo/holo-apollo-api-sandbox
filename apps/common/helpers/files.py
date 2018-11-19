import logging
from tempfile import NamedTemporaryFile

logger = logging.getLogger(__name__)


def save_uploaded_file(in_memory_file):
    logger.info("Started saving file to disk")
    with NamedTemporaryFile(delete=False) as temp_file:
        for chunk in in_memory_file.chunks():
            temp_file.write(chunk)
        return temp_file.name
