"""Stub module - RAG subsystem removed."""

from enum import StrEnum


class VectorType(StrEnum):
    QDRANT = "qdrant"
    MILVUS = "milvus"
    PGVECTOR = "pgvector"
    WEAVIATE = "weaviate"
    CHROMA = "chroma"
    ELASTICSEARCH = "elasticsearch"
    OPENSEARCH = "opensearch"
