
import React from 'react';
import { Video, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceCard } from './ResourceCard';
import { useGlobalActions } from '@/hooks/useGlobalActions';

const videos = [
  {
    id: 1,
    title: "Conférence sur la Constitution algérienne",
    speaker: "Pr. Mohamed Bedjaoui",
    duration: "1h 45min",
    date: "12 Décembre 2023",
    category: "Conférence",
    description: "Analyse constitutionnelle approfondie"
  },
  {
    id: 2,
    title: "Formation en droit commercial",
    speaker: "Dr. Sarah Hamdi",
    duration: "2h 30min",
    date: "08 Novembre 2023",
    category: "Formation",
    description: "Aspects pratiques du droit commercial"
  }
];

export function VideosTab() {
  const actions = useGlobalActions();

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3 mb-6">
        <Button className="gap-2" onClick={actions.handleAddVideo}>
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => actions.handleImport(['.pdf', '.doc', '.docx', '.txt'])}>
          <Upload className="w-4 h-4" />
          Enrichir
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <ResourceCard
            key={video.id}
            id={video.id}
            title={video.title}
            speaker={video.speaker}
            duration={video.duration}
            date={video.date}
            category={video.category}
            description={video.description}
            icon={<Video className="w-5 h-5" />}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            actionLabel="Regarder"
          />
        ))}
      </div>
    </div>
  );
}
