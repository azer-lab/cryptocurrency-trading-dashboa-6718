
import React from 'react';
import { TabFormField } from '@/components/common/TabFormField';
import { useAIFunctionalities } from '@/hooks/useAIFunctionalities';
import { EnhancedContextualRecommendations } from './EnhancedContextualRecommendations';

export function RecommendationsTab() {
  const {
    createNewRecommendation,
    filterItems,
    sortItems,
    exportData,
    refreshData,
    searchInData
  } = useAIFunctionalities();

  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Explorer les recommandations contextuelles..."
        onSearch={searchInData}
        onAdd={createNewRecommendation}
        onFilter={() => filterItems('recommendation')}
        onSort={() => sortItems('priority')}
        onExport={() => exportData('recommendation')}
        onRefresh={refreshData}
        showActions={true}
      />
      <EnhancedContextualRecommendations />
    </div>
  );
}
