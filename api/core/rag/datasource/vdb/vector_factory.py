"""Stub module - RAG subsystem removed."""

from typing import Any


class Vector:
    def __init__(self, *args: Any, **kwargs: Any):
        pass

    def create(self, *args: Any, **kwargs: Any) -> Any:
        raise NotImplementedError("RAG subsystem has been removed")

    def delete(self, *args: Any, **kwargs: Any) -> None:
        raise NotImplementedError("RAG subsystem has been removed")

    def search_by_vector(self, *args: Any, **kwargs: Any) -> list:
        raise NotImplementedError("RAG subsystem has been removed")

    def delete_by_ids(self, *args: Any, **kwargs: Any) -> None:
        raise NotImplementedError("RAG subsystem has been removed")

    def delete_by_metadata_field(self, *args: Any, **kwargs: Any) -> None:
        raise NotImplementedError("RAG subsystem has been removed")
