Este é um novo projeto [**React Native**](https://reactnative.dev) criado com [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Primeiros Passos

> **Nota**: Certifique-se de ter concluído o guia [Configuração do Ambiente](https://reactnative.dev/docs/set-up-your-environment) antes de continuar.

## Passo 1: Iniciar o Metro

Primeiro, você precisa executar o **Metro**, a ferramenta de build JavaScript do React Native.

Para iniciar o servidor Metro, execute o seguinte comando na raiz do projeto:

```sh
# Usando npm
npm start

# OU usando Yarn
yarn start
```

## Passo 2: Compilar e executar o app

Com o Metro rodando, abra um novo terminal na raiz do projeto e use um dos comandos abaixo para compilar e executar o app no Android ou iOS:

### Android

```sh
# Usando npm
npm run android

# OU usando Yarn
yarn android
```

### iOS

Para iOS, lembre-se de instalar as dependências do CocoaPods (necessário apenas na primeira vez ou após atualizar dependências nativas).

Na primeira vez que criar o projeto, execute o Ruby bundler para instalar o próprio CocoaPods:

```sh
bundle install
```

Em seguida, e toda vez que atualizar dependências nativas, execute:

```sh
bundle exec pod install
```

Para mais informações, consulte o [guia de início do CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Usando npm
npm run ios

# OU usando Yarn
yarn ios
```

Se tudo estiver configurado corretamente, você verá o app rodando no Emulador Android, Simulador iOS ou no seu dispositivo conectado.

Esta é uma das formas de executar o app — você também pode compilá-lo diretamente pelo Android Studio ou Xcode.

## Passo 3: Modificar o app

Agora que o app está rodando com sucesso, vamos fazer alterações!

Abra o arquivo `App.tsx` no editor de sua preferência e faça modificações. Ao salvar, o app será atualizado automaticamente — isso é possível graças ao [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Para forçar um recarregamento completo, por exemplo para resetar o estado do app:

- **Android**: Pressione a tecla <kbd>R</kbd> duas vezes ou selecione **"Reload"** no **Menu Dev**, acessado via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) ou <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Pressione <kbd>R</kbd> no Simulador iOS.

## Parabéns! :tada:

Você executou e modificou seu app React Native com sucesso. :partying_face:

### E agora?

- Se quiser adicionar este código React Native a um aplicativo existente, consulte o [guia de integração](https://reactnative.dev/docs/integration-with-existing-apps).
- Se quiser aprender mais sobre React Native, acesse a [documentação oficial](https://reactnative.dev/docs/getting-started).

# Solução de Problemas

Se estiver com dificuldades para executar os passos acima, consulte a página de [Solução de Problemas](https://reactnative.dev/docs/troubleshooting).

# Saiba Mais

Para aprender mais sobre React Native, confira os recursos abaixo:

- [Site do React Native](https://reactnative.dev) - saiba mais sobre React Native.
- [Primeiros Passos](https://reactnative.dev/docs/environment-setup) - uma **visão geral** do React Native e como configurar o ambiente.
- [Aprenda o Básico](https://reactnative.dev/docs/getting-started) - um **tour guiado** pelos **fundamentos** do React Native.
- [Blog](https://reactnative.dev/blog) - leia as últimas publicações oficiais do **Blog** do React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - o **repositório** open source do React Native no GitHub.
