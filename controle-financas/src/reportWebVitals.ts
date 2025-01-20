import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);  // CLS = Cumulative Layout Shift
    onFID(onPerfEntry);  // FID = First Input Delay
    onFCP(onPerfEntry);  // FCP = First Contentful Paint
    onLCP(onPerfEntry);  // LCP = Largest Contentful Paint
    onTTFB(onPerfEntry); // TTFB = Time to First Byte
  }
};

export default reportWebVitals;
