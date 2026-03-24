from importlib import import_module

from flask import Blueprint
from flask_restx import Namespace

from libs.external_api import ExternalApi

bp = Blueprint("console", __name__, url_prefix="/console/api")

api = ExternalApi(
    bp,
    version="1.0",
    title="Console API",
    description="Console management APIs for app configuration, monitoring, and administration",
)

console_ns = Namespace("console", description="Console management API operations", path="/")

RESOURCE_MODULES = (
    "controllers.console.app.app_import",
    "controllers.console.files",
    "controllers.console.remote_files",
)

for module_name in RESOURCE_MODULES:
    import_module(module_name)

# Ensure resource modules are imported so route decorators are evaluated.
# Import other controllers
from . import (
    admin,
    apikey,
    extension,
    feature,
    human_input_form,
    init_validate,
    ping,
    setup,
    spec,
    version,
)

# Import app controllers
from .app import (
    app,
    audio,
    conversation,
    conversation_variables,
    generator,
    mcp_server,
    message,
    model_config,
    ops_trace,
    site,
    statistic,
    workflow,
    workflow_app_log,
    workflow_draft_variable,
    workflow_run,
    workflow_statistic,
    workflow_trigger,
)

# Import auth controllers
from .auth import (
    activate,
    data_source_bearer_auth,
    data_source_oauth,
    email_register,
    forgot_password,
    login,
    oauth,
    oauth_server,
)

# Import billing controllers
from .billing import billing, compliance

# Import tag controllers
from .tag import tags

# Import workspace controllers
from .workspace import (
    account,
    endpoint,
    load_balancing_config,
    members,
    model_providers,
    models,
    plugin,
    tool_providers,
    trigger_providers,
    workspace,
)

api.add_namespace(console_ns)

__all__ = [
    "account",
    "activate",
    "admin",
    "api",
    "apikey",
    "app",
    "audio",
    "billing",
    "bp",
    "compliance",
    "console_ns",
    "conversation",
    "conversation_variables",
    "data_source_bearer_auth",
    "data_source_oauth",
    "email_register",
    "endpoint",
    "extension",
    "feature",
    "forgot_password",
    "generator",
    "human_input_form",
    "init_validate",
    "load_balancing_config",
    "login",
    "mcp_server",
    "members",
    "message",
    "model_config",
    "model_providers",
    "models",
    "oauth",
    "oauth_server",
    "ops_trace",
    "ping",
    "plugin",
    "setup",
    "site",
    "spec",
    "statistic",
    "tags",
    "tool_providers",
    "trigger_providers",
    "version",
    "workflow",
    "workflow_app_log",
    "workflow_draft_variable",
    "workflow_run",
    "workflow_statistic",
    "workflow_trigger",
    "workspace",
]
