"""Stub for removed RAG extract processor."""

SUPPORT_URL_CONTENT_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
]


class ExtractProcessor:
    """Stub class for removed ExtractProcessor."""

    @staticmethod
    def load_from_url(url: str, return_text: bool = False) -> str:
        raise RuntimeError("RAG ExtractProcessor has been removed")
