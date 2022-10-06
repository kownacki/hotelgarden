import materialColors from 'material-colors';
import { colord } from 'colord';
export const API_KEY = 'AIzaSyDvamIugzBC3k3WA52KpHeINrfDHfkvnSs';
// HDTV resolution
export const HDTV_WIDTH = 1920;
export const HDTV_HEIGHT = 1080;
export const PRIMARY_COLOR = colord('#234D47').lighten(0.05).toHex();
export const SECONDARY_COLOR = '#E2A96A';
export const SECONDARY_DARK_COLOR = colord(SECONDARY_COLOR).darken(0.1).toHex();
export const TEXT_COLOR = materialColors.grey['800'];
export const SURFACE_COLOR = materialColors.grey['600'];
export const SURFACE_LIGHT_COLOR = materialColors.grey['100'];
export const SURFACE_DARK_COLOR = materialColors.grey['800'];
export const PLACEHOLDER_COLOR = materialColors.grey['500'];
export const ERROR_COLOR = materialColors.red['800'];
export const ERROR_BACKGROUND_COLOR = materialColors.red['100'];
export const CORRECT_COLOR = materialColors.green['800'];
export const LOGOTYPE_COLOR = '#84979E';
