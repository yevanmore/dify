"""Stub for removed dataset config manager."""

from typing import Any


class DatasetConfigManager:
    """Stub class for removed DatasetConfigManager."""

    @classmethod
    def convert(cls, config: dict[str, Any]) -> Any:
        """No-op stub. Dataset config feature has been removed."""
        return None

    @classmethod
    def validate_and_set_defaults(cls, tenant_id: str, app_mode: Any, config: dict[str, Any]) -> tuple[dict, list]:
        """No-op stub."""
        return config, []
