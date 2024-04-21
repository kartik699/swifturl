# SwiftURL

SwiftURL is a URL shortener project built using Next.js, TypeScript, Prisma, and CockroachDB. It allows you to shorten long URLs into more manageable and shareable links.

![swifturl](https://github.com/kartik699/swifturl/assets/58633671/668791e2-a281-45b1-96e7-fb8207cc9725)

## Table of Contents

- [Features](https://github.com/kartik699/swifturl/edit/main/README.md#features)
- [Prerequsites](https://github.com/kartik699/swifturl/edit/main/README.md#prerequisites)
- [Installation](https://github.com/kartik699/swifturl/edit/main/README.md#installation)
- [Configuration](https://github.com/kartik699/swifturl/edit/main/README.md#configuration)
- [Usage](https://github.com/kartik699/swifturl/edit/main/README.md#usage)

## Features

- Shorten long URLs into customizable, easy-to-share links.
- Redirect visitors from shortened URLs to the original long URLs.
- Secure and scalable architecture using Next.js, TypeScript, Prisma, and CockroachDB.

## Prerequisites

Before running SwiftURL, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git (optional, for cloning the repository)
- CockroachDB Account (for DATABASE_URL)

## Installation

1. Clone the Repository:

``` 
git clone https://github.com/kartik699/SwiftURL.git
```

2. Navigate to the project directory:

```
cd SwiftURL
```

3. Install dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

``` 
DATABASE_URL=
```

Add your own URL from your CockroachDB account.

## Usage

1. Start the development server:

```
npm run dev
```

2. Access SwiftURL in your web browser at `http://localhost:3000`.
   











