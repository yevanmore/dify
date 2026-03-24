from flask import Blueprint
from flask_restx import Namespace

from libs.external_api import ExternalApi

bp = Blueprint("service_api", __name__, url_prefix="/v1")

api = ExternalApi(
    bp,
    version="1.0",
    title="Service API",
    description="API for application services",
)

service_api_ns = Namespace("service_api", description="Service operations", path="/")

from . import index
from .app import (
    app,
    conversation,
    file,
    file_preview,
    message,
    site,
    workflow,
)
from .end_user import end_user
from .workspace import models

__all__ = [
    "app",
    "conversation",
    "end_user",
    "file",
    "file_preview",
    "index",
    "message",
    "models",
    "site",
    "workflow",
]

api.add_namespace(service_api_ns)
