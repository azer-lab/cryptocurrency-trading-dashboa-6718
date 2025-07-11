
import React from 'react';
import { FileTextIcon, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceCard } from './ResourceCard';
import { useGlobalActions } from '@/hooks/useGlobalActions';

const articles = [
  {
    id: 1,
    title: "La réforme du code de procédure civile",
    author: "Dr. Karim Benali",
    journal: "Revue Algérienne de Droit",
    year: "2024",
    pages: "45-67",
    category: "Procédure",
    description: "Analyse des modifications récentes"
  },
  {
    id: 2,
    title: "L'évolution du droit des affaires en Algérie",
    author: "Pr. Amina Boucherit",
    journal: "Cahiers Juridiques",
    year: "2023",
    pages: "123-145",
    category: "Droit des affaires",
    description: "Étude comparative et prospective"
  }
];

export function ArticlesTab() {
  const actions = useGlobalActions();

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3 mb-6">
        <Button className="gap-2" onClick={actions.handleAddArticle}>
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => actions.handleImport(['.pdf', '.doc', '.docx', '.txt'])}>
          <Upload className="w-4 h-4" />
          Enrichir
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <ResourceCard
            key={article.id}
            id={article.id}
            title={article.title}
            author={article.author}
            journal={article.journal}
            year={article.year}
            pages={article.pages}
            category={article.category}
            description={article.description}
            icon={<FileTextIcon className="w-5 h-5" />}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        ))}
      </div>
    </div>
  );
}
