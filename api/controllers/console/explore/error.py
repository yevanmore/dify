"""Stub module - Explore subsystem removed."""

from libs.exception import BaseHTTPException


class AppSuggestedQuestionsAfterAnswerDisabledError(BaseHTTPException):
    error_code = "app_suggested_questions_after_answer_disabled"
    description = "App Suggested Questions After Answer Disabled"
    code = 403
