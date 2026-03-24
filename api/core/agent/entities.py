"""Stub module - Agent subsystem removed. Only entity classes retained for compatibility."""

from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field


class AgentToolEntity(BaseModel):
    provider_type: str = ""
    provider_id: str = ""
    tool_name: str = ""
    tool_parameters: dict[str, Any] = Field(default_factory=dict)
    credential_id: str | None = None


class AgentPromptEntity(BaseModel):
    first_prompt: str = ""
    next_iteration: str = ""


class AgentEntity(BaseModel):
    class Strategy(StrEnum):
        CHAIN_OF_THOUGHT = "chain-of-thought"
        FUNCTION_CALLING = "function-calling"

    provider: str = ""
    model: str = ""
    strategy: Strategy = Strategy.CHAIN_OF_THOUGHT
    prompt: AgentPromptEntity | None = None
    tools: list[AgentToolEntity] = Field(default_factory=list)
    max_iteration: int = 10


class AgentScratchpadUnit(BaseModel):
    agent_response: str | None = None
    thought: str | None = None
    action_str: str = ""
    observation: str | None = None
    action: dict[str, Any] | None = None


class AgentInvokeMessage(BaseModel):
    """Stub for agent invoke message - mirrors ToolInvokeMessage shape."""

    class TextMessage(BaseModel):
        text: str

    class JsonMessage(BaseModel):
        json_object: dict | list

    class BlobMessage(BaseModel):
        blob: bytes

    class BlobChunkMessage(BaseModel):
        id: str = ""
        sequence: int = 0
        total_length: int = 0
        blob: bytes = b""
        end: bool = False

    class LogMessage(BaseModel):
        id: str = ""
        label: str = ""
        data: dict = Field(default_factory=dict)
        error: str | None = None
        status: str = ""
        parent_id: str | None = None
        metadata: dict = Field(default_factory=dict)

    type: str = ""
    message: TextMessage | JsonMessage | BlobMessage | BlobChunkMessage | LogMessage | None = None
    meta: dict[str, Any] | None = None
