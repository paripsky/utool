import { lazy } from 'react';
import { SiConvertio } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

const base = '/util';

export const routes = [
  {
    id: 'builtins/base64tranformer',
    name: 'Base64 Transformer',
    component: lazy(() => import('./Base64Transformer')),
    icon: SiConvertio,
  },
  {
    id: 'builtins/jsonviewer',
    name: 'JSON Viewer',
    component: lazy(() => import('./JSONViewer')),
    icon: VscJson,
  },
  {
    id: 'builtins/speechtotext',
    name: 'Speech to Text',
    component: lazy(() => import('./SpeechToText')),
  },
].map((route) => ({ ...route, path: `${base}/${route.id}` }));
