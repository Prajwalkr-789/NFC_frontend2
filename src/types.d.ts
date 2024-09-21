interface Authentication {
  OPEN: string;
  SHARED: string;
  "WPA PERSONAL": string;
  "WPA2 PERSONAL": string;
  "WPA ENTERPRISE": string;
  "WPA2 ENTERPRISE": string;
  "WPA/WP2 PERSONAL": string;
}

interface Encryption {
  AES: string;
  WEP: string;
  NONE: string;
  TKIP: string;
  "AES/TKIP": string;
}

interface NDEFRecord {
  recordType: string;
  mediaType: string;
  data: string | DataView;
}
