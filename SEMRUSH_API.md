# Semrush API Endpoints Documentation (v3 & v4)

## 📋 Overview

This comprehensive guide covers all Semrush API endpoints organized by category. Each endpoint includes HTTP method, URL structure, required parameters, and main output fields from CSV/JSON responses.

**Authentication**: API key (v3) / OAuth2 token (v4)  
**Output Format**: CSV (v3) / JSON (v4)  
**Documentation**: [developer.semrush.com](https://developer.semrush.com)

---

## 🌐 Domain-Level Data (Analytics API v3)

### 📊 Domain Overview

#### `domain_ranks`
**Category**: Overview reports  
**Method**: GET  
**URL**: `https://api.semrush.com/?type=domain_ranks&key=API_KEY&domain=example.com[&database=...]`

**Required Parameters**:
- `domain` - Target website
- `type=domain_ranks`
- `key` - API key

**Optional Parameters**:
- `database` - Regional database (default: all regions)
- `display_date` - Historical snapshot (YYYYMM15)
- `display_limit/offset` - Pagination
- `export_columns` - Specific columns

**Output Fields**:
```
Domain | Rank | Organic Keywords | Organic Traffic | Organic Cost | Adwords Keywords | Adwords Traffic | Adwords Cost | PLA Keywords | PLA Uniques
```

**Rate/Pricing**: 10 API units per line (current data)  
**Scope**: Per domain (can aggregate across databases)  
**Format**: CSV (v3 only)

---

### 🔍 Organic Search Analytics

#### `domain_organic`
**Category**: Domain reports  
**URL**: `https://api.semrush.com/?type=domain_organic&key=API_KEY&domain=example.com&database=us`

**Parameters**:
- `domain` - Target domain
- `database` - Geographic database (e.g., "us", "uk", "ca")
- `display_limit` - Number of results
- `display_offset` - Pagination offset
- `export_columns` - Specific columns
- `display_date` - Historical data
- `display_daily` - Daily data

**Output Fields**:
```
Keyword | Position | Previous Position | Position Difference | Search Volume | CPC | URL | Traffic (%) | Traffic Cost (%) | Competition | Number of Results | Trends
```

**Notes**: Shows keywords sending organic traffic to the domain (top 100). Supports historical and daily data.

#### `domain_organic_unique`
**Purpose**: Organic pages (site content ranking)

**Output Fields**:
```
Url | Number of Keywords | Traffic | Traffic (%)
```

**Notes**: Lists pages of the domain in top 100 organic results.

#### `domain_organic_subdomains`
**Purpose**: Organic subdomains of domain

**Output Fields**:
```
Url | Number of Keywords | Traffic | Traffic (%)
```

---

### 💰 Paid Search Analytics

#### `domain_adwords`
**Purpose**: Paid (AdWords) keywords for the domain

**Output Fields**:
```
Keyword | Position | Previous Position | Position Difference | Search Volume | CPC | Visible Url | Traffic (%) | Traffic Cost | Competition
```

#### `domain_adwords_unique`
**Purpose**: Unique ad copy (text ad copy)

**Output Fields**:
```
Title | Description | Visible Url | Url | Number of Keywords
```

**Notes**: Unique ad copy seen for the domain's ads.

#### `domain_adwords_historical`
**Purpose**: Historical trend of domain's ad metrics

**Features**: Supports `display_date` parameter  
**Fields**: Similar to "Keyword Ads History" but domain-level

---

### 🏆 Competitor Analysis

#### `domain_organic_organic`
**Purpose**: Competitors in organic search

**Output Fields**:
```
Domain | Competitor Relevance | Common Keywords | Organic Keywords | Organic Traffic | Organic Cost | Adwords Keywords
```

#### `domain_adwords_adwords`
**Purpose**: Competitors in paid search

**Output Fields**:
```
Domain | Competitor Relevance | Common Keywords | Adwords Keywords | Adwords Traffic | Adwords Cost | Organic Keywords
```

#### `domain_domains`
**Purpose**: Domain vs. domain comparison

**Parameters**:
- `domains` - URL-encoded list with syntax `<sign>|<type>|<domain>`
- Example: `*|or|example.com|*|or|domain2.com`

**Output Fields**:
```
Keyword | Domain1_Position | Domain2_Position | Competition | Search Volume | CPC
```

**Usage**: Compares common/unique keywords across up to 5 domains.

---

### 🛒 Shopping Ads (PLA) Analytics

#### `domain_shopping`
**Purpose**: PLA (Product Listing Ads) search keywords

**Output Fields**:
```
Keyword | Position | Previous Position | Position Difference | Search Volume | Shop Name | Url | Title | Product Price | Timestamp
```

#### `domain_shopping_unique`
**Purpose**: PLA ad copies

**Output Fields**:
```
Title | Product Price | Url | Number of Keywords
```

#### `domain_shopping_shopping`
**Purpose**: PLA competitors (shopping)

**Output Fields**:
```
Domain | Competitor Relevance | Common Keywords | Adwords Keywords | Adwords Traffic | Adwords Cost | Organic Keywords
```

---

## 🔑 Keyword-Level Data (Analytics API v3)

### 📈 Keyword Overview

#### `phrase_all`
**Purpose**: Keyword overview across all databases

**Output Fields**:
```
Date | Database | Keyword | Search Volume | CPC | Competition
```

**Scope**: Trends per keyword across all regions

#### `phrase_this`
**Purpose**: Keyword overview for one database

**Parameters**:
- `display_date` - Historical data

**Output Fields**:
```
Keyword | Search Volume | CPC | Competition | Number of Results | Trends
```

#### `phrase_these`
**Purpose**: Batch keyword overview (one database)

**Output**: Similar to single keyword, for up to 100 keywords at once

---

### 🔍 Search Results Analysis

#### `url_organic`
**Purpose**: Organic results per keyword

**Output Fields**:
```
Position | Title | URL | Domain | Result Type
```

#### `url_adwords`
**Purpose**: Paid results per keyword

**Output Fields**:
```
Position | Ad Title | Visible URL | Destination URL | Ad Snippet
```

---

### 🔗 Keyword Research Tools

#### `phrase_related`
**Purpose**: Related keywords

**Output Fields**:
```
Keyword | Search Volume | CPC | Competition
```

#### `phrase_this_history`
**Purpose**: Keyword ads history

**Output Fields**: Historical CPC and volume trends for a keyword

#### `phrase_broadmatch`
**Purpose**: Broad match keywords

**Output Fields**: Broad match variations with metrics

#### `phrase_questions`
**Purpose**: Question-form keywords

**Output Fields**: Question-form keywords containing the phrase

#### `phrase_keyworddifficulty`
**Purpose**: Keyword difficulty analysis

**Output Fields**:
```
Keyword | Difficulty Score
```

---

## 🔗 Backlink Analytics (v3)

### 📊 Backlink Overview

#### `backlinks_overview`
**Purpose**: Backlinks profile summary

**Output Fields**:
```
Domain | Total Backlinks | Referring Domains | Authority Score
```

### 🔍 Detailed Backlink Reports

**Available Endpoint Types**:
- `backlinks_refdomains` - Referring domains
- `backlinks_refips` - Referring IPs
- `backlinks_anchors` - Anchor texts
- `backlinks_indexed` - Indexed pages
- `backlinks_tld` - TLD distribution
- `backlinks_competitors` - Competitor analysis
- `backlinks_batch` - Batch comparison
- `backlinks_ascore` - Authority score profile
- `backlinks_categories` - Categories profile
- `backlinks_historical` - Historical data

**Common Parameters**:
- `type` - Endpoint type
- `domain` - Target domain
- `database` - Geographic database
- `export_columns` - Specific columns

**Common Output Fields**:
```
Referring Domain | Backlinks | New/Lost | TLD | Country | Authority Score
```

---

## 📊 Traffic Analytics (Trends API v3)

**Base URL**: `https://api.semrush.com/analytics/ta/api/v3/<endpoint>`

### 📈 Traffic Overview

#### `summary`
**Purpose**: Overall traffic summary

**Parameters**: `domain=xxx` and other params

**Output**: Overall visits, sessions, users, etc.

#### `summary_by_day`
**Purpose**: Daily traffic breakdown

#### `summary_by_week`
**Purpose**: Weekly traffic breakdown

### 🎯 Traffic Sources & Behavior

#### `sources`
**Purpose**: Traffic sources breakdown

**Output Fields**:
```
Source | Sessions | % of Traffic
```

**Sources**: Direct, Search, Referrals, Social, Paid, Mail

#### `destinations`
**Purpose**: Top outgoing links

#### `toppages`
**Purpose**: Most visited pages

**Output Fields**:
```
Page | Visits | Bounce Rate
```

### 🌍 Geographic & Demographic Data

#### `geo`
**Purpose**: Country/region traffic breakdown

**Output Fields**:
```
Country | Sessions | % of Traffic
```

#### `audience_insights`
**Purpose**: Engagement metrics

#### Demographics Endpoints:
- `age_and_sex_distribution`
- `household_distribution`
- `income_distribution`
- `education_distribution`
- `occupation_distribution`
- `audience_interests`

#### `social_media`
**Purpose**: Social media visits

### 📊 Performance Metrics

#### `rank`
**Purpose**: Global/US traffic rank

#### `purchase_conversion`
**Purpose**: Purchase conversion tracking

**Notes**: Each endpoint returns CSV tables with relevant metrics. Uses separate Trends API subscription and consumes units per line.

---

## 🛠️ Projects & Tools (API v4 - JSON)

**Authentication**: OAuth2 token  
**Response Format**: JSON  
**Base URL**: `https://api.semrush.com/api/v4/`

### 📁 Project Management

#### `GET /api/v4/projects/v0`
**Purpose**: List all projects

**Output**: Array of projects with `project_id`, `project_name`, `url`, etc.

#### `GET /api/v4/projects/v0/{project_id}`
**Purpose**: Get project details

**Output**: `project_id`, `project_name`, `url`, `tools`, `permissions`, etc.

#### `POST /api/v4/projects/v0`
**Purpose**: Create new project

#### `PUT /api/v4/projects/v0/{project_id}`
**Purpose**: Update project

#### `DELETE /api/v4/projects/v0/{project_id}`
**Purpose**: Remove project

---

### 📍 Position Tracking

**Available Endpoints**:
- Create campaign
- Add keywords
- Remove keywords
- Organic Overview
- Organic Positions Report
- Adwords Positions Report
- Competitors Discovery
- Landing Pages
- Visibility Index

**Example**: Organic Positions Report returns JSON listing tracked keywords and their current/future rankings in a campaign.

---

### 🔍 Site Audit

**Available Endpoints**:
- Enable campaign
- Edit campaign
- Run audit
- Get campaign info
- Get snapshot info
- Issues report

**Output**: Site health scores, issue details, etc.

---

### 📍 Listing Management

**Purpose**: Google Business listings management

**Endpoints**:
- `GetLocations`
- `UpdateLocation(s)`

**Output**: JSON with business locations and attributes

---

### 🗺️ Map Rank Tracker

**Available Endpoints**:
- `GetCampaigns`
- `GetCampaign`
- `GetKeywordStatuses`
- `GetHeatmap`
- `GetMetrics`
- `GetTopCompetitors`

**Output**: Local rank data for keywords, heatmaps, etc.

**Notes**: All v4 endpoints require OAuth2 token and subscription to respective tool, returning structured JSON.

---

## 📊 Data Categories Summary

### 🌐 Domain-Level Data
- Domain rank
- Organic/paid keywords
- Ads history
- Competitors (organic/paid)
- PLA keywords
- Backlinks profile
- Top pages
- Traffic metrics

### 🔑 Keyword-Level Data
- Volume, CPC, competition
- Trend history
- Organic/paid results
- Related terms
- Keyword difficulty
- Questions, broad matches
- SERP features

### 🔗 Backlink Data
- Total backlinks
- Referring domains/IPs
- Anchor texts
- TLDs
- Linking domains by country
- Link growth (new/lost)
- Competitors' link profiles
- Historical backlink stats
- Authority scores

### 📊 Traffic Analytics
- Visits/sessions breakdown by country
- Source, device, demography
- Top pages
- Outbound destinations
- Rank, conversions

### 💰 Advertising Data (PPC/PLA)
- Ad keywords
- Ad copy
- Shopping campaign data
- PLA items
- Advertising history
- Ad rank and cost metrics

### 🏆 SERP & Competitors
- Competitor domains for organic/PPC/PLA
- Keyword gap (domain vs domain)
- Visibility index
- SERP feature presence

### 🔧 Technical SEO & Projects
- Site audit issues
- Keyword tracking
- Crawl reports
- Site health
- On-page issue details

### 📤 Reports & Exports
- All endpoints can be exported via API (CSV/JSON) for integration

---

## 📚 Resources

- **Official Documentation**: [developer.semrush.com](https://developer.semrush.com)
- **API Reference**: [Semrush API Documentation](https://www.semrush.com/api/)
- **Authentication Guide**: [API Authentication](https://developer.semrush.com/api/authentication/)

---

*This documentation provides comprehensive coverage of Semrush API endpoints for domain analytics, keyword research, backlink analysis, traffic insights, and project management tools.*