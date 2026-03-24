"""Stub module - Agent subsystem removed. Only entity classes retained for plugin compatibility."""

from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field

from core.tools.entities.common_entities import I18nObject


class AgentStrategyParameter(BaseModel):
    class AgentStrategyParameterType(StrEnum):
        STRING = "string"
        NUMBER = "number"
        BOOLEAN = "boolean"
        SELECT = "select"
        SECRET_INPUT = "secret-input"
        FILE = "file"
        FILES = "files"
        MODEL_SELECTOR = "model-selector"
        APP_SELECTOR = "app-selector"
        TOOL_SELECTOR = "tool-selector"
        TOOLS_SELECTOR = "tools-selector"

    name: str = ""
    label: I18nObject | None = None
    type: AgentStrategyParameterType = AgentStrategyParameterType.STRING
    required: bool = False
    default: Any = None
    options: list[dict[str, Any]] = Field(default_factory=list)
    help: I18nObject | None = None
    min: float | None = None
    max: float | None = None


class AgentStrategyIdentity(BaseModel):
    name: str = ""
    provider: str = ""
    label: I18nObject | None = None
    description: I18nObject | None = None
    icon: str = ""


class AgentStrategyEntity(BaseModel):
    identity: AgentStrategyIdentity | None = None
    parameters: list[AgentStrategyParameter] = Field(default_factory=list)


class AgentStrategyProviderIdentity(BaseModel):
    name: str = ""
    label: I18nObject | None = None
    description: I18nObject | None = None
    icon: str = ""


class AgentStrategyProviderEntity(BaseModel):
    identity: AgentStrategyProviderIdentity | None = None
    strategies: list[AgentStrategyEntity] = Field(default_factory=list)


class AgentProviderEntityWithPlugin(AgentStrategyProviderEntity):
    plugin_unique_identifier: str | None = None
    plugin_id: str | None = None
