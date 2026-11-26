export interface SubRoute {
  label: string;
  route: string;
  image: string;
  group?: string;
}

export interface EcomNavRoute {
  label: string;
  subRoutes?: SubRoute[];
}
