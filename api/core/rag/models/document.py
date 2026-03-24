"""Stub module - RAG subsystem removed. Only data classes retained for compatibility."""

from typing import Any

from pydantic import BaseModel, Field


class Document(BaseModel):
    page_content: str = ""
    metadata: dict[str, Any] = Field(default_factory=dict)
    provider: str = "dify"
    knowledge_id: str | None = None


class ChildDocument(BaseModel):
    page_content: str = ""
    metadata: dict[str, Any] = Field(default_factory=dict)


class AttachmentDocument(BaseModel):
    page_content: str = ""
    metadata: dict[str, Any] = Field(default_factory=dict)
