
import React from 'react';
import { Globe, Bot, Wrench, Code, Database, Gift } from 'lucide-react';
import type { CategoryIcons } from '@/hooks/useSearch';

/**
 * Creates and returns icons for different search categories
 */
export function getCategoryIcons(): CategoryIcons {
  return {
    "Web Tool": <Globe className="h-4 w-4 text-blue-400" />,
    "AI Tool": <Bot className="h-4 w-4 text-purple-400" />,
    "Developer Tool": <Wrench className="h-4 w-4 text-orange-400" />,
    "API": <Code className="h-4 w-4 text-green-400" />,
    "Developer API": <Database className="h-4 w-4 text-emerald-400" />,
    "Dev Perk": <Gift className="h-4 w-4 text-pink-400" />,
  };
}
