// Build sırasında (Node tarafında) çalışır: uygulamayı statik HTML'e çevirir.
// Tarayıcıda hiç yüklenmez. Bkz. scripts/prerender.mjs
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(<App />);
}
