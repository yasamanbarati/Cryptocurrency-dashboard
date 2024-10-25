import { IconProps } from "@mui/material";
interface HeaderProps {
  kind: string;
  title: string;
  segment?: undefined;
}
interface SegmentProps {
  segment: string;
  title: string;
  kind?: undefined;
}
export type NavbarProps = HeaderProps | SegmentProps ;
