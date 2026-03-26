"""Stub for removed RAG document models."""

from typing import Any

from pydantic import BaseModel, Field


class Document(BaseModel):
    """Minimal stub replacing the original RAG Document."""

    page_content: str = ""
    metadata: dict[str, Any] = Field(default_factory=dict)


class ChildDocument(BaseModel):
    """Minimal stub replacing the original RAG ChildDocument."""

    page_content: str = ""
    metadata: dict[str, Any] = Field(default_factory=dict)
