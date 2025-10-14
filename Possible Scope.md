# Possible Scope: Genshark AI Visibility Dashboard vs Semrush API Capabilities

## **Problem Statement**

We're talking about an AI Visibility Dashboard that needs to track:

- **LLM Platform Mentions** (think ChatGPT, Claude, Perplexity, Gemini, Copilot)
- **AI Query Performance** - how well our content performs in AI searches
- **Generative Engine Optimization (GEO)** metrics - the new SEO for AI
- **AI Content Visibility** scoring - how visible our content is to AI systems
- **LLM Platform Share of Voice** - which AI platforms mention us most
- **AI Prompt Performance** tracking - how effective our prompts are
- **Generative Search Traffic** attribution - traffic coming from AI searches

## **The Bottom Line**

| Category | What We Need | Semrush API Has It | Kinda Has It | Doesn't Have It |
|-----------|--------------|-------------------|---------------|-----------------|
| **AI/GEO Core Metrics** | 12 things | 0 | 0 | 12 |
| **LLM Platform Analytics** | 8 things | 0 | 0 | 8 |
| **AI Content Performance** | 6 things | 0 | 0 | 6 |
| **Generative Search Traffic** | 5 things | 0 | 0 | 5 |
| **AI Prompt Analytics** | 4 things | 0 | 0 | 4 |
| **Traditional SEO (Nice to Have)** | 15 things | 12 | 2 | 1 |
| **TOTAL** | **50 things** | **12** | **2** | **36** |

---

## **AI/GEO Core Metrics - The Stuff We Actually Need**

| Requirement | Semrush API Endpoint | Availability |
|--------------|---------------------|---------------|
| **LLM Mentions Count** | — | Not available - Semrush API does not track AI platform mentions |
| **AI Visibility Score** | — | Not available - No AI-specific visibility metrics provided |
| **Share of Voice (AI)** | — | Not available - Does not track AI platform share of voice |
| **AI Traffic Impact** | — | Not available - Cannot attribute traffic to AI platforms |
| **Generative Search Queries** | — | Not available - Does not track AI-generated search queries |
| **AI Content Performance** | — | Not available - No analysis of AI-optimized content |
| **LLM Platform Distribution** | — | Not available - No tracking of ChatGPT, Claude, Perplexity, etc. |
| **AI Query Success Rate** | — | Not available - No AI query performance tracking |
| **Generative Engine Rankings** | — | Not available - No AI platform rankings |
| **AI Prompt Effectiveness** | — | Not available - No prompt performance analysis |
| **AI Content Optimization Score** | — | Not available - No AI content scoring |
| **Generative Search Trends** | — | Not available - No AI search trends |

---

## **LLM Platform Analytics - The USP that most GEO Products sell**

| What We Want | Semrush API Endpoint | Can We Get It? |
|--------------|---------------------|----------------|
| **ChatGPT Mentions** | — | Not available - Semrush API does not track ChatGPT-specific data |
| **Claude Mentions** | — | Not available - No Claude-specific data provided |
| **Perplexity Mentions** | — | Not available - No Perplexity-specific data |
| **Gemini Mentions** | — | Not available - No Gemini-specific data |
| **Copilot Mentions** | — | Not available - No Copilot-specific data |
| **LLM Platform Engagement** | — | Not available - No AI platform engagement tracking |
| **AI Platform Traffic** | — | Not available - Cannot attribute traffic to AI platforms |
| **LLM Query Performance** | — | Not available - No AI query performance tracking |

---

## **AI Content Performance - Content Performance in AI Systems**

| Requirement | Semrush API Endpoint | Availability |
|--------------|---------------------|---------------|
| **AI-Optimized Content Score** | — | Not available - Semrush API does not provide AI content scoring |
| **AI Content Visibility** | — | Not available - No AI content visibility tracking |
| **Generative Content Performance** | — | Not available - No analysis of AI-generated content |
| **AI Content Engagement** | — | Not available - No AI content engagement tracking |
| **Prompt-Based Content Analysis** | — | Not available - No prompt-driven content analysis |
| **AI Content Optimization** | — | Not available - No AI content optimization |

---

## **Generative Search Traffic - AI-Generated Traffic Analysis**

| Requirement | Semrush API Endpoint | Availability |
|--------------|---------------------|---------------|
| **AI-Generated Traffic** | — | Not available - Semrush API does not track AI-generated traffic |
| **Generative Search Attribution** | — | Not available - Cannot attribute traffic to AI platforms |
| **AI Query Traffic** | — | Not available - No AI query traffic tracking |
| **Generative Engine Traffic** | — | Not available - No AI engine traffic tracking |
| **AI Platform Traffic Sources** | — | Not available - No AI platform traffic sources |

---

## **AI Prompt Analytics - Prompt Performance Analysis**

| Requirement | Semrush API Endpoint | Availability |
|--------------|---------------------|---------------|
| **Prompt Performance Tracking** | — | Not available - Semrush API does not track prompt performance |
| **AI Query Effectiveness** | — | Not available - No AI query effectiveness analysis |
| **Prompt Optimization Metrics** | — | Not available - No prompt optimization |
| **AI Query Success Rate** | — | Not available - No AI query success rates |

---

## **Traditional SEO - Additional Capabilities**

| Requirement | Semrush API Endpoint | Availability |
|--------------|---------------------|---------------|
| **Organic Keywords Count** | `domain_ranks` | Available - Provided as `Organic Keywords` |
| **Organic Traffic Volume** | `domain_ranks` | Available - Provided as `Organic Traffic` |
| **Paid Keywords Count** | `domain_ranks` | Available - Provided as `Adwords Keywords` |
| **Paid Traffic Volume** | `domain_ranks` | Available - Provided as `Adwords Traffic` |
| **Backlinks Count** | `backlinks_overview` | Available - Provided as `total` |
| **Referring Domains** | `backlinks_overview` | Available - Provided as `domains_num` |
| **Authority Score** | `backlinks_overview` | Available - Provided as `ascore` |
| **Keyword Search Volume** | `phrase_this` | Available - Provided as `Search Volume` |
| **Keyword CPC Data** | `phrase_this` | Available - Provided as `CPC` |
| **Keyword Competition** | `phrase_this` | Available - Provided as `Competition` |
| **Competitor Analysis** | `domain_organic_organic` | Available - Provides competitor domains |
| **Top Pages** | `domain_organic_unique` | Available - Provides top organic pages |
| **Historical Data** | Various endpoints | Limited - Monthly granularity only |
| **Real-time Data** | — | Not available - Historical data only |


## **Analysis Summary**

### **Semrush API Limitations (36 requirements - 72%)**
- **AI/GEO Core Metrics**: Zero support for AI visibility, LLM mentions, or generative search
- **LLM Platform Analytics**: No tracking of ChatGPT, Claude, Perplexity, Gemini, Copilot
- **AI Content Performance**: No AI content scoring or optimization
- **Generative Search Traffic**: No AI traffic attribution

### **Semrush API Capabilities (12 requirements - 24%)**
- **Traditional SEO**: Domain analytics, keyword research, backlink analysis
- **Competitor Analysis**: Traditional competitor intelligence
- **Historical SEO Data**: Limited to monthly granularity

### **Semrush API Partial Support (2 requirements - 4%)**
- **Historical Data**: Limited granularity (monthly vs daily/hourly)
- **Real-time Data**: They provide historical data, not real-time

---

