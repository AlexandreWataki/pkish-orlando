// src/setup/ignoreLogs.ts
import { LogBox } from 'react-native';

// Ignore por substring (funciona mesmo se a mensagem vier com quebras de linha)
LogBox.ignoreLogs([
  'setLayoutAnimationEnabledExperimental',       // substring ampla
  'no-op in the New Architecture',               // substring de reforço
]);

// Se um dia quiser silenciar tudo (não recomendo), troque por:
// LogBox.ignoreAllLogs(true);
