
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Wand2, Database, Scan } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';
import { useImportExport } from '@/hooks/useImportExport';
import { useToast } from '@/hooks/use-toast';

interface LegalTextsEnrichmentTabProps {
  onAddLegalText: () => void;
  onOCRTextExtracted?: (text: string) => void;
}

export function LegalTextsEnrichmentTab({ onAddLegalText, onOCRTextExtracted }: LegalTextsEnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const { importCSVExcel, autoFillData, autoExtractText } = useImportExport();
  const { toast } = useToast();

  const handleOCRExtracted = (text: string) => {
    console.log('Texte OCR extrait:', text);
    if (onOCRTextExtracted) {
      onOCRTextExtracted(text);
    }
    setShowOCRScanner(false);
  };

  const handleImportCSVExcel = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await importCSVExcel(file, {
            format: file.name.endsWith('.csv') ? 'csv' : 'excel',
            hasHeader: true
          });
        } catch (error) {
          console.error('Erreur lors de l\'import:', error);
        }
      }
    };
    input.click();
  };

  const handleAutoFill = async () => {
    try {
      await autoFillData({
        type: 'legal-text',
        partialData: {}
      });
    } catch (error) {
      console.error('Erreur lors de l\'auto-remplissage:', error);
    }
  };

  const handleAutoExtract = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await autoExtractText(file);
        } catch (error) {
          console.error('Erreur lors de l\'extraction:', error);
        }
      }
    };
    input.click();
  };

  if (showOCRScanner) {
    return (
      <OCRScanner
        title="Scanner un document juridique"
        onTextExtracted={handleOCRExtracted}
        onClose={() => setShowOCRScanner(false)}
      />
    );
  }

  const actions = [
    {
      icon: Plus,
      title: "Ajouter un texte juridique",
      description: "Saisir manuellement un nouveau texte juridique algérien",
      buttonText: "Nouveau texte",
      color: "emerald",
      onClick: onAddLegalText
    },
    {
      icon: Scan,
      title: "Scanner un document",
      description: "Numériser et extraire le texte d'un document avec OCR",
      buttonText: "Scanner OCR",
      color: "blue",
      onClick: () => setShowOCRScanner(true)
    },
    {
      icon: Upload,
      title: "Import en lot",
      description: "Importer plusieurs textes depuis un fichier Excel/CSV",
      buttonText: "Import CSV/Excel",
      color: "blue",
      onClick: handleImportCSVExcel
    },
    {
      icon: Wand2,
      title: "Auto-remplissage intelligent",
      description: "Remplissage automatique avec IA",
      buttonText: "Auto-remplissage",
      color: "purple",
      onClick: handleAutoFill
    },
    {
      icon: Database,
      title: "Extraction automatique",
      description: "Importer et traiter automatiquement des textes juridiques",
      buttonText: "Extraction auto",
      color: "orange",
      onClick: handleAutoExtract
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.onClick}>
            <CardHeader className="text-center">
              <action.icon className={`w-12 h-12 mx-auto text-${action.color}-600 mb-4`} />
              <CardTitle>{action.title}</CardTitle>
              <CardDescription>
                {action.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className={`w-full bg-${action.color}-600 hover:bg-${action.color}-700`} onClick={action.onClick}>
                <action.icon className="w-4 h-4 mr-2" />
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
