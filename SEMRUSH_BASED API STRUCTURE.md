# Semrush API Integration Guide for Genshark AI Visibility Dashboard

## 📋 Overview

This document outlines how to integrate Semrush's Domain Analytics API with the Genshark AI Visibility Dashboard to provide comprehensive SEO visibility metrics alongside AI-centric data.

## 🔗 Base Configuration

- **API Base URL**: `https://api.semrush.com/`
- **Authentication**: API Key required
- **Response Format**: CSV (semicolon-delimited)
- **Rate Limits**: API units per request (varies by endpoint)

## 📊 Available Endpoints

### 🔍 Organic Search Analytics

#### `domain_organic`
**Purpose**: Get organic search keywords for a domain
**Required Parameters**:
- `domain` - Target domain (e.g., "example.com")
- `database` - Geographic database (e.g., "us", "uk", "ca")

**Optional Parameters**:
- `display_limit` - Number of results (default: 100)
- `display_sort` - Sort order (e.g., "tr_desc", "po_asc")
- `export_columns` - Specific columns to return
- `display_date` - Historical data date

**Key Response Fields**:
```
Keyword | Position | Previous Position | Search Volume | CPC | Url | Traffic (%) | Traffic Cost (%) | Competition
```

#### `domain_organic_unique`
**Purpose**: Get organic pages (site content ranking)
**Key Response Fields**:
```
Url | Number of Keywords | Traffic | Traffic (%)
```

#### `domain_organic_subdomains`
**Purpose**: Get organic subdomains of domain
**Key Response Fields**:
```
Url | Number of Keywords | Traffic | Traffic (%)
```

### 💰 Paid Search Analytics

#### `domain_adwords`
**Purpose**: Get paid search (AdWords) keywords
**Key Response Fields**:
```
Keyword | Position | Search Volume | CPC | Visible Url | Traffic (%) | Traffic Cost | Competition
```

#### `domain_adwords_unique`
**Purpose**: Get unique ad copies (AdWords text)
**Key Response Fields**:
```
Title | Description | Visible Url | Url | Number of Keywords
```

#### `domain_adwords_historical`
**Purpose**: Get historical paid keywords (12 months)
**Key Response Fields**:
```
Keyword | Date | Position | CPC | Search Volume | Traffic (%) | Url | Title | Description | Visible Url
```

### 🛒 Shopping Ads Analytics

#### `domain_shopping`
**Purpose**: Get PLA (Product Listing Ads) keywords
**Key Response Fields**:
```
Keyword | Position | Previous Position | Search Volume | Shop Name | Url | Title | Product Price | Timestamp
```

#### `domain_shopping_unique`
**Purpose**: Get PLA ad copies
**Key Response Fields**:
```
Title | Product Price | Url | Number of Keywords
```

### 🏆 Competitor Analysis

#### `domain_organic_organic`
**Purpose**: Get organic-search competitors (domains)
**Key Response Fields**:
```
Domain | Competitor Relevance | Common Keywords | Organic Keywords | Organic Traffic | Organic Cost | Adwords Keywords
```

#### `domain_adwords_adwords`
**Purpose**: Get paid-search competitors
**Key Response Fields**:
```
Domain | Competitor Relevance | Common Keywords | Adwords Keywords | Adwords Traffic | Adwords Cost | Organic Keywords
```

#### `domain_domains`
**Purpose**: Domain vs. domain keyword gap analysis
**Required Parameters**:
- `domains` - String of domains with operations (e.g., "example.com+competitor.com")

**Key Response Fields**:
```
Keyword | Domain1_Position | Domain2_Position | Competition | Search Volume | CPC
```

### 🔗 Backlink Analytics

#### `backlinks_overview`
**Purpose**: Get summary of backlinks profile
**Required Parameters**:
- `target` - Target domain/URL
- `target_type` - Type: "domain", "subdomain", or "url"

**Key Response Fields**:
```
ascore | total | domains_num | urls_num | ips_num | ipclassc_num | follows_num | nofollows_num | sponsored_num | ugc_num | texts_num | images_num | forms_num | frames_num
```

#### `backlinks`
**Purpose**: Get detailed backlinks list
**Key Response Fields**:
```
page_ascore | source_title | source_url | target_url | anchor | external_num | internal_num | first_seen | last_seen
```

#### `backlinks_refdomains`
**Purpose**: Get referring domains to target
**Key Response Fields**:
```
domain_ascore | domain | backlinks_num | ip | country | first_seen | last_seen
```

## 🎯 Genshark Dashboard Integration Mapping

### 📈 Homepage KPIs

| Genshark KPI | Semrush Data Source | Implementation |
|--------------|-------------------|----------------|
| **Visibility Score** | `domain_organic` total keywords + average position | Calculate normalized visibility index |
| **Traffic** | Sum of `Traffic (%)` from `domain_organic` | Aggregate organic traffic share |
| **Mentions** | `backlinks_overview.total` | Use total backlinks as authority signal |

### 📊 Insights Page Components

#### Traffic Trends Chart
**Data Source**: `domain_organic` with `display_date` parameter
**Implementation**: 
- Sum `Traffic` from top organic keywords over time
- Create time-series data for organic search traffic
- Note: Semrush doesn't provide direct/referral/social traffic splits

#### Top Queries List
**Data Source**: `domain_organic`
**Fields Used**:
- `Keyword` - Query text
- `Position` - Current ranking
- `Previous Position` - Previous ranking
- `Search Volume` - Monthly search volume
- `Traffic (%)` - Traffic share percentage

**Implementation**:
- Sort by `Traffic (%)` descending
- Calculate position changes
- Display queries with trend indicators

#### Competitor Analysis
**Data Source**: `domain_organic_organic` and `domain_adwords_adwords`
**Fields Used**:
- `Domain` - Competitor domain
- `Competitor Relevance` - Relevance score (0-1)

**Implementation**:
- Normalize `Competitor Relevance` as percentage
- Create horizontal bar chart
- Show share of voice metrics

#### Content Performance
**Data Source**: `domain_organic_unique`
**Fields Used**:
- `Url` - Page URL
- `Traffic` - Page traffic (use as "views")
- `Number of Keywords` - Keywords ranking for page

**Implementation**:
- List top 5-10 pages by traffic
- Calculate content score from traffic + keyword count
- Display as content performance list

### 🚨 Alerts & Monitoring

#### Keyword Ranking Changes
**Data Source**: `domain_organic` and `domain_adwords_historical`
**Implementation**:
- Track `Position` vs `Previous Position`
- Generate alerts for significant rank changes
- Monitor brand-related keywords

## 🛠️ Implementation Strategy

### Backend Integration

1. **API Service Layer**
   ```javascript
   class SemrushService {
     async getOrganicKeywords(domain, options = {}) {
       // Call domain_organic endpoint
       // Parse CSV response
       // Return JSON data
     }
     
     async getCompetitors(domain, options = {}) {
       // Call domain_organic_organic endpoint
       // Parse and normalize data
       // Return competitor list
     }
   }
   ```

2. **Data Transformation**
   - Parse CSV responses to JSON
   - Normalize field names (e.g., "Traffic (%)" → "trafficShare")
   - Calculate derived metrics (visibility scores, trends)

3. **Caching Strategy**
   - Cache heavy queries (large keyword lists)
   - Respect API unit limits
   - Schedule regular data refreshes

### Frontend Integration

1. **Component Mapping**
   - Map Semrush data to existing Genshark components
   - Update chart configurations
   - Add data source indicators

2. **Data Formatting**
   - Convert Semrush metrics to Genshark format
   - Handle missing data gracefully
   - Provide fallback values

## ⚠️ Important Considerations

### Data Limitations
- **Traffic Sources**: Semrush only provides search traffic, not direct/referral/social
- **Regional Data**: Historical data limited for non-US databases
- **Data Freshness**: SEO data may lag by several days
- **API Costs**: Large domains consume significant API units

### Best Practices
- Use `display_limit` to control result size
- Implement proper error handling for CSV parsing
- Schedule data pulls during off-peak hours
- Monitor API unit consumption
- Validate domain mappings

### Error Handling
- Detect HTML error responses
- Handle rate limit messages
- Implement retry logic
- Log API unit usage

## 📝 Example API Calls

### Get Top Organic Keywords
```bash
curl "https://api.semrush.com/?type=domain_organic&key=YOUR_API_KEY&domain=example.com&database=us&display_limit=50&export_columns=Keyword,Position,Search Volume,Traffic (%)"
```

### Get Competitors
```bash
curl "https://api.semrush.com/?type=domain_organic_organic&key=YOUR_API_KEY&domain=example.com&database=us&display_limit=20&export_columns=Domain,Competitor Relevance,Common Keywords"
```

### Get Backlink Overview
```bash
curl "https://api.semrush.com/?type=backlinks_overview&key=YOUR_API_KEY&target=example.com&target_type=domain&export_columns=ascore,total,domains_num"
```

## 🎨 UI Integration Notes

- **Traffic Charts**: Use only "organic" series (Semrush limitation)
- **Competitor Charts**: Plot `Competitor Relevance` values
- **Content Lists**: Display pages from `domain_organic_unique`
- **KPI Cards**: Calculate visibility from organic keyword metrics
- **Data Source**: Add "Powered by Semrush" indicators

## 📚 Resources

- [Semrush API Documentation](https://www.semrush.com/api/)
- [Domain Analytics API Reference](https://www.semrush.com/api/domain-analytics/)
- [Backlinks API Reference](https://www.semrush.com/api/backlinks/)

---

*This integration enables Genshark to display comprehensive SEO visibility metrics alongside AI-centric data, providing users with a complete view of their digital presence.*