"""Stub for removed datasource entities. Provides minimal types so existing imports don't break."""

from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field

from core.tools.entities.common_entities import I18nObject


class DatasourceProviderType(StrEnum):
    """Stub enum for datasource provider types."""
    WEBSITE_CRAWL = "website_crawl"
    ONLINE_DOCUMENT = "online_document"
    LOCAL_FILE = "local_file"


class DatasourceMessage(BaseModel):
    """Stub for DatasourceMessage."""
    class Config:
        extra = "allow"


class WebsiteCrawlMessage(BaseModel):
    """Stub for WebsiteCrawlMessage."""
    class Config:
        extra = "allow"


class WebSiteInfo(BaseModel):
    """Stub for WebSiteInfo."""
    class Config:
        extra = "allow"


class OnlineDocumentPagesMessage(BaseModel):
    """Stub for OnlineDocumentPagesMessage."""
    class Config:
        extra = "allow"


class GetOnlineDocumentPageContentRequest(BaseModel):
    """Stub for GetOnlineDocumentPageContentRequest."""
    class Config:
        extra = "allow"


class OnlineDriveBrowseFilesRequest(BaseModel):
    """Stub for OnlineDriveBrowseFilesRequest."""
    class Config:
        extra = "allow"


class OnlineDriveBrowseFilesResponse(BaseModel):
    """Stub for OnlineDriveBrowseFilesResponse."""
    class Config:
        extra = "allow"


class OnlineDriveDownloadFileRequest(BaseModel):
    """Stub for OnlineDriveDownloadFileRequest."""
    class Config:
        extra = "allow"


class DatasourceIdentity(BaseModel):
    author: str = ""
    name: str = ""
    label: I18nObject = Field(default_factory=I18nObject)
    provider: str = ""
    icon: str = ""
    description: I18nObject = Field(default_factory=I18nObject)


class DatasourceEntity(BaseModel):
    identity: DatasourceIdentity = Field(default_factory=DatasourceIdentity)
    parameters: list = Field(default_factory=list)
    description: I18nObject = Field(default_factory=I18nObject)
    output_schema: dict[str, Any] | None = None

    class Config:
        extra = "allow"


class DatasourceProviderIdentity(BaseModel):
    author: str = ""
    name: str = ""
    label: I18nObject = Field(default_factory=I18nObject)
    icon: str = ""
    description: I18nObject = Field(default_factory=I18nObject)


class DatasourceProviderEntity(BaseModel):
    identity: DatasourceProviderIdentity = Field(default_factory=DatasourceProviderIdentity)
    credentials_schema: list = Field(default_factory=list)
    provider_type: str = ""
    datasources: list[DatasourceEntity] = Field(default_factory=list)
    plugin_id: str = ""

    class Config:
        extra = "allow"


class DatasourceProviderEntityWithPlugin(DatasourceProviderEntity):
    """Extended stub with plugin fields."""
    class Config:
        extra = "allow"
