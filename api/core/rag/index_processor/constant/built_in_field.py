"""Stub module - RAG subsystem removed. Only constants retained for model compatibility."""


class BuiltInField:
    document_name = "document_name"
    uploader = "uploader"
    upload_date = "upload_date"
    last_update_date = "last_update_date"
    source = "source"


MetadataDataSource: dict[str, str] = {
    "upload_file": "upload_file",
    "notion_import": "notion_import",
    "website_crawl": "website_crawl",
}
