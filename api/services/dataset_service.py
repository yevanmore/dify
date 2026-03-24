"""Stub module - RAG/Dataset subsystem removed."""

from typing import Any


class DatasetService:
    @staticmethod
    def get_dataset(dataset_id: str) -> Any:
        return None

    @staticmethod
    def check_dataset_permission(dataset: Any, user: Any) -> None:
        pass

    @staticmethod
    def check_dataset_operator_permission(user: Any = None, dataset: Any = None) -> None:
        pass


class DatasetCollectionBindingService:
    @staticmethod
    def get_dataset_collection_binding(*args: Any, **kwargs: Any) -> Any:
        return None

    @staticmethod
    def get_dataset_collection_binding_by_id_and_type(*args: Any, **kwargs: Any) -> Any:
        return None
