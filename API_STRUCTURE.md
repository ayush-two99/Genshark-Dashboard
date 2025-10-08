# Genshark AI Visibility Dashboard - API Documentation

## Overview
This document provides comprehensive API specifications for the Genshark AI Visibility Dashboard backend. The dashboard monitors AI brand mentions across LLM platforms, tracks visibility metrics, and provides analytics for AI-related content performance.

## Base Configuration

### Base URL
```
https://api.genshark.ai/v1
```

### Authentication
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: 24 hours
- **Refresh Token**: Available via `/auth/refresh`

### Rate Limiting
- **Standard**: 1000 requests/hour per user
- **Premium**: 5000 requests/hour per user
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Core Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'analyst' | 'admin';
  organizationId: string;
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  timezone: string;
  dateFormat: string;
  notifications: NotificationSettings;
}
```

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  kpiScore: number;
  alertCount: number;
  status: 'active' | 'paused' | 'archived';
  createdAt: string;
  updatedAt: string;
  settings: ProjectSettings;
}

interface ProjectSettings {
  monitoringEnabled: boolean;
  alertThresholds: AlertThresholds;
  trackedKeywords: string[];
  competitorTracking: boolean;
}
```

### Alert
```typescript
interface Alert {
  id: string;
  projectId: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'performance' | 'content' | 'technical' | 'competitor' | 'visibility';
  createdAt: string;
  resolvedAt?: string;
  resolved: boolean;
  metadata: AlertMetadata;
}

interface AlertMetadata {
  previousValue?: number;
  currentValue?: number;
  threshold?: number;
  source?: string;
  platform?: string;
}
```

---

## API Endpoints

## 1. Authentication & User Management

### POST /auth/login
**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "analyst",
      "organizationId": "org_456"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 86400
    }
  }
}
```

### POST /auth/refresh
**Description**: Refresh access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /auth/me
**Description**: Get current user information

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "analyst",
      "organizationId": "org_456",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLoginAt": "2024-12-21T10:30:00Z",
      "preferences": {
        "timezone": "UTC",
        "dateFormat": "YYYY-MM-DD",
        "notifications": {
          "email": true,
          "push": false,
          "sms": false
        }
      }
    }
  }
}
```

---

## 2. Projects Management

### GET /projects
**Description**: Get all projects for the authenticated user

**Query Parameters**:
- `status` (optional): Filter by status (`active`, `paused`, `archived`)
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`name`, `kpiScore`, `createdAt`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)

**Response**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj_123",
        "name": "Website SEO",
        "description": "SEO monitoring for main website",
        "kpiScore": 78,
        "alertCount": 5,
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-12-21T10:30:00Z",
        "settings": {
          "monitoringEnabled": true,
          "alertThresholds": {
            "visibilityDrop": 10,
            "mentionDrop": 20
          },
          "trackedKeywords": ["AI", "machine learning", "automation"],
          "competitorTracking": true
        }
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

### GET /projects/{projectId}
**Description**: Get specific project details

**Response**:
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "proj_123",
      "name": "Website SEO",
      "description": "SEO monitoring for main website",
      "kpiScore": 78,
      "alertCount": 5,
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-21T10:30:00Z",
      "settings": {
        "monitoringEnabled": true,
        "alertThresholds": {
          "visibilityDrop": 10,
          "mentionDrop": 20
        },
        "trackedKeywords": ["AI", "machine learning", "automation"],
        "competitorTracking": true
      }
    }
  }
}
```

### GET /projects/{projectId}/insights
**Description**: Get project insights and signals

**Query Parameters**:
- `type` (optional): Signal type (`traffic`, `engagement`, `llm`)
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)
- `granularity` (optional): Data granularity (`hour`, `day`, `week`, `month`)

**Response**:
```json
{
  "success": true,
  "data": {
    "signals": [
      {
        "id": "signal_123",
        "type": "llm",
        "date": "2024-12-21T00:00:00Z",
        "value": 4789,
        "metadata": {
          "platform": "ChatGPT",
          "queryType": "brand_mention",
          "sentiment": "positive"
        }
      }
    ],
    "summary": {
      "totalSignals": 150,
      "averageValue": 3245,
      "trend": "increasing",
      "trendPercentage": 12.5
    }
  }
}
```

---

## 3. Alerts Management

### GET /alerts
**Description**: Get all alerts for the authenticated user

**Query Parameters**:
- `projectId` (optional): Filter by project ID
- `severity` (optional): Filter by severity (`low`, `medium`, `high`, `critical`)
- `status` (optional): Filter by status (`resolved`, `unresolved`)
- `category` (optional): Filter by category
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "alert_123",
        "projectId": "proj_123",
        "message": "AI mention velocity dropped 12% in last 24h",
        "severity": "medium",
        "type": "warning",
        "category": "performance",
        "createdAt": "2024-12-21T08:30:00Z",
        "resolved": false,
        "metadata": {
          "previousValue": 4500,
          "currentValue": 3960,
          "threshold": 4000,
          "source": "ChatGPT",
          "platform": "OpenAI"
        }
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    },
    "summary": {
      "totalAlerts": 150,
      "unresolvedCount": 45,
      "criticalCount": 3,
      "highCount": 12
    }
  }
}
```

### POST /alerts/{alertId}/resolve
**Description**: Mark an alert as resolved

**Request Body**:
```json
{
  "resolutionNote": "Investigated and found temporary dip in mentions"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "alert": {
      "id": "alert_123",
      "resolved": true,
      "resolvedAt": "2024-12-21T10:30:00Z",
      "resolutionNote": "Investigated and found temporary dip in mentions"
    }
  }
}
```

---

## 4. Content Lab & Analysis

### GET /content-lab
**Description**: Get content analysis results

**Query Parameters**:
- `minScore` (optional): Minimum score filter (0-100)
- `maxScore` (optional): Maximum score filter (0-100)
- `url` (optional): Filter by URL pattern
- `title` (optional): Filter by title pattern
- `sortBy` (optional): Sort field (`score`, `title`, `url`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "content_123",
        "url": "https://example.com/ai-prompt-engineering",
        "title": "AI Prompt Engineering Best Practices",
        "score": 95,
        "analysis": {
          "readability": 85,
          "seoScore": 92,
          "aiRelevance": 98,
          "keywordDensity": 2.3,
          "sentiment": "positive"
        },
        "metrics": {
          "views": 31200,
          "mentions": 1247,
          "engagement": 89,
          "shareOfVoice": 15.2
        },
        "lastAnalyzed": "2024-12-21T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 500,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    },
    "summary": {
      "averageScore": 78.5,
      "highPerformingContent": 45,
      "needsImprovement": 23
    }
  }
}
```

### POST /content-lab/analyze
**Description**: Analyze new content URL

**Request Body**:
```json
{
  "url": "https://example.com/new-article",
  "title": "New AI Article",
  "keywords": ["AI", "machine learning"]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "analysisId": "analysis_123",
    "status": "processing",
    "estimatedCompletionTime": "2024-12-21T10:05:00Z"
  }
}
```

---

## 5. Experiments & A/B Testing

### GET /experiments
**Description**: Get all experiments

**Query Parameters**:
- `status` (optional): Filter by status (`running`, `completed`, `paused`)
- `projectId` (optional): Filter by project
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "success": true,
  "data": {
    "experiments": [
      {
        "id": "exp_123",
        "name": "AI Prompt Optimization",
        "description": "Testing different AI prompt structures",
        "status": "running",
        "projectId": "proj_123",
        "metrics": {
          "conversionRate": 12.5,
          "visitors": 1250,
          "baselineConversion": 10.2,
          "improvement": 22.5
        },
        "variants": [
          {
            "id": "variant_a",
            "name": "Control",
            "traffic": 50,
            "conversionRate": 10.2
          },
          {
            "id": "variant_b",
            "name": "Optimized Prompt",
            "traffic": 50,
            "conversionRate": 12.5
          }
        ],
        "startDate": "2024-12-01T00:00:00Z",
        "endDate": "2024-12-31T23:59:59Z",
        "createdAt": "2024-11-30T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

---

## 6. Analytics & Insights

### GET /analytics/overview
**Description**: Get dashboard overview metrics

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`, `1y`)
- `projectId` (optional): Filter by specific project

**Response**:
```json
{
  "success": true,
  "data": {
    "kpis": {
      "visibilityScore": {
        "value": 92,
        "change": 18,
        "changeType": "increase",
        "trend": "positive"
      },
      "llmMentions": {
        "value": 4789,
        "change": 23,
        "changeType": "increase",
        "trend": "positive"
      },
      "shareOfVoice": {
        "value": 67.3,
        "change": 8,
        "changeType": "increase",
        "trend": "positive"
      },
      "trafficImpact": {
        "value": 34,
        "change": 12,
        "changeType": "increase",
        "trend": "positive"
      }
    },
    "visibilityTrend": [
      {
        "date": "2024-12-15T00:00:00Z",
        "visibility": 78,
        "mentions": 2847,
        "traffic": 18420
      }
    ],
    "platformDistribution": [
      {
        "name": "ChatGPT",
        "value": 42,
        "mentions": 2011,
        "traffic": 13104
      }
    ],
    "topQueries": [
      {
        "query": "how to optimize AI prompts for better results",
        "mentions": 1247,
        "change": 18,
        "source": "AI Weekly"
      }
    ],
    "recentAlerts": [
      {
        "id": "alert_123",
        "message": "AI mention velocity dropped 12% in last 24h",
        "severity": "medium",
        "time": "2 hours ago"
      }
    ]
  }
}
```

### GET /analytics/traffic
**Description**: Get traffic analytics data

**Query Parameters**:
- `timeRange` (optional): Time range
- `granularity` (optional): Data granularity (`hour`, `day`, `week`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": {
    "traffic": [
      {
        "date": "2024-12-15T00:00:00Z",
        "organic": 18420,
        "direct": 12340,
        "referral": 8560,
        "social": 4230,
        "total": 43550
      }
    ],
    "summary": {
      "totalTraffic": 312000,
      "averageDaily": 44571,
      "growthRate": 23.5,
      "topSource": "organic"
    }
  }
}
```

### GET /analytics/engagement
**Description**: Get engagement metrics

**Response**:
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "metric": "AI Query Success",
        "value": 92,
        "fullMark": 100,
        "trend": "increasing"
      },
      {
        "metric": "Response Accuracy",
        "value": 88,
        "fullMark": 100,
        "trend": "stable"
      },
      {
        "metric": "User Satisfaction",
        "value": 85,
        "fullMark": 100,
        "trend": "increasing"
      },
      {
        "metric": "Platform Adoption",
        "value": 78,
        "fullMark": 100,
        "trend": "increasing"
      },
      {
        "metric": "Feature Usage",
        "value": 82,
        "fullMark": 100,
        "trend": "stable"
      },
      {
        "metric": "AI Integration",
        "value": 95,
        "fullMark": 100,
        "trend": "increasing"
      }
    ]
  }
}
```

### GET /analytics/llm-signals
**Description**: Get LLM platform performance data

**Response**:
```json
{
  "success": true,
  "data": {
    "platforms": [
      {
        "name": "ChatGPT",
        "mentions": 4789,
        "traffic": 31200,
        "engagement": 92,
        "marketShare": 42
      },
      {
        "name": "Claude",
        "mentions": 3245,
        "traffic": 20150,
        "engagement": 88,
        "marketShare": 28
      }
    ],
    "summary": {
      "totalMentions": 13290,
      "totalTraffic": 86400,
      "averageEngagement": 87.5
    }
  }
}
```

---

## 7. Reports & Export

### GET /reports/content-performance
**Description**: Get content performance report

**Query Parameters**:
- `startDate` (required): Report start date
- `endDate` (required): Report end date
- `format` (optional): Export format (`json`, `csv`, `pdf`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "title": "AI Prompt Engineering Best Practices",
        "views": 31200,
        "mentions": 1247,
        "score": 95,
        "engagement": 89,
        "shareOfVoice": 15.2,
        "traffic": 24560
      }
    ],
    "summary": {
      "totalContent": 150,
      "averageScore": 78.5,
      "totalViews": 2500000,
      "totalMentions": 45000
    },
    "exportUrl": "https://api.genshark.ai/v1/exports/report_123.pdf"
  }
}
```

### POST /reports/generate
**Description**: Generate custom report

**Request Body**:
```json
{
  "name": "Monthly AI Visibility Report",
  "type": "visibility",
  "startDate": "2024-12-01T00:00:00Z",
  "endDate": "2024-12-31T23:59:59Z",
  "projectIds": ["proj_123", "proj_456"],
  "metrics": ["visibility", "mentions", "traffic"],
  "format": "pdf",
  "schedule": {
    "frequency": "monthly",
    "dayOfMonth": 1
  }
}
```

---

## 8. System & Configuration

### GET /system/status
**Description**: Get system health status

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.2.0",
    "uptime": 86400,
    "services": {
      "database": "healthy",
      "cache": "healthy",
      "queue": "healthy",
      "monitoring": "healthy"
    },
    "metrics": {
      "activeUsers": 1250,
      "totalRequests": 150000,
      "averageResponseTime": 150
    }
  }
}
```

### GET /system/metrics
**Description**: Get system performance metrics

**Response**:
```json
{
  "success": true,
  "data": {
    "requests": {
      "total": 150000,
      "perMinute": 250,
      "errors": 15,
      "errorRate": 0.01
    },
    "performance": {
      "averageResponseTime": 150,
      "p95ResponseTime": 300,
      "p99ResponseTime": 500
    },
    "resources": {
      "cpuUsage": 45.2,
      "memoryUsage": 67.8,
      "diskUsage": 23.1
    }
  }
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      }
    ],
    "requestId": "req_123456789"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid request parameters
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMITED` (429): Rate limit exceeded
- `INTERNAL_ERROR` (500): Internal server error
- `SERVICE_UNAVAILABLE` (503): Service temporarily unavailable

---

## Notes for Backend Team

### Performance Considerations
1. **Caching Strategy**:
   - Cache KPI data for 5 minutes
   - Cache chart data for 1 hour
   - Cache user preferences indefinitely
   - Use Redis for session storage

2. **Database Optimization**:
   - Index on `projectId`, `createdAt`, `severity` for alerts
   - Index on `date`, `type` for signals
   - Partition large tables by date
   - Use read replicas for analytics queries

3. **Large Dataset Handling**:
   - Implement pagination for all list endpoints
   - Use cursor-based pagination for time-series data
   - Implement data archiving for old records
   - Consider data aggregation for historical data

### Security Requirements
1. **Authentication**:
   - Implement JWT with RS256 algorithm
   - Use secure HTTP-only cookies for refresh tokens
   - Implement token rotation
   - Add rate limiting per user/IP

2. **Authorization**:
   - Role-based access control (RBAC)
   - Project-level permissions
   - API key management for integrations
   - Audit logging for all operations

3. **Data Protection**:
   - Encrypt sensitive data at rest
   - Use HTTPS for all communications
   - Implement input validation and sanitization
   - Add CORS configuration

### Monitoring & Observability
1. **Metrics**:
   - Track API response times
   - Monitor error rates
   - Track user activity patterns
   - Monitor resource usage

2. **Logging**:
   - Structured logging with correlation IDs
   - Log all API requests/responses
   - Log authentication events
   - Log data access patterns

3. **Alerting**:
   - Alert on high error rates
   - Alert on slow response times
   - Alert on authentication failures
   - Alert on resource usage thresholds

### Integration Points
1. **External APIs**:
   - LLM platform APIs (OpenAI, Anthropic, etc.)
   - Social media APIs for mention tracking
   - Analytics platforms (Google Analytics, etc.)
   - Email service providers

2. **Data Sources**:
   - Real-time mention tracking
   - Web scraping for content analysis
   - Social media monitoring
   - Search engine APIs

### Scalability Considerations
1. **Horizontal Scaling**:
   - Stateless API design
   - Load balancer configuration
   - Database sharding strategy
   - Microservices architecture

2. **Data Processing**:
   - Async processing for heavy operations
   - Queue-based job processing
   - Batch processing for analytics
   - Real-time data streaming

This API documentation provides a comprehensive foundation for implementing the Genshark AI Visibility Dashboard backend. The endpoints are designed to be RESTful, scalable, and maintainable while providing all the functionality required by the frontend dashboard.
