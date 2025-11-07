'use client';
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
import { Search, Clock, ArrowDownAZ, ArrowUpAZ, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const mockPrompts = [
  { id: 1, title: 'Generate a marketing slogan for a new coffee brand.', category: 'Marketing', createdAt: '2023-10-27T10:00:00Z', isPublic: true },
  { id: 2, title: 'Write a short story in the style of Edgar Allan Poe.', category: 'Writing', createdAt: '2023-10-26T15:30:00Z', isPublic: false },
  { id: 3, title: 'Create a responsive navigation bar using Flexbox.', category: 'Developer Tools', createdAt: '2023-10-25T11:00:00Z', isPublic: true },
  { id: 4, title: 'Design a logo for a tech startup named "Innovate".', category: 'Design', createdAt: '2023-10-24T09:00:00Z', isPublic: false },
  { id: 5, title: 'Explain the concept of photosynthesis to a 5th grader.', category: 'Education', createdAt: '2023-10-23T14:00:00Z', isPublic: false },
  { id: 6, title: 'Generate five blog post ideas about renewable energy.', category: 'Writing', createdAt: '2023-10-22T18:00:00Z', isPublic: true },
  { id: 7, title: 'Create a Python script to scrape a website for data.', category: 'Developer Tools', createdAt: '2023-10-21T12:00:00Z', isPublic: false },
];

export default function LibraryPage() {
  const { t } = useLanguage();

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
      
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrompts.map(prompt => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">{prompt.title}</TableCell>
                <TableCell className="hidden md:table-cell"><Badge variant="secondary">{prompt.category}</Badge></TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(prompt.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <Badge variant={prompt.isPublic ? 'default' : 'outline'}>
                        {prompt.isPublic ? 'Public' : 'Private'}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                   </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
