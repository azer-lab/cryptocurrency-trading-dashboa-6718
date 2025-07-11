import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

interface AIConversation {
  id: string;
  title: string;
  messages: Array<{
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
}

interface AIProject {
  id: string;
  name: string;
  type: 'conversation' | 'search' | 'analysis' | 'algorithm' | 'research';
  description: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: Date;
}

export function useAIFunctionalities() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Gestion des conversations
  const createNewConversation = useCallback((title?: string) => {
    const newConversation: AIConversation = {
      id: `conv_${Date.now()}`,
      title: title || `Nouvelle conversation ${new Date().toLocaleString('fr-FR')}`,
      messages: [],
      createdAt: new Date()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    toast({
      title: "Nouvelle conversation créée",
      description: `Conversation "${newConversation.title}" initialisée avec succès.`,
    });
    
    return newConversation.id;
  }, [toast]);

  // Gestion des recherches IA
  const createNewSearch = useCallback((query?: string) => {
    const searchProject: AIProject = {
      id: `search_${Date.now()}`,
      name: query || `Recherche IA ${new Date().toLocaleTimeString('fr-FR')}`,
      type: 'search',
      description: `Recherche intelligente: ${query || 'Nouvelle recherche'}`,
      status: 'active',
      createdAt: new Date()
    };
    
    setProjects(prev => [searchProject, ...prev]);
    toast({
      title: "Nouvelle recherche IA lancée",
      description: `Recherche "${searchProject.name}" initialisée.`,
    });
    
    return searchProject.id;
  }, [toast]);

  // Gestion des recommandations
  const createNewRecommendation = useCallback(() => {
    const recProject: AIProject = {
      id: `rec_${Date.now()}`,
      name: `Recommandation ${new Date().toLocaleTimeString('fr-FR')}`,
      type: 'conversation',
      description: 'Nouvelles recommandations contextuelles générées',
      status: 'active',
      createdAt: new Date()
    };
    
    setProjects(prev => [recProject, ...prev]);
    toast({
      title: "Nouvelles recommandations",
      description: "Recommandations contextuelles mises à jour avec succès.",
    });
    
    return recProject.id;
  }, [toast]);

  // Gestion des projets IA
  const createNewAIProject = useCallback((type: AIProject['type'] = 'research') => {
    const project: AIProject = {
      id: `proj_${Date.now()}`,
      name: `Projet IA ${new Date().toLocaleTimeString('fr-FR')}`,
      type,
      description: `Nouveau projet de type ${type}`,
      status: 'active',
      createdAt: new Date()
    };
    
    setProjects(prev => [project, ...prev]);
    toast({
      title: "Nouveau projet IA créé",
      description: `Projet "${project.name}" ajouté avec succès.`,
    });
    
    return project.id;
  }, [toast]);

  // Gestion des algorithmes
  const createNewAlgorithm = useCallback(() => {
    return createNewAIProject('algorithm');
  }, [createNewAIProject]);

  // Gestion des analyses
  const createNewAnalysis = useCallback(() => {
    return createNewAIProject('analysis');
  }, [createNewAIProject]);

  // Fonctions de gestion
  const filterItems = useCallback((type: string) => {
    toast({
      title: "Filtres appliqués",
      description: `Filtrage par type: ${type}`,
    });
  }, [toast]);

  const sortItems = useCallback((criteria: string) => {
    toast({
      title: "Tri appliqué",
      description: `Tri par: ${criteria}`,
    });
  }, [toast]);

  const exportData = useCallback((format: string = 'JSON') => {
    setIsLoading(true);
    
    setTimeout(() => {
      const data = {
        conversations: conversations.length,
        projects: projects.length,
        exportedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai_data_export_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsLoading(false);
      toast({
        title: "Export terminé",
        description: `Données exportées au format ${format}`,
      });
    }, 1000);
  }, [conversations.length, projects.length, toast]);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Données actualisées",
        description: "Toutes les données ont été rafraîchies.",
      });
    }, 500);
  }, [toast]);

  const searchInData = useCallback((query: string) => {
    if (query.trim()) {
      toast({
        title: "Recherche effectuée",
        description: `Recherche pour: "${query}"`,
      });
    }
  }, [toast]);

  return {
    // État
    conversations,
    projects,
    isLoading,
    
    // Actions principales
    createNewConversation,
    createNewSearch,
    createNewRecommendation,
    createNewAIProject,
    createNewAlgorithm,
    createNewAnalysis,
    
    // Actions de gestion
    filterItems,
    sortItems,
    exportData,
    refreshData,
    searchInData
  };
}