export interface MenuItem {
  active?: boolean;
  badge?: string;
  children?: MenuItem[];
  header?: boolean;
  icon?: string;
  label: string;
  link?: string;
  open?: boolean;
}