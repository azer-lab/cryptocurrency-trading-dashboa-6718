
import React from 'react';
import { TabFormField } from '@/components/common/TabFormField';
import { useAIFunctionalities } from '@/hooks/useAIFunctionalities';
import { ConversationalAIAssistant } from './ConversationalAIAssistant';
import { AIInsightsAndHistory } from './AIInsightsAndHistory';

export function ConversationTab() {
  const { createNewConversation } = useAIFunctionalities();
  
  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Poser une question à l'assistant IA juridique..."
        onSearch={(query) => console.log('Question IA:', query)}
        onAdd={() => createNewConversation()}
        onFilter={() => console.log('Filtrer conversations')}
        onSort={() => console.log('Trier conversations')}
        onExport={() => console.log('Exporter conversation')}
        onRefresh={() => console.log('Actualiser IA')}
        showActions={true}
      />

      <ConversationalAIAssistant />
      
      <AIInsightsAndHistory />
    </div>
  );
}
