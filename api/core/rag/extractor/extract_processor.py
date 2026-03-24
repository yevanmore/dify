"""Stub module - RAG subsystem removed."""

from typing import Any


class ExtractProcessor:
    @classmethod
    def extract(cls, *args: Any, **kwargs: Any) -> list:
        raise NotImplementedError("RAG subsystem has been removed")

    @classmethod
    def load_from_url(cls, url: str, return_text: bool = False) -> list | str:
        raise NotImplementedError("RAG subsystem has been removed")

    @classmethod
    def load_from_upload_file(cls, *args: Any, **kwargs: Any) -> list:
        raise NotImplementedError("RAG subsystem has been removed")
