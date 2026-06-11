import { Search } from "lucide-react";
import { allTopics } from "@/data/graph";

interface GraphSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTopics: Set<string>;
  onTopicToggle: (topic: string) => void;
  onClearFilters: () => void;
}

export function GraphSearch({ searchQuery, onSearchChange, activeTopics, onTopicToggle, onClearFilters }: GraphSearchProps) {
  return (
    <div className="absolute top-14 left-4 right-4 z-10 flex flex-col gap-2 max-w-[600px]">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search nodes..."
          className="w-full pl-8 pr-3 py-1.5 text-sm bg-[#1a1a1a] border border-[#333] rounded-md text-[#e5e5e5] placeholder-[#555555] focus:outline-none focus:border-[#555] transition-colors"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={onClearFilters}
          className={`text-xs px-2 py-0.5 rounded border transition-colors ${activeTopics.size === 0 ? "bg-[#333] border-[#555] text-[#e5e5e5]" : "bg-transparent border-[#333] text-[#555555] hover:text-[#a3a3a3]"}`}
        >
          All
        </button>
        {allTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicToggle(topic)}
            className={`text-xs px-2 py-0.5 rounded border transition-colors ${activeTopics.has(topic) ? "bg-[#333] border-[#555] text-[#e5e5e5]" : "bg-transparent border-[#333] text-[#555555] hover:text-[#a3a3a3]"}`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
