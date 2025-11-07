'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ArrowDownAZ, Edit, Trash2, Library } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { usePrompts } from "@/hooks/use-prompts";

export default function LibraryPage() {
  const { t } = useLanguage();
  const { prompts, deletePrompt } = usePrompts();
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/dashboard?edit=${id}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline tracking-tight">
          {t('library.title')}
        </h2>
        <p className="text-muted-foreground">{t('library.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder={t('library.search_placeholder')} className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('library.sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {t('library.sort_newest')}</div>
              </SelectItem>
              <SelectItem value="oldest">
                 <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {t('library.sort_oldest')}</div>
              </SelectItem>
              <SelectItem value="alphabetical">
                 <div className="flex items-center gap-2"><ArrowDownAZ className="h-4 w-4" /> {t('library.sort_alphabetical')}</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {prompts.length > 0 ? (
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map(prompt => (
                <TableRow key={prompt.id}>
                  <TableCell className="font-medium">{prompt.title}</TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant="secondary">{prompt.category}</Badge></TableCell>
                  <TableCell className="hidden lg:table-cell">{new Date(prompt.id).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="icon" onClick={() => handleEdit(prompt.id)}>
                          <Edit className="h-4 w-4" />
                     </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deletePrompt(prompt.id)}>
                          <Trash2 className="h-4 w-4" />
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center h-96">
            <Library className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{t('dashboard.prompt_list.empty_title')}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.prompt_list.empty_description')}</p>
             <Button className="mt-4" onClick={() => router.push('/dashboard')}>
                {t('dashboard.create_prompt')}
             </Button>
        </div>
      )}

    </div>
  );
}
