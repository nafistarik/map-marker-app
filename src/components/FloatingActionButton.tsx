import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({
  onClick,
  className,
}: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        'fixed bottom-8 right-20 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 bg-primary/30',
        className
      )}
    >
      <PlusIcon className="h-6 w-6" />
      <span className="sr-only">Add Marker</span>
    </Button>
  );
}