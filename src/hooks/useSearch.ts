
import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { webTools } from "@/data/webToolsData";
import { developerTools } from "@/data/developerToolsData";
import { aiToolsData } from "@/data/aiToolsData";
import { apiList } from "@/data/apisData";
import { perks } from "@/data/perksData";

// Define SearchItem interface to standardize result format
export interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryIcon: React.ReactNode;
  tags: string[];
  path: string;
}

export interface CategoryIcons {
  [key: string]: React.ReactNode;
}

interface UseSearchResult {
  query: string;
  setQuery: (value: string) => void;
  filteredResults: SearchItem[];
  groupedResults: Record<string, SearchItem[]>;
  allSearchItems: SearchItem[];
  loading: boolean;
}

export function useSearch(
  categoryIcons: CategoryIcons,
  maxResults: number = 5
): UseSearchResult {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 150);

  // Process all data sources into standardized search items with error handling
  const allSearchItems: SearchItem[] = useMemo(() => {
    try {
      const items: SearchItem[] = [];

      // Process Web Tools
      if (Array.isArray(webTools)) {
        webTools.forEach((tool) => {
          if (tool && tool.id && tool.name) {
            items.push({
              id: tool.id,
              name: tool.name,
              description: tool.description || "",
              category: "Web Tool",
              categoryIcon: categoryIcons["Web Tool"] || null,
              tags: Array.isArray(tool.tags) ? tool.tags : [],
              path: `/web-tools/${tool.slug || tool.id}`
            });
          }
        });
      }

      // Process Developer Tools
      if (Array.isArray(developerTools)) {
        developerTools.forEach((tool) => {
          if (tool && tool.id && tool.name) {
            items.push({
              id: tool.id,
              name: tool.name,
              description: tool.description || "",
              category: "Developer Tool",
              categoryIcon: categoryIcons["Developer Tool"] || null,
              tags: Array.isArray(tool.tags) ? tool.tags : [],
              path: `/tools/developer-tools/${tool.id}`
            });
          }
        });
      }

      // Process AI Tools
      if (Array.isArray(aiToolsData)) {
        aiToolsData.forEach((tool) => {
          if (tool && tool.id && tool.name) {
            items.push({
              id: tool.id,
              name: tool.name,
              description: tool.description || "",
              category: "AI Tool",
              categoryIcon: categoryIcons["AI Tool"] || null,
              tags: [tool.category, tool.pricingModel].filter(Boolean),
              path: `/ai-hub/${tool.id}`
            });
          }
        });
      }

      // Process APIs
      if (Array.isArray(apiList)) {
        apiList.forEach((api) => {
          if (api && api.name) {
            const slug = api.name.toLowerCase().replace(/\s+/g, "-");
            items.push({
              id: slug,
              name: api.name,
              description: api.description || "",
              category: "API",
              categoryIcon: categoryIcons["API"] || null,
              tags: Array.isArray(api.tags) ? api.tags : [],
              path: `/developer-apis/${slug}`
            });
          }
        });
      }

      // Process Dev Perks
      if (Array.isArray(perks)) {
        perks.forEach((perk) => {
          if (perk && perk.id && perk.name) {
            items.push({
              id: perk.id,
              name: perk.name,
              description: perk.description || "",
              category: "Dev Perk",
              categoryIcon: categoryIcons["Dev Perk"] || null,
              tags: Array.isArray(perk.tags) ? perk.tags : [],
              path: `/dev-perks/${perk.id}`
            });
          }
        });
      }

      return items;
    } catch (error) {
      console.error("Error processing search items:", error);
      return [];
    }
  }, [categoryIcons]);

  // Safer search function with error handling
  const safeSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim() || !Array.isArray(allSearchItems)) {
      return [];
    }

    setLoading(true);
    
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        setLoading(false);
      }, 200);

      const lowerQuery = searchTerm.toLowerCase();
      const queryTerms = lowerQuery.split(' ').filter(term => term.length > 0);
      
      return allSearchItems
        .filter((item) => {
          if (!item || !item.name) return false;
          
          // Check if name contains any term (higher priority)
          const nameMatches = queryTerms.some(term => 
            item.name.toLowerCase().includes(term)
          );
          
          // Check if description contains all terms (lower priority)
          const descriptionMatches = item.description ? queryTerms.every(term => 
            item.description.toLowerCase().includes(term)
          ) : false;
          
          // Check if any tag contains any term
          const tagMatches = Array.isArray(item.tags) ? item.tags.some(tag => 
            tag && queryTerms.some(term => tag.toLowerCase().includes(term))
          ) : false;
          
          // Check if category matches any term
          const categoryMatches = item.category ? queryTerms.some(term => 
            item.category.toLowerCase().includes(term)
          ) : false;
          
          return nameMatches || descriptionMatches || tagMatches || categoryMatches;
        })
        .sort((a, b) => {
          // Enhanced prioritization with null checks
          const aName = (a.name || "").toLowerCase();
          const bName = (b.name || "").toLowerCase();
          
          // Check if names exactly match the query
          const aExactMatch = aName === lowerQuery;
          const bExactMatch = bName === lowerQuery;
          
          if (aExactMatch && !bExactMatch) return -1;
          if (!aExactMatch && bExactMatch) return 1;
          
          // Check if names start with the query
          const aStartsWith = aName.startsWith(lowerQuery);
          const bStartsWith = bName.startsWith(lowerQuery);
          
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Check if names contain the query
          const aContains = aName.includes(lowerQuery);
          const bContains = bName.includes(lowerQuery);
          
          if (aContains && !bContains) return -1;
          if (!aContains && bContains) return 1;
          
          // Alphabetical sorting as fallback
          return aName.localeCompare(bName);
        })
        .slice(0, maxResults);
    } catch (error) {
      console.error("Search error:", error);
      setLoading(false);
      return [];
    }
  }, [allSearchItems, maxResults]);

  // Filter search results based on the query with fuzzy matching and error handling
  const filteredResults = useMemo(() => {
    if (!debouncedQuery || !debouncedQuery.trim()) {
      return [];
    }
    
    return safeSearch(debouncedQuery);
  }, [debouncedQuery, safeSearch]);

  // Group results by category with error handling
  const groupedResults = useMemo(() => {
    try {
      const grouped: Record<string, SearchItem[]> = {};
      
      if (Array.isArray(filteredResults)) {
        filteredResults.forEach((item) => {
          if (item && item.category) {
            if (!grouped[item.category]) {
              grouped[item.category] = [];
            }
            grouped[item.category].push(item);
          }
        });
      }
      
      return grouped;
    } catch (error) {
      console.error("Error grouping results:", error);
      return {};
    }
  }, [filteredResults]);

  return {
    query,
    setQuery,
    filteredResults,
    groupedResults,
    allSearchItems,
    loading
  };
}
