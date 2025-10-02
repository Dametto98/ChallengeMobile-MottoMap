# 🏍️ MotoMap

## 🧑‍💻 Integrantes

| Nome Completo | RM | GitHub |
| :--- | :--- | :--- |
| Caike Dametto | RM558614 | [@Dametto98] |
| Guilherme Janunzzi | RM558461 | [@GuiJanunzzi] |

## 🎯 Proposta

**MotoMap** é uma aplicação mobile projetada para otimizar o gerenciamento da frota de motocicletas da Mottu. O objetivo é fornecer aos colaboradores uma ferramenta intuitiva para registrar, visualizar e administrar as motos e as filiais, além de monitorar a ocupação dos pátios em tempo real.

O sistema centraliza as informações, permitindo um controle mais eficiente do status e da localização de cada veículo da frota.

## ✨ Funcionalidades

O aplicativo conta com as seguintes funcionalidades implementadas:

#### Autenticação e Tema
- ✅ **Login de Usuário:** Autenticação segura via API com tratamento de erros.
- ✅ **Cadastro de Novos Usuários:** Tela de registro integrada ao backend.
- ✅ **Tema Dinâmico:** Suporte completo a modo claro (Light Mode) e escuro (Dark Mode), com um botão para alternância manual.

#### Gerenciamento de Motos (CRUD Completo)
- 📝 **Cadastro de Motos:** Formulário com validações para registrar novas motos na frota.
- 📖 **Listagem de Motos:** Exibição da lista de motos cadastradas, com atualização em tempo real.
- ✏️ **Edição de Motos:** Formulário para alterar os dados de uma moto existente.
- ❌ **Exclusão de Motos:** Funcionalidade para remover uma moto do sistema, com alerta de confirmação.

#### Gerenciamento de Filiais (CRUD Completo)
- 📝 **Cadastro de Filiais:** Formulário para registrar novas filiais, informando nome, endereço e capacidade do pátio.
- 📖 **Listagem de Filiais:** Exibição da lista de filiais da empresa.
- ✏️ **Edição de Filiais:** Formulário para alterar os dados de uma filial existente.
- ❌ **Exclusão em Cascata:** Funcionalidade para remover uma filial e, de forma segura e automática, todas as motos e vagas de pátio associadas a ela.

#### Pátio
- 🅿️ **Visualização de Pátio:** Tela dinâmica que exibe o layout do pátio da filial selecionada.
- 📊 **Status das Vagas:** Indicação visual para vagas livres e ocupadas, com estatísticas de ocupação.

## 🛠️ Tecnologias Utilizadas

#### Frontend (Mobile)
- **React Native CLI**
- **React Navigation:** Para gerenciamento de rotas e navegação.
- **Axios:** Para realizar as chamadas à API REST.
- **React Context API:** Para gerenciamento de estado global (Autenticação e Tema).

#### Backend
- **Java 17**
- **Spring Boot 3:** Para a construção da API REST.
- **Spring Data JPA:** Para a persistência de dados.
- **Spring Security & JWT:** Para o controle de autenticação e autorização.
- **H2 Database:** Banco de dados em memória para ambiente de desenvolvimento.
- **Lombok**
- **Swagger (Springdoc):** Para documentação da API.

## 📁 Estrutura de Pastas

A estrutura principal de pastas do projeto mobile foi organizada da seguinte forma para garantir a separação de responsabilidades:

```
assets/
src/       
├── components/     # Componentes reutilizáveis (ex: ThemeToggleButton)
├── contexts/       # Contextos globais (AuthContext, ThemeContext)
├── locales/        # Arquivos de tradução (pt.json, en.json)
├── routes/         # Configuração da navegação do app (stack.routes.js)
├── screens/        # Telas principais do aplicativo (HomeScreen, LoginScreen, etc.)
└── services/       # Configuração da API e outros serviços
```

## 🚀 Como Executar o Projeto

Para executar a solução completa, você precisará rodar o **Backend (API)** e o **Frontend (Aplicativo Mobile)** separadamente.

### **1. Backend (Java - Spring Boot)**

**Pré-requisitos:**
- JDK 17 ou superior

- **Clone o Repositório:**
    ```
    git clone https://github.com/GuiJanunzzi/MottoMap-Java.git
    ```

#### **Opção A: Executando via Terminal (usando Maven Wrapper)**

1.  Navegue até a pasta do projeto backend:
    ```bash
    cd MottoMap-Java
    ```

2.  Execute o projeto:
    - No Windows:
      ```bash
      mvnw.cmd spring-boot:run
      ```
    - No Linux ou macOS:
      ```bash
      ./mvnw spring-boot:run
      ```

3.  O servidor iniciará e estará rodando em `http://localhost:8080`.

#### **Opção B: Executando via IDE (VS Code, IntelliJ, Eclipse)**

1.  Importe o projeto na sua IDE como um projeto Maven.
2.  Aguarde a IDE baixar todas as dependências.
3.  Encontre a classe principal da aplicação (geralmente `App.java` ou `MottomapApplication.java`).
4.  Execute (Run) essa classe.

### **2. Frontend (React Native)**

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Dametto98/ChallengeMobile-MottoMap.git
    ```
2.  **Instale as Dependências (Frontend):**
    ```bash
    cd ChallengeMobile-MottoMap
    npm install
    ```
3.  **Configure a API:**
    - No arquivo `src/services/api.js`, altere a variável `API_JAVA_URL` para o endereço de IP da máquina onde o backend está rodando.

4.  **Execute o Backend:**
    - Abra o projeto Java e execute a aplicação Spring Boot.

5.  **Execute o Frontend:**
    ```bash
    npm start
    ```
    *Certifique-se de que um emulador Android esteja aberto ou um dispositivo físico esteja conectado.*

## ▶️ Demonstração do Aplicativo

Assista ao vídeo de demonstração completa do **MotoMap** em funcionamento:

[**Assista no YouTube**](https://youtu.be/z4Y53CZn9K8)