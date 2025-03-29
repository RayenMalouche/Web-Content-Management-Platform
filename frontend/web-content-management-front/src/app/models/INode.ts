export interface INode {
  name: string;
  type: "row" | "column" | "widget";
  children: INode[];
  selected: boolean;
  description?: string;
  widgetId?: string;
}
