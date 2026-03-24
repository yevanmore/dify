"""Stub module - datasource provider service for compatibility."""

from typing import Any


class DatasourceProviderService:
    def get_datasource_credentials(
        self,
        tenant_id: str,
        provider: str,
        plugin_id: str,
        credential_id: str | None = None,
    ) -> dict[str, Any] | None:
        return None
