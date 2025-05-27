import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Grid, 
  LayoutGrid, 
  Code, 
  Copy, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  HelpCircle,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import WebToolCard from "@/components/WebToolCard";
import { webTools } from "@/data/webToolsData";
import * as LucideIcons from "lucide-react";

interface GridItem {
  id: string;
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  color: string;
}

const GridGenerator = () => {
  const [columns, setColumns] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);
  const [columnGap, setColumnGap] = useState<number>(16);
  const [rowGap, setRowGap] = useState<number>(16);
  const [autoFit, setAutoFit] = useState<boolean>(false);
  const [autoFill, setAutoFill] = useState<boolean>(false);
  const [minMaxWidth, setMinMaxWidth] = useState<string>("200px");
  const [customGridItems, setCustomGridItems] = useState<GridItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [manualColumnTemplate, setManualColumnTemplate] = useState<string>("");
  const [manualRowTemplate, setManualRowTemplate] = useState<string>("");
  const [useManualColumns, setUseManualColumns] = useState<boolean>(false);
  const [useManualRows, setUseManualRows] = useState<boolean>(false);
  
  const gridItemColors = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-600",
    "bg-gradient-to-br from-green-500 to-green-600",
    "bg-gradient-to-br from-orange-500 to-orange-600",
    "bg-gradient-to-br from-red-500 to-red-600",
    "bg-gradient-to-br from-yellow-500 to-yellow-600",
    "bg-gradient-to-br from-pink-500 to-pink-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-600",
    "bg-gradient-to-br from-teal-500 to-teal-600",
  ];
  
  const getGridTemplateColumns = () => {
    if (useManualColumns && manualColumnTemplate) {
      return manualColumnTemplate;
    }
    
    if (autoFit || autoFill) {
      return `repeat(${autoFit ? "auto-fit" : "auto-fill"}, minmax(${minMaxWidth}, 1fr))`;
    }
    
    return `repeat(${columns}, 1fr)`;
  };
  
  const getGridTemplateRows = () => {
    if (useManualRows && manualRowTemplate) {
      return manualRowTemplate;
    }
    
    return `repeat(${rows}, minmax(60px, auto))`;
  };
  
  const generateCssCode = () => {
    let code = `.grid-container {\n`;
    code += `  display: grid;\n`;
    code += `  grid-template-columns: ${getGridTemplateColumns()};\n`;
    code += `  grid-template-rows: ${getGridTemplateRows()};\n`;
    code += `  column-gap: ${columnGap}px;\n`;
    code += `  row-gap: ${rowGap}px;\n`;
    code += `}\n`;
    
    if (customGridItems.length > 0) {
      customGridItems.forEach((item, index) => {
        code += `\n.grid-item-${index + 1} {\n`;
        code += `  grid-column: ${item.colStart} / ${item.colEnd};\n`;
        code += `  grid-row: ${item.rowStart} / ${item.rowEnd};\n`;
        code += `}\n`;
      });
    }
    
    return code;
  };
  
  const addGridItem = () => {
    const newItem: GridItem = {
      id: Date.now().toString(),
      colStart: 1,
      colEnd: 2,
      rowStart: 1,
      rowEnd: 2,
      color: gridItemColors[customGridItems.length % gridItemColors.length]
    };
    
    setCustomGridItems([...customGridItems, newItem]);
  };
  
  const removeGridItem = (id: string) => {
    setCustomGridItems(customGridItems.filter(item => item.id !== id));
  };
  
  const updateGridItem = (id: string, field: keyof GridItem, value: number) => {
    setCustomGridItems(
      customGridItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  const copyToClipboard = () => {
    const code = generateCssCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard",
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const resetGrid = () => {
    setColumns(3);
    setRows(3);
    setColumnGap(16);
    setRowGap(16);
    setAutoFit(false);
    setAutoFill(false);
    setMinMaxWidth("200px");
    setCustomGridItems([]);
    setManualColumnTemplate("");
    setManualRowTemplate("");
    setUseManualColumns(false);
    setUseManualRows(false);
    
    toast({
      title: "Reset Complete",
      description: "Grid configuration has been reset to defaults",
      duration: 2000,
    });
  };
  
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.includes("CSS") && 
      tool.slug !== "grid-generator"
    )
    .slice(0, 3);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 primary-gradient bg-clip-text text-transparent">
            CSS Grid Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create responsive CSS grid layouts visually and generate the code for your projects.
            Adjust columns, rows, gaps, and see live updates.
          </p>
        </div>
        
        <div className="mb-12 bg-muted/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-medium">How to Use</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</div>
              <p>Adjust the number of columns and rows using the inputs or sliders in the left panel.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">2</div>
              <p>Set the column and row gaps to control spacing between grid cells.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">3</div>
              <p>Toggle responsive features like auto-fit or auto-fill for responsive layouts.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">4</div>
              <p>Add custom grid items and adjust their position in the grid using the span controls.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">5</div>
              <p>Click "Copy CSS" to copy the generated code for use in your projects.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid className="h-5 w-5 text-primary" />
                  Grid Configuration
                </CardTitle>
                <CardDescription>
                  Adjust grid layout properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="columns">Columns: {columns}</Label>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => setColumns(Math.max(1, columns - 1))} 
                            disabled={columns <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => setColumns(columns + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Slider 
                        id="columns"
                        value={[columns]} 
                        min={1} 
                        max={12} 
                        step={1} 
                        onValueChange={(value) => setColumns(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rows">Rows: {rows}</Label>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => setRows(Math.max(1, rows - 1))} 
                            disabled={rows <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => setRows(rows + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Slider 
                        id="rows"
                        value={[rows]} 
                        min={1} 
                        max={12} 
                        step={1} 
                        onValueChange={(value) => setRows(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="column-gap">Column Gap: {columnGap}px</Label>
                      <Slider 
                        id="column-gap"
                        value={[columnGap]} 
                        min={0} 
                        max={50} 
                        step={2} 
                        onValueChange={(value) => setColumnGap(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="row-gap">Row Gap: {rowGap}px</Label>
                      <Slider 
                        id="row-gap"
                        value={[rowGap]} 
                        min={0} 
                        max={50} 
                        step={2} 
                        onValueChange={(value) => setRowGap(value[0])} 
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={resetGrid}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Grid
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    <div className="space-y-4 p-4 border rounded-md">
                      <h3 className="text-sm font-medium">Responsive Grid</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-fit">Auto-fit</Label>
                          <p className="text-xs text-muted-foreground">Fit items into available space</p>
                        </div>
                        <Switch 
                          id="auto-fit" 
                          checked={autoFit} 
                          onCheckedChange={(checked) => {
                            setAutoFit(checked);
                            if (checked) setAutoFill(false);
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-fill">Auto-fill</Label>
                          <p className="text-xs text-muted-foreground">Fill available space with as many items as possible</p>
                        </div>
                        <Switch 
                          id="auto-fill" 
                          checked={autoFill} 
                          onCheckedChange={(checked) => {
                            setAutoFill(checked);
                            if (checked) setAutoFit(false);
                          }}
                        />
                      </div>
                      
                      {(autoFit || autoFill) && (
                        <div className="space-y-2 mt-2">
                          <Label htmlFor="min-max-width">Min column width</Label>
                          <Input 
                            id="min-max-width" 
                            value={minMaxWidth} 
                            onChange={(e) => setMinMaxWidth(e.target.value)} 
                            placeholder="e.g. 200px" 
                          />
                          <p className="text-xs text-muted-foreground">
                            Minimum width for each column (e.g. 200px, 20rem, 25%)
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4 p-4 border rounded-md">
                      <h3 className="text-sm font-medium">Manual Templates</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="manual-columns">Custom grid-template-columns</Label>
                          <Switch 
                            id="manual-columns" 
                            checked={useManualColumns} 
                            onCheckedChange={setUseManualColumns}
                          />
                        </div>
                        <Input 
                          value={manualColumnTemplate} 
                          onChange={(e) => setManualColumnTemplate(e.target.value)} 
                          placeholder="e.g. 1fr 2fr 1fr" 
                          disabled={!useManualColumns}
                        />
                        <p className="text-xs text-muted-foreground">
                          Manually define column widths (e.g. 1fr 2fr 1fr, repeat(3, 1fr), etc.)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="manual-rows">Custom grid-template-rows</Label>
                          <Switch 
                            id="manual-rows" 
                            checked={useManualRows} 
                            onCheckedChange={setUseManualRows}
                          />
                        </div>
                        <Input 
                          value={manualRowTemplate} 
                          onChange={(e) => setManualRowTemplate(e.target.value)} 
                          placeholder="e.g. auto 200px auto" 
                          disabled={!useManualRows}
                        />
                        <p className="text-xs text-muted-foreground">
                          Manually define row heights (e.g. auto 200px auto, repeat(2, 100px), etc.)
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    Grid Items
                  </div>
                  <Button 
                    onClick={addGridItem} 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </Button>
                </CardTitle>
                <CardDescription>
                  Define custom grid items and their positions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {customGridItems.length === 0 ? (
                  <div className="text-center p-4 border border-dashed rounded-md">
                    <p className="text-sm text-muted-foreground">
                      No custom grid items yet. Click "Add Item" to create one.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {customGridItems.map((item, index) => (
                      <div key={item.id} className="p-3 border rounded-md relative">
                        <div className="absolute top-3 right-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive"
                            onClick={() => removeGridItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <h4 className="font-medium mb-3 flex items-center">
                          <div className={`w-4 h-4 rounded-sm mr-2 ${item.color}`}></div>
                          Grid Item {index + 1}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`col-start-${item.id}`}>Column Start</Label>
                            <Select
                              value={item.colStart.toString()}
                              onValueChange={(value) => updateGridItem(item.id, "colStart", parseInt(value))}
                            >
                              <SelectTrigger id={`col-start-${item.id}`}>
                                <SelectValue>{item.colStart}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: columns }, (_, i) => (
                                  <SelectItem key={i} value={(i + 1).toString()}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`col-end-${item.id}`}>Column End</Label>
                            <Select
                              value={item.colEnd.toString()}
                              onValueChange={(value) => updateGridItem(item.id, "colEnd", parseInt(value))}
                            >
                              <SelectTrigger id={`col-end-${item.id}`}>
                                <SelectValue>{item.colEnd}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: columns + 1 - item.colStart }, (_, i) => (
                                  <SelectItem key={i} value={(item.colStart + i + 1).toString()}>
                                    {item.colStart + i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`row-start-${item.id}`}>Row Start</Label>
                            <Select
                              value={item.rowStart.toString()}
                              onValueChange={(value) => updateGridItem(item.id, "rowStart", parseInt(value))}
                            >
                              <SelectTrigger id={`row-start-${item.id}`}>
                                <SelectValue>{item.rowStart}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: rows }, (_, i) => (
                                  <SelectItem key={i} value={(i + 1).toString()}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`row-end-${item.id}`}>Row End</Label>
                            <Select
                              value={item.rowEnd.toString()}
                              onValueChange={(value) => updateGridItem(item.id, "rowEnd", parseInt(value))}
                            >
                              <SelectTrigger id={`row-end-${item.id}`}>
                                <SelectValue>{item.rowEnd}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: rows + 1 - item.rowStart }, (_, i) => (
                                  <SelectItem key={i} value={(item.rowStart + i + 1).toString()}>
                                    {item.rowStart + i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-muted-foreground">
                          Span: {item.colEnd - item.colStart} column(s) × {item.rowEnd - item.rowStart} row(s)
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Generated CSS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-accent/10 rounded-md overflow-x-auto text-sm font-mono max-h-[200px] overflow-y-auto whitespace-pre">
                  {generateCssCode()}
                </pre>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full flex items-center gap-2" 
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy CSS
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See how your CSS grid layout looks with the current settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-md overflow-hidden h-[700px] bg-accent/5 p-6 overflow-y-auto"
                style={{
                  display: "grid",
                  gridTemplateColumns: getGridTemplateColumns(),
                  gridTemplateRows: getGridTemplateRows(),
                  columnGap: `${columnGap}px`,
                  rowGap: `${rowGap}px`
                }}
              >
                {customGridItems.length === 0 && Array.from({ length: columns * rows }).map((_, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-center p-4 ${gridItemColors[index % gridItemColors.length]} rounded-md shadow-sm text-white font-medium`}
                  >
                    Grid Cell {index + 1}
                  </div>
                ))}
                
                {customGridItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-center p-4 ${item.color} rounded-md shadow-sm text-white font-medium`}
                    style={{
                      gridColumn: `${item.colStart} / ${item.colEnd}`,
                      gridRow: `${item.rowStart} / ${item.rowEnd}`
                    }}
                  >
                    Grid Item {index + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended Tools</h2>
            <Button variant="outline" asChild>
              <a href="/web-tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon as keyof typeof LucideIcons}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GridGenerator;
