"""Stub for removed knowledge entities. Provides minimal types so existing imports don't break."""

from enum import StrEnum

from pydantic import BaseModel


class ParentMode(StrEnum):
    FULL_DOC = "full-doc"
    PARAGRAPH = "paragraph"
    CUSTOM = "custom"


class Rule(BaseModel):
    class Config:
        extra = "allow"


class ProcessRule(BaseModel):
    class Config:
        extra = "allow"


class RetrievalModel(BaseModel):
    class Config:
        extra = "allow"


class Segmentation(BaseModel):
    class Config:
        extra = "allow"


class DataSource(BaseModel):
    class Config:
        extra = "allow"


class InfoList(BaseModel):
    class Config:
        extra = "allow"


class NotionIcon(BaseModel):
    class Config:
        extra = "allow"


class NotionInfo(BaseModel):
    class Config:
        extra = "allow"


class NotionPage(BaseModel):
    class Config:
        extra = "allow"


class PreProcessingRule(BaseModel):
    class Config:
        extra = "allow"


class RerankingModel(BaseModel):
    class Config:
        extra = "allow"


class WebsiteInfo(BaseModel):
    class Config:
        extra = "allow"


class WeightKeywordSetting(BaseModel):
    class Config:
        extra = "allow"


class WeightModel(BaseModel):
    class Config:
        extra = "allow"


class WeightVectorSetting(BaseModel):
    class Config:
        extra = "allow"


class MetadataArgs(BaseModel):
    class Config:
        extra = "allow"


class SegmentUpdateArgs(BaseModel):
    class Config:
        extra = "allow"


class SegmentCreateArgs(BaseModel):
    class Config:
        extra = "allow"


class ChildChunkUpdateArgs(BaseModel):
    class Config:
        extra = "allow"
