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
  role: 'viewer' | 'editor' | 'manager' | 'admin';
  status: 'active' | 'invited' | 'suspended';
  createdAt?: string;
  lastLoginAt?: string;
  avatar?: string;
  permissions?: string[];
}

interface UserPreferences {
  timezone: string;
  dateFormat: string;
  notifications: NotificationSettings;
}
```

### Organization
```typescript
interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  seats: number;
  usedSeats: number;
  billing: {
    nextInvoice: string;
    paymentMethod: string;
    amount: number;
    currency: string;
    interval: string;
  };
  security: {
    twoFactorEnabled: boolean;
    ssoEnabled: boolean;
    ssoProvider?: string;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSymbols: boolean;
    };
  };
  settings: {
    timezone: string;
    dateFormat: string;
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}
```

### UserProfile
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  role: string;
  createdAt?: string;
  lastLoginAt?: string;
  timezone?: string;
  language?: string;
}
```

### UserPreferences
```typescript
interface UserPreferences {
  id: string;
  emailAlerts: boolean;
  weeklyReports: boolean;
  experimentNotifications: boolean;
  darkMode: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  updatedAt?: string;
}
```

### ApiKey
```typescript
interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  lastUsed: string;
  createdAt: string;
  expiresAt: string;
  permissions: string[];
  isActive: boolean;
}
```

### BillingInfo
```typescript
interface BillingInfo {
  id: string;
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  };
  paymentMethod: {
    id: string;
    type: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  };
  subscription: {
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    canceledAt?: string;
  };
  invoices: Invoice[];
  nextInvoice: string;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  downloadUrl: string;
}
```

### Project
interface Project {
  id: number;
  name: string;
  kpi_score: number;
  alerts: number;
  status: 'active' | 'paused' | 'archived';
  lastUpdated: string;
  visibility: number;
  mentions: number;
  description: string;
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

### ContentItem
```typescript
interface ContentItem {
  id: string;
  title: string;
  url: string;
  score?: number;
  body?: string;
}
```

### Experiment
```typescript
interface Experiment {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  conversionRate: number;
  visitors?: number;
  startDate?: string;
  endDate?: string;
  description?: string;
  createdAt?: string;
  variants?: ExperimentVariant[];
}

interface ExperimentVariant {
  id: string;
  name: string;
  traffic: number;
  conversionRate: number;
}
```

### Alert
```typescript
interface Alert {
  id: string;
  projectId: number;
  message: string;
  severity: 'low' | 'medium' | 'high';
  type: 'warning' | 'info' | 'success' | 'error';
  category: 'performance' | 'content' | 'technical' | 'competitor';
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
  metadata?: Record<string, any>;
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

**Used In**:
- Page: `/auth/sign-in`
- Component(s): `SigninWithPassword.tsx`, `GoogleSigninButton.tsx`
- Fields consumed: `user.id`, `user.name`, `user.email`, `user.role`, `tokens.accessToken`, `tokens.refreshToken`

### POST /auth/refresh
**Description**: Refresh access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Used In**:
- Page: Global authentication (handled by auth context)
- Component(s): `useFetch.ts` hook, authentication middleware
- Fields consumed: `tokens.accessToken`, `tokens.refreshToken`

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

**Used In**:
- Page: `/profile`
- Component(s): `user-info/index.tsx` (header component)
- Fields consumed: `user.name`, `user.email`, `user.role`, `user.preferences.timezone`, `user.preferences.notifications`

---

## 2. Projects Management

### GET /projects
**Description**: Get all projects for the authenticated user

**Query Parameters**:
- `status` (optional): Filter by status (`active`, `paused`, `archived`)
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`name`, `kpi_score`, `alerts`, `lastUpdated`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)
- `search` (optional): Search by project name

**Response**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": 1,
        "name": "TechReviewer Website",
        "kpi_score": 85,
        "alerts": 3,
        "status": "active",
        "lastUpdated": "2024-01-15",
        "visibility": 78,
        "mentions": 245,
        "description": "SEO monitoring for main website",
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
    },
    "summary": {
      "totalProjects": 25,
      "activeProjects": 18,
      "totalAlerts": 45,
      "averageKpiScore": 78
    }
  }
}
```

**Used In**:
- Page: `/projects`
- Component(s): Projects table, project stats cards
- Fields consumed: `projects[].id`, `projects[].name`, `projects[].kpi_score`, `projects[].alerts`, `projects[].status`, `projects[].lastUpdated`, `projects[].visibility`, `projects[].mentions`, `summary.totalProjects`, `summary.activeProjects`, `summary.totalAlerts`, `summary.averageKpiScore`

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

**Used In**:
- Page: Project detail views, project settings
- Component(s): Project detail components, settings forms
- Fields consumed: All project fields including `settings.trackedKeywords`, `settings.alertThresholds`

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

**Used In**:
- Page: `/insights`
- Component(s): Chart components, signal analysis components
- Fields consumed: `signals[].date`, `signals[].value`, `signals[].type`, `signals[].metadata.platform`, `summary.trend`, `summary.trendPercentage`

---

## 3. Alerts Management

### GET /alerts
**Description**: Get all alerts for the Alerts page

**Query Parameters**:
- `severity` (optional): Filter by severity (`low`, `medium`, `high`)
- `status` (optional): Filter by status (`resolved`, `unresolved`)
- `category` (optional): Filter by category (`performance`, `content`, `technical`, `competitor`)
- `type` (optional): Filter by type (`warning`, `info`, `success`, `error`)
- `projectId` (optional): Filter by project
- `search` (optional): Search by message content
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`createdAt`, `severity`, `type`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)

**Response**:
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "1",
        "projectId": 1,
        "message": "Mentions dropped below 50 in the last 7 days",
        "severity": "medium",
        "type": "warning",
        "category": "performance",
        "createdAt": "2024-01-15T10:30:00Z",
        "resolved": false,
        "resolvedAt": null,
        "metadata": {
          "threshold": 50,
          "currentValue": 45,
          "timeframe": "7d"
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
      "totalAlerts": 25,
      "unresolvedAlerts": 18,
      "highPriorityAlerts": 5,
      "resolvedAlerts": 7
    }
  }
}
```

**Used In**:
- Page: `/alerts`
- Component(s): Alerts list, alert cards, stats cards, filters
- Fields consumed: `alerts[].id`, `alerts[].projectId`, `alerts[].message`, `alerts[].severity`, `alerts[].type`, `alerts[].category`, `alerts[].createdAt`, `alerts[].resolved`, `summary.totalAlerts`, `summary.unresolvedAlerts`, `summary.highPriorityAlerts`, `summary.resolvedAlerts`

### POST /alerts/{alertId}/resolve
**Description**: Mark an alert as resolved

**Request Body**:
```json
{
  "resolved": true,
  "resolvedAt": "2024-12-21T10:30:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "resolved": true,
    "resolvedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/alerts`
- Component(s): Alert resolution controls (CheckCircle button)
- Fields consumed: `id`, `resolved`, `resolvedAt`

### DELETE /alerts/{alertId}
**Description**: Delete an alert

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "deleted": true
  }
}
```

**Used In**:
- Page: `/alerts`
- Component(s): Alert delete controls (X button)
- Fields consumed: `id`, `deleted`

### POST /alerts
**Description**: Create a new alert

**Request Body**:
```json
{
  "projectId": 1,
  "message": "Custom alert message",
  "severity": "medium",
  "type": "warning",
  "category": "performance"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "7",
    "projectId": 1,
    "message": "Custom alert message",
    "severity": "medium",
    "type": "warning",
    "category": "performance",
    "createdAt": "2024-12-21T10:30:00Z",
    "resolved": false
  }
}
```

**Used In**:
- Page: `/alerts`
- Component(s): Create Alert button/form
- Fields consumed: `id`, `projectId`, `message`, `severity`, `type`, `category`, `createdAt`, `resolved`

### POST /alerts/archive-resolved
**Description**: Archive all resolved alerts

**Response**:
```json
{
  "success": true,
  "data": {
    "archivedCount": 7,
    "message": "Successfully archived 7 resolved alerts"
  }
}
```

**Used In**:
- Page: `/alerts`
- Component(s): Archive Resolved button
- Fields consumed: `archivedCount`, `message`

---

## 4. Content Lab & Analysis

### GET /content-lab
**Description**: Get content analysis results for the Content Lab page

**Query Parameters**:
- `minScore` (optional): Minimum score filter (0-100)
- `maxScore` (optional): Maximum score filter (0-100)
- `url` (optional): Filter by URL pattern
- `title` (optional): Filter by title pattern
- `search` (optional): Search by title or URL
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
        "id": "1",
        "title": "Best Wireless Headphones 2025",
        "url": "https://example.com/wireless-headphones",
        "score": 85,
        "body": "Intro paragraph about Best Wireless Headphones 2025.\n\nKey highlights:\n- Benefit 1\n- Benefit 2\n\nConclusion with a clear CTA."
      },
      {
        "id": "2",
        "title": "Budget Earbuds for Running",
        "url": "https://example.com/budget-earbuds",
        "score": 72,
        "body": "Intro paragraph about Budget Earbuds for Running.\n\nKey highlights:\n- Benefit 1\n- Benefit 2\n\nConclusion with a clear CTA."
      },
      {
        "id": "3",
        "title": "Noise Cancelling Headphones Review",
        "url": "https://example.com/noise-cancelling",
        "score": 91,
        "body": "Intro paragraph about Noise Cancelling Headphones Review.\n\nKey highlights:\n- Benefit 1\n- Benefit 2\n\nConclusion with a clear CTA."
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 50,
      "offset": 0,
      "hasMore": true
    },
    "summary": {
      "averageScore": 78.5,
      "highPerformingContent": 45,
      "needsImprovement": 23,
      "totalContent": 150
    }
  }
}
```

**Used In**:
- Page: `/content-lab`
- Component(s): Content list sidebar, content editor form, content preview
- Fields consumed: `content[].id`, `content[].title`, `content[].url`, `content[].score`, `content[].body`, `summary.totalContent`, `summary.averageScore`

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

**Used In**:
- Page: `/content-lab`
- Component(s): Content analysis form
- Fields consumed: `analysisId`, `status`, `estimatedCompletionTime`

### PUT /content-lab/{contentId}
**Description**: Update existing content item

**Request Body**:
```json
{
  "title": "Updated Article Title",
  "url": "https://example.com/updated-article",
  "body": "Updated article content with better optimization...",
  "score": 88
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Updated Article Title",
    "url": "https://example.com/updated-article",
    "body": "Updated article content with better optimization...",
    "score": 88,
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/content-lab`
- Component(s): Content editor form (Save button)
- Fields consumed: `id`, `title`, `url`, `body`, `score`, `updatedAt`

### POST /content-lab/{contentId}/analyze
**Description**: Analyze content for AI optimization score

**Request Body**:
```json
{
  "title": "Article Title",
  "body": "Article content to analyze..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "score": 88,
    "analysis": {
      "titleLength": 85,
      "keywordDensity": 92,
      "contentLength": 78,
      "readability": 90
    },
    "suggestions": [
      "Consider adding more keywords in the title",
      "Increase content length for better SEO"
    ]
  }
}
```

**Used In**:
- Page: `/content-lab`
- Component(s): Content editor form (Analyze button)
- Fields consumed: `score`, `analysis.titleLength`, `analysis.keywordDensity`, `analysis.contentLength`, `analysis.readability`, `suggestions`

---

## 5. Experiments & A/B Testing

### GET /experiments
**Description**: Get all experiments for the Experiments page

**Query Parameters**:
- `status` (optional): Filter by status (`running`, `completed`, `draft`)
- `search` (optional): Search by experiment name
- `projectId` (optional): Filter by project
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset
- `sortBy` (optional): Sort field (`name`, `conversionRate`, `startDate`, `endDate`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)

**Response**:
```json
{
  "success": true,
  "data": {
    "experiments": [
      {
        "id": "1",
        "name": "Headphone Title Optimization",
        "status": "running",
        "conversionRate": 12.5,
        "visitors": 1250,
        "startDate": "2024-12-01T00:00:00Z",
        "endDate": "2024-12-31T23:59:59Z",
        "description": "Testing different headline variations for headphone products",
        "createdAt": "2024-11-30T10:00:00Z",
        "variants": [
          {
            "id": "variant_a",
            "name": "Control",
            "traffic": 50,
            "conversionRate": 10.2
          },
          {
            "id": "variant_b", 
            "name": "Optimized Title",
            "traffic": 50,
            "conversionRate": 12.5
          }
        ]
      },
      {
        "id": "2",
        "name": "Product Description A/B Test",
        "status": "completed",
        "conversionRate": 8.3,
        "visitors": 890,
        "startDate": "2024-11-01T00:00:00Z",
        "endDate": "2024-11-30T23:59:59Z",
        "description": "Testing different product description formats",
        "createdAt": "2024-10-31T10:00:00Z",
        "variants": [
          {
            "id": "variant_a",
            "name": "Control",
            "traffic": 50,
            "conversionRate": 7.8
          },
          {
            "id": "variant_b",
            "name": "Enhanced Description", 
            "traffic": 50,
            "conversionRate": 8.3
          }
        ]
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    },
    "summary": {
      "totalExperiments": 25,
      "runningExperiments": 8,
      "completedExperiments": 15,
      "draftExperiments": 2,
      "averageConversionRate": 10.2
    }
  }
}
```

**Used In**:
- Page: `/experiments`
- Component(s): Experiments table, experiment status indicators, conversion rate display
- Fields consumed: `experiments[].id`, `experiments[].name`, `experiments[].status`, `experiments[].conversionRate`, `experiments[].visitors`, `experiments[].startDate`, `experiments[].endDate`, `summary.totalExperiments`, `summary.runningExperiments`, `summary.completedExperiments`, `summary.draftExperiments`

### GET /experiments/funnel
**Description**: Get acquisition funnel data for the Experiments page

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "stage": "Views",
      "value": 12000
    },
    {
      "stage": "Clicks", 
      "value": 5400
    },
    {
      "stage": "Reads",
      "value": 3200
    },
    {
      "stage": "Signups",
      "value": 980
    },
    {
      "stage": "Purchases",
      "value": 420
    }
  ]
}
```

**Used In**:
- Page: `/experiments` - Acquisition Funnel section
- Component(s): Vertical bar chart for funnel visualization
- Fields consumed: `[].stage`, `[].value`

### POST /experiments
**Description**: Create a new experiment

**Request Body**:
```json
{
  "name": "New Experiment Name",
  "description": "Experiment description",
  "status": "draft",
  "startDate": "2024-12-01T00:00:00Z",
  "endDate": "2024-12-31T23:59:59Z",
  "variants": [
    {
      "name": "Control",
      "traffic": 50
    },
    {
      "name": "Variant A",
      "traffic": 50
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "3",
    "name": "New Experiment Name",
    "description": "Experiment description",
    "status": "draft",
    "startDate": "2024-12-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "createdAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/experiments`
- Component(s): Create experiment form
- Fields consumed: `id`, `name`, `description`, `status`, `startDate`, `endDate`, `createdAt`

### PUT /experiments/{experimentId}
**Description**: Update experiment status or details

**Request Body**:
```json
{
  "status": "running",
  "name": "Updated Experiment Name"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Updated Experiment Name",
    "status": "running",
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/experiments`
- Component(s): Experiment status controls, experiment editing
- Fields consumed: `id`, `name`, `status`, `updatedAt`

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

**Used In**:
- Page: `/` (homepage)
- Component(s): `KPICard.tsx`, visibility chart, platform pie chart, top queries list, recent alerts
- Fields consumed: `kpis.*.value`, `kpis.*.change`, `kpis.*.changeType`, `visibilityTrend[].date`, `visibilityTrend[].visibility`, `visibilityTrend[].mentions`, `platformDistribution[].name`, `platformDistribution[].value`, `topQueries[].query`, `topQueries[].mentions`, `recentAlerts[].message`, `recentAlerts[].severity`

### GET /analytics/traffic
**Description**: Get traffic analytics data for the Traffic tab

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `granularity` (optional): Data granularity (`hour`, `day`, `week`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": {
    "traffic": [
      {
        "date": "2024-12-15",
        "organic": 18420,
        "direct": 12340,
        "referral": 8560,
        "social": 4230
      },
      {
        "date": "2024-12-16",
        "organic": 20150,
        "direct": 13450,
        "referral": 9230,
        "social": 4670
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

**Used In**:
- Page: `/insights` - Traffic tab
- Component(s): Traffic area chart (stacked areas for organic, direct, referral, social)
- Fields consumed: `traffic[].date`, `traffic[].organic`, `traffic[].direct`, `traffic[].referral`, `traffic[].social`

### GET /analytics/engagement
**Description**: Get engagement metrics for the Engagement tab

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "metric": "AI Query Success",
        "value": 92,
        "fullMark": 100
      },
      {
        "metric": "Response Accuracy",
        "value": 88,
        "fullMark": 100
      },
      {
        "metric": "User Satisfaction",
        "value": 85,
        "fullMark": 100
      },
      {
        "metric": "Platform Adoption",
        "value": 78,
        "fullMark": 100
      },
      {
        "metric": "Feature Usage",
        "value": 82,
        "fullMark": 100
      },
      {
        "metric": "AI Integration",
        "value": 95,
        "fullMark": 100
      }
    ]
  }
}
```

**Used In**:
- Page: `/insights` - Engagement tab
- Component(s): Radar chart for engagement metrics
- Fields consumed: `metrics[].metric`, `metrics[].value`, `metrics[].fullMark`

### GET /analytics/llm-signals
**Description**: Get LLM platform performance data for the LLM Signals tab

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project

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
        "engagement": 92
      },
      {
        "name": "Claude",
        "mentions": 3245,
        "traffic": 20150,
        "engagement": 88
      },
      {
        "name": "Perplexity",
        "mentions": 2156,
        "traffic": 13450,
        "engagement": 85
      },
      {
        "name": "Gemini",
        "mentions": 1876,
        "traffic": 11230,
        "engagement": 82
      },
      {
        "name": "Copilot",
        "mentions": 1234,
        "traffic": 8560,
        "engagement": 78
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

**Used In**:
- Page: `/insights` - LLM Signals tab
- Component(s): LLM signals bar chart (dual bars for mentions and traffic)
- Fields consumed: `platforms[].name`, `platforms[].mentions`, `platforms[].traffic`

### GET /analytics/competitor-analysis
**Description**: Get competitor share of voice data

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "name": "Your AI Platform",
      "value": 67
    },
    {
      "name": "OpenAI",
      "value": 23
    },
    {
      "name": "Anthropic",
      "value": 7
    },
    {
      "name": "Google AI",
      "value": 3
    }
  ]
}
```

**Used In**:
- Page: `/insights` - Competitor Analysis section
- Component(s): Horizontal bar chart for competitor share of voice
- Fields consumed: `[].name`, `[].value`

### GET /analytics/content-performance
**Description**: Get top performing content data

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project
- `limit` (optional): Number of results (default: 5)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "title": "AI Prompt Engineering Best Practices",
      "views": 31200,
      "mentions": 1247,
      "score": 95
    },
    {
      "title": "ChatGPT vs Claude: Complete Comparison",
      "views": 28990,
      "mentions": 892,
      "score": 92
    },
    {
      "title": "Top AI Tools for Content Creation 2024",
      "views": 26780,
      "mentions": 756,
      "score": 89
    },
    {
      "title": "AI Productivity Tools for Developers",
      "views": 24560,
      "mentions": 634,
      "score": 87
    },
    {
      "title": "Machine Learning Model Optimization",
      "views": 22340,
      "mentions": 523,
      "score": 85
    }
  ]
}
```

**Used In**:
- Page: `/insights` - Content Performance section
- Component(s): Content performance list with score indicators
- Fields consumed: `[].title`, `[].views`, `[].mentions`, `[].score`

### GET /analytics/insights-summary
**Description**: Get key metrics summary for Insights page

**Query Parameters**:
- `timeRange` (optional): Time range (`7d`, `30d`, `90d`)
- `projectId` (optional): Filter by project

**Response**:
```json
{
  "success": true,
  "data": {
    "totalAiTraffic": {
      "value": 312000,
      "change": 23,
      "changeType": "increase"
    },
    "llmMentions": {
      "value": 4789,
      "change": 18,
      "changeType": "increase"
    },
    "aiAccuracyRate": {
      "value": 92,
      "change": 5,
      "changeType": "increase"
    },
    "aiMarketShare": {
      "value": 67.3,
      "change": 8,
      "changeType": "increase"
    }
  }
}
```

**Used In**:
- Page: `/insights` - Key Metrics Summary section
- Component(s): Four KPI cards at the bottom
- Fields consumed: `totalAiTraffic.value`, `totalAiTraffic.change`, `llmMentions.value`, `llmMentions.change`, `aiAccuracyRate.value`, `aiAccuracyRate.change`, `aiMarketShare.value`, `aiMarketShare.change`

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

### GET /analytics/charts/payments
**Description**: Get payments overview data

**Query Parameters**:
- `timeFrame` (optional): Time frame (`monthly`, `yearly`)

**Response**:
```json
{
  "success": true,
  "data": {
    "received": [
      { "x": "Jan", "y": 0 },
      { "x": "Feb", "y": 20 }
    ],
    "due": [
      { "x": "Jan", "y": 15 },
      { "x": "Feb", "y": 9 }
    ]
  }
}
```

**Used In**:
- Page: Dashboard charts section
- Component(s): `PaymentsOverview` component, area chart
- Fields consumed: `received[].x`, `received[].y`, `due[].x`, `due[].y`

### GET /analytics/charts/campaign-visitors
**Description**: Get campaign visitors data

**Response**:
```json
{
  "success": true,
  "data": {
    "total_visitors": 784000,
    "performance": -1.5,
    "chart": [
      { "x": "S", "y": 168 },
      { "x": "M", "y": 201 }
    ]
  }
}
```

**Used In**:
- Page: Dashboard charts section
- Component(s): `CampaignVisitors` component, line chart
- Fields consumed: `total_visitors`, `performance`, `chart[].x`, `chart[].y`

### GET /analytics/tables/top-channels
**Description**: Get top performing channels

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "name": "Google",
      "visitors": 3456,
      "revenues": 4220,
      "sales": 3456,
      "conversion": 2.59,
      "logo": "data:image/svg+xml;base64,..."
    }
  ]
}
```

**Used In**:
- Page: Dashboard tables section
- Component(s): `TopChannels` component, channels table
- Fields consumed: `[].name`, `[].visitors`, `[].revenues`, `[].sales`, `[].conversion`, `[].logo`

### GET /analytics/tables/top-products
**Description**: Get top performing products

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "image": "/images/product/product-01.png",
      "name": "Apple Watch Series 7",
      "category": "Electronics",
      "price": 296,
      "sold": 22,
      "profit": 45
    }
  ]
}
```

**Used In**:
- Page: Dashboard tables section
- Component(s): `TopProducts` component, products table
- Fields consumed: `[].image`, `[].name`, `[].category`, `[].price`, `[].sold`, `[].profit`

### GET /analytics/charts/devices
**Description**: Get device usage analytics

**Query Parameters**:
- `timeFrame` (optional): Time frame (`monthly`, `yearly`)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "name": "Desktop",
      "percentage": 0.65,
      "amount": 1625
    },
    {
      "name": "Tablet",
      "percentage": 0.1,
      "amount": 250
    },
    {
      "name": "Mobile",
      "percentage": 0.2,
      "amount": 500
    },
    {
      "name": "Unknown",
      "percentage": 0.05,
      "amount": 125
    }
  ]
}
```

**Used In**:
- Page: Dashboard charts section
- Component(s): `UsedDevices` component, donut chart
- Fields consumed: `[].name`, `[].percentage`, `[].amount`

---

## 9. Admin & User Management

### GET /admin/users
**Description**: Get all users for the Admin page

**Query Parameters**:
- `role` (optional): Filter by role (`viewer`, `editor`, `manager`, `admin`)
- `status` (optional): Filter by status (`active`, `invited`, `suspended`)
- `search` (optional): Search by name or email
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (`name`, `email`, `role`, `status`, `createdAt`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)

**Response**:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "u1",
        "name": "Ava Stone",
        "email": "ava@example.com",
        "role": "admin",
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z",
        "lastLoginAt": "2024-12-21T10:30:00Z",
        "avatar": "https://example.com/avatars/ava.jpg",
        "permissions": [
          "read:all",
          "write:all",
          "admin:all"
        ]
      },
      {
        "id": "u2",
        "name": "Noah Patel",
        "email": "noah@example.com",
        "role": "manager",
        "status": "active",
        "createdAt": "2024-01-15T00:00:00Z",
        "lastLoginAt": "2024-12-20T15:45:00Z",
        "avatar": "https://example.com/avatars/noah.jpg",
        "permissions": [
          "read:all",
          "write:projects",
          "manage:users"
        ]
      },
      {
        "id": "u3",
        "name": "Mia Chen",
        "email": "mia@example.com",
        "role": "editor",
        "status": "invited",
        "createdAt": "2024-12-01T00:00:00Z",
        "lastLoginAt": null,
        "avatar": null,
        "permissions": [
          "read:projects",
          "write:content"
        ]
      },
      {
        "id": "u4",
        "name": "Leo Garcia",
        "email": "leo@example.com",
        "role": "viewer",
        "status": "suspended",
        "createdAt": "2024-02-01T00:00:00Z",
        "lastLoginAt": "2024-12-15T09:20:00Z",
        "avatar": "https://example.com/avatars/leo.jpg",
        "permissions": [
          "read:projects"
        ]
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    },
    "summary": {
      "totalUsers": 25,
      "activeUsers": 18,
      "invitedUsers": 4,
      "suspendedUsers": 3,
      "roleDistribution": {
        "admin": 2,
        "manager": 5,
        "editor": 8,
        "viewer": 10
      }
    }
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Users table, user management controls, role dropdowns, status badges
- Fields consumed: `users[].id`, `users[].name`, `users[].email`, `users[].role`, `users[].status`, `summary.totalUsers`, `summary.activeUsers`, `summary.invitedUsers`, `summary.suspendedUsers`, `summary.roleDistribution`

### GET /admin/organization
**Description**: Get organization settings and information

**Response**:
```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org_123",
      "name": "GENSHARK-AI",
      "slug": "genshark-ai",
      "plan": "Pro",
      "seats": 10,
      "usedSeats": 4,
      "billing": {
        "nextInvoice": "2025-11-01T00:00:00Z",
        "paymentMethod": "Visa **** 4242",
        "amount": 99.00,
        "currency": "USD",
        "interval": "monthly"
      },
      "security": {
        "twoFactorEnabled": true,
        "ssoEnabled": false,
        "ssoProvider": "SAML",
        "passwordPolicy": {
          "minLength": 8,
          "requireUppercase": true,
          "requireNumbers": true,
          "requireSymbols": true
        }
      },
      "settings": {
        "timezone": "UTC",
        "dateFormat": "MM/DD/YYYY",
        "language": "en",
        "notifications": {
          "email": true,
          "push": true,
          "sms": false
        }
      }
    }
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Organization settings cards, billing info, security settings
- Fields consumed: `organization.name`, `organization.plan`, `organization.seats`, `organization.billing.nextInvoice`, `organization.billing.paymentMethod`, `organization.security.twoFactorEnabled`, `organization.security.ssoProvider`

### POST /admin/users/invite
**Description**: Invite a new user to the organization

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "role": "editor",
  "message": "Welcome to our team!"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u5",
    "email": "newuser@example.com",
    "role": "editor",
    "status": "invited",
    "inviteToken": "inv_abc123def456",
    "inviteExpiresAt": "2024-12-28T10:30:00Z",
    "createdAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Invite User button/form
- Fields consumed: `id`, `email`, `role`, `status`, `inviteToken`, `inviteExpiresAt`, `createdAt`

### PUT /admin/users/{userId}/role
**Description**: Update user role

**Request Body**:
```json
{
  "role": "manager"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u2",
    "role": "manager",
    "permissions": [
      "read:all",
      "write:projects",
      "manage:users"
    ],
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Role dropdown in users table
- Fields consumed: `id`, `role`, `permissions`, `updatedAt`

### PUT /admin/users/{userId}/status
**Description**: Update user status (activate/suspend)

**Request Body**:
```json
{
  "status": "suspended",
  "reason": "Policy violation"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u4",
    "status": "suspended",
    "reason": "Policy violation",
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Suspend/Activate button in users table
- Fields consumed: `id`, `status`, `reason`, `updatedAt`

### DELETE /admin/users/{userId}
**Description**: Remove user from organization

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u4",
    "deleted": true,
    "deletedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Remove button in users table
- Fields consumed: `id`, `deleted`, `deletedAt`

### PUT /admin/organization
**Description**: Update organization settings

**Request Body**:
```json
{
  "name": "Updated Organization Name",
  "settings": {
    "timezone": "America/New_York",
    "notifications": {
      "email": true,
      "push": false
    }
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "org_123",
    "name": "Updated Organization Name",
    "settings": {
      "timezone": "America/New_York",
      "notifications": {
        "email": true,
        "push": false
      }
    },
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/admin`
- Component(s): Organization settings forms
- Fields consumed: `id`, `name`, `settings`, `updatedAt`

---

## 10. Settings & User Preferences

### GET /settings/profile
**Description**: Get user profile information for the Settings page

**Response**:
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "u1",
      "name": "Ava Stone",
      "email": "ava@example.com",
      "company": "GENSHARK-AI",
      "avatar": "https://example.com/avatars/ava.jpg",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLoginAt": "2024-12-21T10:30:00Z",
      "timezone": "UTC",
      "language": "en"
    }
  }
}
```

**Used In**:
- Page: `/settings` - Profile tab
- Component(s): Profile form fields, user information display
- Fields consumed: `profile.name`, `profile.email`, `profile.company`, `profile.avatar`, `profile.role`, `profile.createdAt`, `profile.lastLoginAt`

### PUT /settings/profile
**Description**: Update user profile information

**Request Body**:
```json
{
  "name": "Ava Stone Updated",
  "email": "ava.updated@example.com",
  "company": "GENSHARK-AI Updated",
  "timezone": "America/New_York",
  "language": "en"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u1",
    "name": "Ava Stone Updated",
    "email": "ava.updated@example.com",
    "company": "GENSHARK-AI Updated",
    "timezone": "America/New_York",
    "language": "en",
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/settings` - Profile tab
- Component(s): Save Changes button, profile form
- Fields consumed: `id`, `name`, `email`, `company`, `timezone`, `language`, `updatedAt`

### GET /settings/preferences
**Description**: Get user notification preferences and settings

**Response**:
```json
{
  "success": true,
  "data": {
    "preferences": {
      "id": "u1",
      "emailAlerts": true,
      "weeklyReports": true,
      "experimentNotifications": false,
      "darkMode": false,
      "pushNotifications": true,
      "smsNotifications": false,
      "marketingEmails": false,
      "securityAlerts": true,
      "updatedAt": "2024-12-21T10:30:00Z"
    }
  }
}
```

**Used In**:
- Page: `/settings` - Preferences tab
- Component(s): Toggle switches for notification preferences
- Fields consumed: `preferences.emailAlerts`, `preferences.weeklyReports`, `preferences.experimentNotifications`, `preferences.darkMode`, `preferences.pushNotifications`, `preferences.smsNotifications`, `preferences.marketingEmails`, `preferences.securityAlerts`

### PUT /settings/preferences
**Description**: Update user notification preferences

**Request Body**:
```json
{
  "emailAlerts": true,
  "weeklyReports": false,
  "experimentNotifications": true,
  "darkMode": true,
  "pushNotifications": false,
  "smsNotifications": false,
  "marketingEmails": false,
  "securityAlerts": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "u1",
    "emailAlerts": true,
    "weeklyReports": false,
    "experimentNotifications": true,
    "darkMode": true,
    "pushNotifications": false,
    "smsNotifications": false,
    "marketingEmails": false,
    "securityAlerts": true,
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/settings` - Preferences tab
- Component(s): Toggle switches, preference form
- Fields consumed: `id`, `emailAlerts`, `weeklyReports`, `experimentNotifications`, `darkMode`, `pushNotifications`, `smsNotifications`, `marketingEmails`, `securityAlerts`, `updatedAt`

### GET /settings/api-keys
**Description**: Get user API keys for the Settings page

**Response**:
```json
{
  "success": true,
  "data": {
    "apiKeys": [
      {
        "id": "k1",
        "name": "Production API",
        "key": "sk-live-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
        "maskedKey": "sk-...abc123",
        "lastUsed": "2024-01-15T10:30:00Z",
        "createdAt": "2024-01-01T00:00:00Z",
        "expiresAt": "2025-01-01T00:00:00Z",
        "permissions": ["read:all", "write:projects"],
        "isActive": true
      },
      {
        "id": "k2",
        "name": "Development API",
        "key": "sk-test-def456ghi789jkl012mno345pqr678stu901vwx234yzabc123",
        "maskedKey": "sk-...def456",
        "lastUsed": "2024-01-10T15:45:00Z",
        "createdAt": "2024-01-05T00:00:00Z",
        "expiresAt": "2024-12-31T23:59:59Z",
        "permissions": ["read:projects"],
        "isActive": true
      }
    ],
    "summary": {
      "totalKeys": 2,
      "activeKeys": 2,
      "expiredKeys": 0,
      "lastGenerated": "2024-01-05T00:00:00Z"
    }
  }
}
```

**Used In**:
- Page: `/settings` - API Keys tab
- Component(s): API keys list, key management controls, masked/unmasked display
- Fields consumed: `apiKeys[].id`, `apiKeys[].name`, `apiKeys[].key`, `apiKeys[].maskedKey`, `apiKeys[].lastUsed`, `apiKeys[].createdAt`, `apiKeys[].expiresAt`, `apiKeys[].permissions`, `apiKeys[].isActive`, `summary.totalKeys`, `summary.activeKeys`, `summary.expiredKeys`

### POST /settings/api-keys
**Description**: Generate a new API key

**Request Body**:
```json
{
  "name": "New API Key",
  "permissions": ["read:all", "write:projects"],
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "k3",
    "name": "New API Key",
    "key": "sk-live-xyz789abc123def456ghi789jkl012mno345pqr678stu901vwx234",
    "maskedKey": "sk-...xyz789",
    "permissions": ["read:all", "write:projects"],
    "expiresAt": "2025-12-31T23:59:59Z",
    "createdAt": "2024-12-21T10:30:00Z",
    "isActive": true
  }
}
```

**Used In**:
- Page: `/settings` - API Keys tab
- Component(s): Generate New Key button, new key form
- Fields consumed: `id`, `name`, `key`, `maskedKey`, `permissions`, `expiresAt`, `createdAt`, `isActive`

### DELETE /settings/api-keys/{keyId}
**Description**: Delete an API key

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "k2",
    "deleted": true,
    "deletedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/settings` - API Keys tab
- Component(s): Delete button for each API key
- Fields consumed: `id`, `deleted`, `deletedAt`

### GET /settings/billing
**Description**: Get user billing information

**Response**:
```json
{
  "success": true,
  "data": {
    "billing": {
      "id": "bill_123",
      "plan": {
        "id": "pro",
        "name": "Pro Plan",
        "price": 99.00,
        "currency": "USD",
        "interval": "monthly",
        "features": [
          "10 team members",
          "Unlimited projects",
          "Priority support",
          "Advanced analytics"
        ]
      },
      "paymentMethod": {
        "id": "pm_123",
        "type": "card",
        "brand": "visa",
        "last4": "4242",
        "expMonth": 12,
        "expYear": 2025,
        "isDefault": true
      },
      "subscription": {
        "status": "active",
        "currentPeriodStart": "2024-11-01T00:00:00Z",
        "currentPeriodEnd": "2024-12-01T00:00:00Z",
        "cancelAtPeriodEnd": false,
        "canceledAt": null
      },
      "invoices": [
        {
          "id": "inv_123",
          "amount": 99.00,
          "currency": "USD",
          "status": "paid",
          "createdAt": "2024-11-01T00:00:00Z",
          "downloadUrl": "https://example.com/invoices/inv_123.pdf"
        }
      ],
      "nextInvoice": "2025-01-01T00:00:00Z"
    }
  }
}
```

**Used In**:
- Page: `/settings` - Billing tab
- Component(s): Billing information cards, plan details, payment method display
- Fields consumed: `billing.plan.name`, `billing.plan.price`, `billing.plan.currency`, `billing.plan.interval`, `billing.plan.features`, `billing.paymentMethod.brand`, `billing.paymentMethod.last4`, `billing.subscription.status`, `billing.nextInvoice`

### PUT /settings/billing/payment-method
**Description**: Update payment method

**Request Body**:
```json
{
  "paymentMethodId": "pm_456",
  "isDefault": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "pm_456",
    "type": "card",
    "brand": "mastercard",
    "last4": "5555",
    "expMonth": 6,
    "expYear": 2026,
    "isDefault": true,
    "updatedAt": "2024-12-21T10:30:00Z"
  }
}
```

**Used In**:
- Page: `/settings` - Billing tab
- Component(s): Update payment method button/form
- Fields consumed: `id`, `type`, `brand`, `last4`, `expMonth`, `expYear`, `isDefault`, `updatedAt`

### POST /settings/billing/cancel-subscription
**Description**: Cancel subscription

**Request Body**:
```json
{
  "reason": "No longer needed",
  "feedback": "The service was great but we're switching to a different solution"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "sub_123",
      "status": "canceled",
      "cancelAtPeriodEnd": true,
      "canceledAt": "2024-12-21T10:30:00Z",
      "currentPeriodEnd": "2024-12-01T00:00:00Z"
    }
  }
}
```

**Used In**:
- Page: `/settings` - Billing tab
- Component(s): Cancel Subscription button/form
- Fields consumed: `subscription.id`, `subscription.status`, `subscription.cancelAtPeriodEnd`, `subscription.canceledAt`, `subscription.currentPeriodEnd`

### GET /settings/billing/invoices/{invoiceId}/download
**Description**: Download invoice

**Response**: PDF file download

**Used In**:
- Page: `/settings` - Billing tab
- Component(s): Download Invoice button
- Fields consumed: PDF file content

---

## Additional Data Usage Mapping

### Chart Components Data Requirements

#### KPICard Component (`/src/components/ui/KPICard.tsx`)
**Used In**: Homepage (`/`), Insights page (`/insights`)
**Data Sources**: 
- `/analytics/overview` - KPI values and changes
- Hardcoded data in pages for demo purposes
**Fields Consumed**: `title`, `value`, `change`, `changeType`, `icon`, `color`

#### Chart Components
1. **AreaChart** (Visibility Over Time)
   - **Used In**: Homepage (`/`)
   - **Data Source**: `/analytics/overview` - `visibilityTrend`
   - **Fields**: `date`, `visibility`, `mentions`, `traffic`

2. **PieChart** (Platform Distribution)
   - **Used In**: Homepage (`/`)
   - **Data Source**: `/analytics/overview` - `platformDistribution`
   - **Fields**: `name`, `value`, `color`

3. **AreaChart** (Traffic Sources Over Time) - Insights Traffic Tab
   - **Used In**: Insights page (`/insights`) - Traffic tab
   - **Data Source**: `/analytics/traffic`
   - **Fields**: `date`, `organic`, `direct`, `referral`, `social`
   - **Chart Type**: Stacked area chart

4. **RadarChart** (Engagement Metrics) - Insights Engagement Tab
   - **Used In**: Insights page (`/insights`) - Engagement tab
   - **Data Source**: `/analytics/engagement`
   - **Fields**: `metric`, `value`, `fullMark`

5. **BarChart** (LLM Platform Performance) - Insights Signals Tab
   - **Used In**: Insights page (`/insights`) - LLM Signals tab
   - **Data Source**: `/analytics/llm-signals`
   - **Fields**: `name`, `mentions`, `traffic`
   - **Chart Type**: Dual bars (mentions and traffic)

6. **BarChart** (Competitor Share of Voice) - Insights Bottom Section
   - **Used In**: Insights page (`/insights`) - Competitor Analysis section
   - **Data Source**: `/analytics/competitor-analysis`
   - **Fields**: `name`, `value`
   - **Chart Type**: Horizontal bar chart

### Table Components Data Requirements

#### Alert List (`/src/app/alerts/page.tsx`)
**Data Source**: `/alerts`
**Fields Consumed**: `id`, `projectId`, `message`, `severity`, `type`, `category`, `createdAt`, `resolved`
**Filtering**: By severity (`low`, `medium`, `high`), by status (`resolved`, `unresolved`), by category (`performance`, `content`, `technical`, `competitor`), by search term
**Alert Cards**:
- **Alert Icon**: Type-based icon (AlertTriangle, Info, CheckCircle)
- **Severity Badge**: Color-coded severity (red=high, yellow=medium, green=low)
- **Category Badge**: Color-coded category (blue=performance, green=content, purple=technical, orange=competitor)
- **Status Badge**: RESOLVED badge for resolved alerts
- **Message**: Alert message text
- **Metadata**: Project ID and formatted creation date
- **Actions**: Resolve button (CheckCircle), Delete button (X), More options (MoreVertical)
**Stats Cards**:
- **Total Alerts**: Total count with AlertTriangle icon
- **Unresolved**: Unresolved count with Clock icon (red)
- **High Priority**: High severity unresolved count with TrendingUp icon (orange)
- **Resolved**: Resolved count with CheckCircle icon (green)
**Additional Components**:
- **Search Bar**: Search by message content
- **Filter Dropdowns**: Severity, Status, Category filters
- **Archive Resolved**: Bulk archive resolved alerts
- **Create Alert**: Create new custom alerts

#### Projects Table (`/src/app/projects/page.tsx`)
**Data Source**: `/projects`
**Fields Consumed**: `id`, `name`, `kpi_score`, `alerts`, `status`, `lastUpdated`, `visibility`, `mentions`
**Sorting**: By name, KPI score, alerts, last updated
**Filtering**: By status (`active`, `paused`, `archived`), by search term
**Table Columns**:
- Project (name + ID)
- Status (with color coding)
- KPI Score (with progress bar)
- Visibility (percentage)
- Mentions (count)
- Alerts (count with color coding)
- Last Updated (formatted date)
- Actions (view, edit, more options)

#### Content Lab Table (`/src/app/content-lab/page.tsx`)
**Data Source**: `/content-lab`
**Fields Consumed**: `id`, `title`, `url`, `score`, `body`
**Filtering**: By score range (≥60, ≥80, ≥90), by title/URL search
**Components**:
- **Content List Sidebar**: Shows title, URL, and score with color coding
- **Content Editor Form**: Editable title, URL, and body fields
- **Content Preview**: Displays formatted content preview
- **Score Analysis**: Real-time score calculation and display
**Features**:
- Search by title or URL
- Filter by minimum score
- Edit content in real-time
- Analyze content for AI optimization
- Save changes
- Preview formatted content

#### Admin Users Table (`/src/app/admin/page.tsx`)
**Data Source**: `/admin/users`
**Fields Consumed**: `id`, `name`, `email`, `role`, `status`
**Filtering**: By role (`viewer`, `editor`, `manager`, `admin`), by search term (name or email)
**Table Columns**:
- Name (user name)
- Email (user email address)
- Role (dropdown with role options)
- Status (color-coded badge: green=active, blue=invited, gray=suspended)
- Actions (Suspend/Activate button, Remove button)
**Additional Components**:
- **Organization Cards**: Organization info, Security settings, Billing info
- **Search Bar**: Search by name or email
- **Role Filter**: Filter by role dropdown
- **Invite User**: Create new user invitations
- **User Management**: Role changes, status changes, user removal
**Organization Settings Cards**:
- **Organization**: Name (GENSHARK-AI), Plan (Pro), Seats (10)
- **Security**: 2FA status, SSO availability
- **Billing**: Next invoice date, payment method

#### Settings Page (`/src/app/settings/page.tsx`)
**Data Sources**: `/settings/profile`, `/settings/preferences`, `/settings/api-keys`, `/settings/billing`
**Tab Structure**: Profile, Preferences, API Keys, Billing
**Profile Tab**:
- **Fields Consumed**: `profile.name`, `profile.email`, `profile.company`
- **Form Fields**: Full Name, Email, Company
- **Actions**: Save Changes button
**Preferences Tab**:
- **Fields Consumed**: `preferences.emailAlerts`, `preferences.weeklyReports`, `preferences.experimentNotifications`, `preferences.darkMode`
- **Toggle Switches**: Email Alerts, Weekly Reports, Experiment Updates, Dark Mode
- **Additional Preferences**: Push notifications, SMS notifications, Marketing emails, Security alerts
**API Keys Tab**:
- **Fields Consumed**: `apiKeys[].id`, `apiKeys[].name`, `apiKeys[].key`, `apiKeys[].maskedKey`, `apiKeys[].lastUsed`
- **Key Management**: Generate New Key, Mask/Unmask, Copy, Delete
- **Key Display**: Name, masked key, last used date
- **Actions**: Generate New Key button, Eye/EyeOff toggle, Copy button, Trash delete button
**Billing Tab**:
- **Fields Consumed**: `billing.plan.name`, `billing.plan.price`, `billing.plan.currency`, `billing.plan.interval`, `billing.plan.features`, `billing.paymentMethod.brand`, `billing.paymentMethod.last4`, `billing.subscription.status`, `billing.nextInvoice`
- **Plan Display**: Pro Plan, $99/month, features list
- **Payment Method**: Visa ending in 4242, Update button
- **Actions**: Download Invoice, Cancel Subscription buttons

### Service Layer Data Usage

#### Chart Services (`/src/services/charts.services.ts`)
**Functions**:
- `getDevicesUsedData()` → Used by `UsedDevices` component
- `getPaymentsOverviewData()` → Used by `PaymentsOverview` component
- `getCampaignVisitorsData()` → Used by `CampaignVisitors` component
- `getWeeksProfitData()` → Used by profit charts
- `getVisitorsAnalyticsData()` → Used by visitor analytics
- `getCostsPerInteractionData()` → Used by cost analysis charts

#### Table Services (`/src/components/Tables/fetch.ts`)
**Functions**:
- `getTopProducts()` → Used by `TopProducts` component
- `getTopChannels()` → Used by `TopChannels` component
- `getInvoiceTableData()` → Used by invoice tables

### Hook Usage Patterns

#### useFetch Hook (`/src/hooks/useFetch.ts`)
**Used By**: All pages that fetch data from APIs
**Pattern**: `const { data, loading, error } = useFetch<Type>(apiFunction)`
**Pages Using**:
- `/content-lab` - `useFetch<ContentItem[]>(api.getContentLab)`
- `/experiments` - `useFetch<Experiment[]>(api.getExperiments)`
- `/alerts` - `useFetch<AlertItem[]>(api.getAlerts)`

### Mock Data Usage

#### Static Data in Pages
1. **Homepage** (`/src/app/page.tsx`):
   - `visibilityData` - Time series data for charts
   - `engineData` - Platform distribution data
   - `topPrompts` - Top queries data
   - `recentAlerts` - Recent alerts data

2. **Insights Page** (`/src/app/insights/page.tsx`):
   - `trafficData` - Traffic source data
   - `engagementData` - Engagement metrics
   - `llmSignalsData` - LLM platform data
   - `contentPerformanceData` - Content performance data
   - `competitorData` - Competitor analysis data

3. **Alerts Page** (`/src/app/alerts/page.tsx`):
   - `mockAlerts` - Alert data with enhanced fields

4. **Projects Page** (`/src/app/projects/page.tsx`):
   - `mockProjects` - Project data with additional fields

### Data Flow Patterns

1. **API → Hook → Component**: Most data flows through `useFetch` hook
2. **Service → Component**: Chart and table data flows through service functions
3. **Mock Data → Component**: Static data defined in page components
4. **Props → Component**: Data passed down through component props

This comprehensive mapping shows exactly where each API endpoint's data is consumed in the frontend, making it clear for the backend team which fields are essential and which components depend on each endpoint.
