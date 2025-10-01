# Jarvis-web

Jarvis-web is a frontend application built using React Typescript.
It helps the Jarvis Extension for Wallet connection and Payments.

## Getting Started

To get started with Jarvis-web, follow these steps: 

1. Clone the repository: `git clone https://github.com/caramel0019/jarvis-web.git`
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`

## Usage 

To use Jarvis-web, simply navigate to `http://localhost:5173/` in your browser.
You can interact with connect wallet and payments by installing the jarvis extension `https://github.com/caramel0019/jarvis-extension.git`, you will be direct to this web page for wallet connection or payments.
The welcome page is auth free and can be accessed by visiting the local host.

## Features 

* Welcome Page 
* Wallet connection with leap or keplr wallet.
* Payments also with leap or keplr wallet.

## Security

Jarvis-web, Here are some security measures we take:

* **Auth** we you token based auth from jarvis extension and validate it here 
* **Data Transfer** we send data jarvis-web and extension securly through postMessage and injecting contents scripts 

## Technologies Used

* React
* Typescript 
* HTML/Tailwind CSS
* Vite
* npm

## License 

Jarvis-web is released under the MIT License. See LICENSE for details.