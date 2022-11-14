export interface DropMenu {
  onClick?: Fn;
  to?: string;
  icon?: string;
  event: string | number;
  text: string;
  unshow?: boolean;
  disabled?: boolean;
  divider?: boolean;
}
