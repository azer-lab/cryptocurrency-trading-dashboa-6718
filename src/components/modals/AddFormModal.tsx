import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, FileText, Newspaper, Video, Users, Scale } from 'lucide-react';

interface AddFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'legal-text' | 'procedure' | 'news' | 'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'annuaire';
}

export function AddFormModal({ isOpen, onClose, formType }: AddFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    publisher: '',
    year: '',
    pages: '',
    url: '',
    content: ''
  });

  const getFormConfig = () => {
    switch (formType) {
      case 'ouvrage':
        return {
          title: 'Ajouter un Ouvrage',
          icon: <BookOpen className="w-5 h-5" />,
          fields: ['title', 'author', 'publisher', 'year', 'pages', 'category', 'description']
        };
      case 'revue':
        return {
          title: 'Ajouter une Revue',
          icon: <FileText className="w-5 h-5" />,
          fields: ['title', 'publisher', 'year', 'category', 'description']
        };
      case 'journal':
        return {
          title: 'Ajouter un Journal',
          icon: <Newspaper className="w-5 h-5" />,
          fields: ['title', 'publisher', 'year', 'category', 'description']
        };
      case 'article':
        return {
          title: 'Ajouter un Article',
          icon: <FileText className="w-5 h-5" />,
          fields: ['title', 'author', 'publisher', 'year', 'pages', 'category', 'description']
        };
      case 'video':
        return {
          title: 'Ajouter une Vidéo',
          icon: <Video className="w-5 h-5" />,
          fields: ['title', 'author', 'year', 'category', 'url', 'description']
        };
      case 'annuaire':
        return {
          title: 'Ajouter à l\'Annuaire',
          icon: <Users className="w-5 h-5" />,
          fields: ['title', 'category', 'url', 'description']
        };
      case 'legal-text':
        return {
          title: 'Ajouter un Texte Juridique',
          icon: <Scale className="w-5 h-5" />,
          fields: ['title', 'category', 'year', 'content', 'description']
        };
      default:
        return {
          title: 'Ajouter un Élément',
          icon: <FileText className="w-5 h-5" />,
          fields: ['title', 'category', 'description']
        };
    }
  };

  const config = getFormConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis",
        variant: "destructive"
      });
      return;
    }

    // Simulation de l'ajout
    toast({
      title: "Succès",
      description: `${config.title.replace('Ajouter', 'Élément ajouté:')} "${formData.title}"`,
    });

    // Reset form et fermer
    setFormData({
      title: '',
      description: '',
      category: '',
      author: '',
      publisher: '',
      year: '',
      pages: '',
      url: '',
      content: ''
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (field: string) => {
    switch (field) {
      case 'title':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Entrez le titre"
              required
            />
          </div>
        );
      case 'author':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Nom de l'auteur"
            />
          </div>
        );
      case 'publisher':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="publisher">Éditeur</Label>
            <Input
              id="publisher"
              value={formData.publisher}
              onChange={(e) => handleInputChange('publisher', e.target.value)}
              placeholder="Nom de l'éditeur"
            />
          </div>
        );
      case 'year':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="year">Année</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="2024"
            />
          </div>
        );
      case 'pages':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="pages">Nombre de pages</Label>
            <Input
              id="pages"
              type="number"
              value={formData.pages}
              onChange={(e) => handleInputChange('pages', e.target.value)}
              placeholder="150"
            />
          </div>
        );
      case 'category':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="droit-public">Droit Public</SelectItem>
                <SelectItem value="droit-civil">Droit Civil</SelectItem>
                <SelectItem value="droit-penal">Droit Pénal</SelectItem>
                <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
                <SelectItem value="droit-social">Droit Social</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'url':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://..."
            />
          </div>
        );
      case 'content':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Contenu du texte juridique..."
              rows={6}
            />
          </div>
        );
      case 'description':
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description de l'élément..."
              rows={3}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {config.fields.map(field => renderField(field))}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}