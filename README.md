# 🏍️ MotoMap

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

Projeto de aplicativo mobile para a disciplina de **Mobile Application Development**, focado na criação de uma solução de gerenciamento de frotas para a empresa Mottu.

---

## 🧑‍💻 Integrantes

| Nome Completo | RM | GitHub |
| :--- | :--- | :--- |
| Caike Dametto | RM558614 | [Dametto98](https://github.com/Dametto98) |
| Guilherme Janunzzi | RM558461 | [GuiJanunzzi](https://github.com/GuiJanunzzi) |

---

## 🎯 Proposta

**MotoMap** é uma aplicação mobile projetada para otimizar o gerenciamento da frota de motocicletas da Mottu. O objetivo é fornecer aos colaboradores uma ferramenta intuitiva para registrar, visualizar e administrar as motos e as filiais, além de monitorar a ocupação dos pátios em tempo real.

O sistema centraliza as informações, permitindo um controle mais eficiente do status e da localização de cada veículo da frota.

---

## ▶️ Demonstração do Aplicativo

Assista ao vídeo de demonstração completa do **MotoMap** em funcionamento, apresentando todas as funcionalidades implementadas:

[**Assista no YouTube**](https://youtu.be/MafGkR2q-VY)

---

## ✨ Funcionalidades

O aplicativo conta com as seguintes funcionalidades implementadas:

#### Autenticação e Tema
- ✅ **Login de Usuário:** Autenticação segura via API com tratamento de erros.
- ✅ **Cadastro de Novos Usuários:** Tela de registro integrada ao backend.
- ✅ **Tema Dinâmico:** Suporte completo a modo claro (Light Mode) e escuro (Dark Mode), com um botão para alternância manual.

#### Gerenciamento de Motos (CRUD Completo)
- 📝 **Cadastro de Motos:** Formulário com validações, `Dropdown` para seleção de modelo e `Switch` para status.
- 📖 **Listagem de Motos:** Exibição da lista de motos cadastradas, com atualização em tempo real.
- ✏️ **Edição de Motos:** Formulário para alterar os dados de uma moto existente.
- ❌ **Exclusão de Motos:** Funcionalidade para remover uma moto do sistema, com alerta de confirmação.

#### Gerenciamento de Filiais (CRUD Completo)
- 📝 **Cadastro de Filiais:** Formulário para registrar novas filiais, informando nome, endereço e capacidade do pátio.
- 📖 **Listagem de Filiais:** Exibição da lista de filiais com opções de "Editar" e "Excluir".
- ✏️ **Edição de Filiais:** Formulário para alterar os dados de uma filial existente.
- ❌ **Exclusão em Cascata:** Funcionalidade para remover uma filial e, de forma segura, apagar automaticamente todas as motos, problemas e vagas de pátio associadas.

#### Pátio e Problemas
- 🅿️ **Visualização de Pátio:** Tela dinâmica que exibe o layout do pátio da filial selecionada, com estatísticas e legenda.
- 🤖 **Geração Automática de Vagas:** Ao cadastrar uma nova filial, o backend cria automaticamente todas as posições do pátio com base no número de linhas e colunas.
- 📋 **Gestão de Problemas:** CRUD completo para reportar, editar e excluir problemas associados a uma moto.

#### Notificações e Localização
- 🔔 **Notificações Push:** O app pede permissão e registra o token de push do usuário no backend após o login. (Demonstrado no vídeo).
- 🗣️ **Internacionalização (i18n):** Suporte completo para **Português** e **Espanhol**, com detecção automática do idioma do dispositivo.
- ℹ️ **Tela "Sobre o App":** Apresenta a versão do app, o hash do commit de build e os desenvolvedores com suas fotos de perfil do GitHub.

---

## 🛠️ Tecnologias Utilizadas

#### Frontend (Mobile)
- **React Native (Expo)**
- **React Navigation:** Para gerenciamento de rotas.
- **Axios:** Para realizar as chamadas à API REST.
- **React Context API:** Para gerenciamento de estado global (Autenticação e Tema).
- **`i18next` & `expo-localization`:** Para internacionalização e detecção de idioma.
- **`expo-notifications`:** Para registro e recebimento de Notificações Push.
- **`expo-constants`:** Para ler configurações e o hash do commit.
- **`react-native-dropdown-picker`:** Para menus de seleção customizados nos formulários.

#### Backend (Java)
- **Java 17**
- **Spring Boot 3:** Para a construção da API REST.
- **Spring Data JPA:** Para a persistência de dados.
- **Spring Security & JWT:** Para o controle de autenticação e autorização.
- **H2 Database:** Banco de dados em memória para ambiente de desenvolvimento.
- **Docker:** Para criação da imagem de deploy.
- **Render:** Plataforma de nuvem para deploy contínuo do backend.

---

## 📁 Estrutura de Pastas

A estrutura principal de pastas do projeto mobile foi organizada da seguinte forma:

```
assets/
└── images/         # Ícones e logos do aplicativo
src/                # Código-fonte principal
├── components/     # Componentes reutilizáveis (ex: ThemeToggleButton)
├── contexts/       # Contextos globais (AuthContext, ThemeContext)
├── locales/        # Arquivos de tradução (pt.json, es.json)
├── routes/         # Configuração da navegação do app (stack.routes.js)
├── screens/        # Telas principais do aplicativo (HomeScreen, LoginScreen, etc.)
└── services/       # Configuração da API (api.js) e de Notificação
```

---

## 🚀 Como Executar o Projeto

### **Backend (API)**

O backend da aplicação (API Java/Spring Boot) já está implantado na plataforma de nuvem **Render** e o aplicativo mobile já está configurado para se conectar a ela.

> **Nota sobre o Deploy:** A API está hospedada no plano gratuito do Render. Se o servidor ficar inativo por um período, ele pode "dormir" para economizar recursos. A primeira requisição feita pelo app (como o login) pode demorar de 20 a 30 segundos para "acordar" o servidor. Após a primeira conexão, a aplicação funcionará em velocidade normal.

### **Frontend (Aplicativo Mobile)**

Para executar o aplicativo em um ambiente de desenvolvimento local (conectado à API na nuvem):

**Pré-requisitos:**
- Node.js
- Expo CLI
- Emulador Android (Android Studio) ou o app Expo Go em um dispositivo físico

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Dametto98/ChallengeMobile-MottoMap.git
    ```
2.  **Navegue até a pasta do projeto mobile:**
    ```bash
    cd ChallengeMobile-MottoMap
    ```
3.  **Instale as Dependências:**
    ```bash
    npm install
    ```
4.  **Execute o Aplicativo:**
    ```bash
    npm start
    ```
5.  Abra o aplicativo no seu ambiente de teste:
    - Pressione `a` para abrir no Emulador Android.
    - Ou escaneie o QR Code com o app Expo Go no seu celular físico.