"""Stub for removed RAG pipeline entities."""

from pydantic import BaseModel


class IconInfo(BaseModel):
    class Config:
        extra = "allow"


class RagPipelineDatasetCreateEntity(BaseModel):
    class Config:
        extra = "allow"
