import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CodeSnippet } from "./CodeSnippet";
import { ResponsiveContainer } from "./ResponsiveContainer";

interface ComponentPreviewProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  vueCode?: string;
  swiftCode?: string;
  vanillaCode?: string;
}

const generateHtml = (code: string) => {
    // Basic heuristic to convert JSX to HTML string
    return code
        .replace(/className=/g, 'class=')
        .replace(/htmlFor=/g, 'for=')
        .replace(/defaultValue=/g, 'value=')
        .replace(/defaultChecked/g, 'checked')
        .replace(/key=\{[^}]+\}/g, '') // Remove React keys
        .replace(/import .*;/g, '')
        .replace(/export const .* = \(\) => \(/, '')
        .replace(/\);$/, '')
        
        // Convert Self-closing tags to explicit close if needed or leave as void
        .replace(/<([A-Z][a-zA-Z]*)([^>]*)\/>/g, '<$1$2></$1>') 
        
        // Specific Component Mappings to Semantic HTML
        .replace(/<Button/g, '<button').replace(/<\/Button>/g, '</button>')
        .replace(/<Badge/g, '<span').replace(/<\/Badge>/g, '</span>')
        .replace(/<Input/g, '<input').replace(/<\/Input>/g, '')
        .replace(/<Label/g, '<label').replace(/<\/Label>/g, '</label>')
        
        // Generic fallback for other React Components -> div with data-component attribute
        .replace(/<([A-Z][a-zA-Z]*)/g, '<div data-component="$1"') 
        .replace(/<\/[A-Z][a-zA-Z]*>/g, '</div>')
        
        // Convert JSX Style Objects to Inline Styles
        .replace(/style={{([^}]*)}}/g, (match, styleContent) => {
             return 'style="' + styleContent
                .replace(/'/g, '')
                .replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                .replace(/, /g, '; ')
                + '"';
        })
        
        // Convert JSX Interpolation {var} to Template Literal ${var}
        // Note: This is a simple heuristic and won't handle complex nested logic perfectly
        .replace(/\{([^}]+)\}/g, '${$1}')
        
        .trim();
};

const generateVanilla = (title: string, code: string) => {
    const html = generateHtml(code);
    const functionName = "create" + title.replace(/[^a-zA-Z0-9]/g, '');
    
    return `/**
 * Vanilla JS Implementation
 * Note: Complex React logic (like loops or event handlers) 
 * has been simplified for this preview.
 */
export const ${functionName} = () => {
    const container = document.createElement('div');
    container.className = "component-wrapper";
    
    container.innerHTML = \`
${html}
    \`;
    
    return container;
};`;
};

const CSS_BOILERPLATE = `/* 
  Global Theme Variables 
  Defined in :root (see Theme Builder)
*/
:root {
  --primary: ...;
  --primary-foreground: ...;
  --background: ...;
  --foreground: ...;
  --radius: ...;
}

/* 
  Utility Classes (Tailwind CSS)
  All classes map to the above variables.
*/
.bg-primary { background-color: var(--primary); }
.text-primary-foreground { color: var(--primary-foreground); }
/* ... and so on */
`;

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  title,
  description,
  preview,
  code,
  vueCode,
  swiftCode,
  vanillaCode,
}) => {
  const htmlCode = generateHtml(code);
  const vanillaJsCode = vanillaCode || generateVanilla(title, code);

  return (
    <div className="space-y-4" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-base leading-[160%]">
          {description}
        </p>
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vanilla">Vanilla JS</TabsTrigger>
          {vueCode && <TabsTrigger value="vue">Vue</TabsTrigger>}
          {swiftCode && <TabsTrigger value="swift">Swift</TabsTrigger>}
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-2">
            <ResponsiveContainer className="bg-muted/50 p-6 border rounded-md">
                {preview}
            </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="react" className="mt-2">
            <CodeSnippet code={code} language="tsx" />
        </TabsContent>
        <TabsContent value="vanilla" className="mt-2">
            <CodeSnippet code={vanillaJsCode} language="javascript" />
        </TabsContent>
        {vueCode && (
            <TabsContent value="vue" className="mt-2">
                <CodeSnippet code={vueCode} language="jsx" />
            </TabsContent>
        )}
        {swiftCode && (
            <TabsContent value="swift" className="mt-2">
                <CodeSnippet code={swiftCode} language="swift" />
            </TabsContent>
        )}
        <TabsContent value="html" className="mt-2">
            <CodeSnippet code={htmlCode} language="html" />
        </TabsContent>
        <TabsContent value="css" className="mt-2">
            <CodeSnippet code={CSS_BOILERPLATE} language="css" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
