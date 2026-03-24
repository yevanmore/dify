"""Stub module - RAG subsystem removed. Only constants retained for model compatibility."""

from enum import StrEnum


class RetrievalMethod(StrEnum):
    SEMANTIC_SEARCH = "semantic_search"
    FULL_TEXT_SEARCH = "full_text_search"
    KEYWORD_SEARCH = "keyword_search"
    HYBRID_SEARCH = "hybrid_search"
