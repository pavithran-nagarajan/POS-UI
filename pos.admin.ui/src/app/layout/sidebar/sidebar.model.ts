export interface MenuItem {
  label: string;
  link?: string;
  icon?: string;
  badge?: string;
  header?: boolean;
  active?: boolean;
  open?: boolean;
  children?: MenuItem[];
}