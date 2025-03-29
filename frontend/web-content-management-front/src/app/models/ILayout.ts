export interface ILayout {
  name: string;
  code: string;
  description: string;
  type: "SECTION" | "ROUTABLE";
  status: "ACTIVE" | "INACTIVE";
}
