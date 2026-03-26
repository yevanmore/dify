"""Stub for removed RAG built-in fields."""

from enum import StrEnum


class BuiltInField(StrEnum):
    document_name = "document_name"
    uploader = "uploader"
    upload_date = "upload_date"
    last_update_date = "last_update_date"
    source = "source"


# Mapping from data source type to display name
MetadataDataSource: dict[str, str] = {
    "upload_file": "Upload File",
    "notion_import": "Notion",
    "website_crawl": "Website",
}
