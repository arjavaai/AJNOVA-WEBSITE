"""
Rate limiting middleware
Simple in-memory rate limiter
"""

from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from collections import defaultdict
import time
from typing import Dict, Tuple

from app.config import settings


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Simple rate limiting middleware"""
    
    def __init__(self, app):
        super().__init__(app)
        # Store: {ip: (request_count, window_start_time)}
        self.requests: Dict[str, Tuple[int, float]] = defaultdict(lambda: (0, time.time()))
        self.rate_limit = settings.RATE_LIMIT_REQUESTS
        self.time_window = settings.RATE_LIMIT_PERIOD
    
    async def dispatch(self, request: Request, call_next) -> Response:
        """Check rate limit before processing request"""
        
        # Skip rate limiting for health check and docs
        if request.url.path in ["/health", "/", "/api/docs", "/api/redoc"]:
            return await call_next(request)
        
        # Get client IP
        client_ip = request.client.host
        
        # Get current request count and window start
        request_count, window_start = self.requests[client_ip]
        current_time = time.time()
        
        # Reset window if time has passed
        if current_time - window_start > self.time_window:
            request_count = 0
            window_start = current_time
        
        # Check if rate limit exceeded
        if request_count >= self.rate_limit:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded. Max {self.rate_limit} requests per {self.time_window} seconds"
            )
        
        # Increment request count
        self.requests[client_ip] = (request_count + 1, window_start)
        
        # Process request
        response = await call_next(request)
        
        # Add rate limit headers
        response.headers["X-RateLimit-Limit"] = str(self.rate_limit)
        response.headers["X-RateLimit-Remaining"] = str(self.rate_limit - request_count - 1)
        response.headers["X-RateLimit-Reset"] = str(int(window_start + self.time_window))
        
        return response


















