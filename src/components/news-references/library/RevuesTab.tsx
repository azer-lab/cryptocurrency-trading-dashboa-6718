
import React from 'react';
import { FileText, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceCard } from './ResourceCard';
import { useGlobalActions } from '@/hooks/useGlobalActions';

const revues = [
  {
    id: 1,
    title: "Revue Algérienne de Droit",
    issue: "N° 58 - 2024",
    publisher: "Faculté de Droit d'Alger",
    articles: 12,
    category: "Revue académique",
    description: "Articles de recherche en droit algérien"
  },
  {
    id: 2,
    title: "Revue de Jurisprudence",
    issue: "N° 45 - 2024",
    publisher: "Cour Suprême",
    articles: 8,
    category: "Jurisprudence",
    description: "Analyse des décisions de justice récentes"
  }
];

export function RevuesTab() {
  const actions = useGlobalActions();

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3 mb-6">
        <Button className="gap-2" onClick={actions.handleAddRevue}>
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => actions.handleImport(['.pdf', '.doc', '.docx', '.txt'])}>
          <Upload className="w-4 h-4" />
          Enrichir
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revues.map((revue) => (
          <ResourceCard
            key={revue.id}
            id={revue.id}
            title={revue.title}
            date={revue.issue}
            publisher={revue.publisher}
            articles={revue.articles}
            category={revue.category}
            description={revue.description}
            icon={<FileText className="w-5 h-5" />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        ))}
      </div>
    </div>
  );
}
