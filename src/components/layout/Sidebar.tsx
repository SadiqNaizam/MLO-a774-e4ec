import React from 'react';
import { cn } from '@/lib/utils'; // For conditional classes
import { ScrollArea } from '@/components/ui/scroll-area'; // Using shadcn ScrollArea

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Children will be the content of the sidebar (e.g., navigation links, filters)
  children: React.ReactNode;
  // Allows passing additional classes for custom styling
  className?: string;
  // Optional title for the sidebar section
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, title, ...props }) => {
  console.log("Rendering Sidebar component");

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col md:w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
        "transition-all duration-300 ease-in-out", // Basic transition for potential future collapse/expand
        className
      )}
      {...props}
    >
      {title && (
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
      )}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {children ? children : (
            <p className="text-sm text-gray-500 dark:text-gray-400">Sidebar content goes here.</p>
          )}
        </nav>
      </ScrollArea>
      {/* Optional footer section for the sidebar */}
      {/* <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">Sidebar Footer</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;