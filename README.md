# Diagnostic Display Demo

This is a web application built for a technical assessment. It displays FHIR R4 formatted diagnostic reports for a patient in a clean interface. The application fetches data from an API endpoint, parses it, and renders it using modern web technologies.

---

## Features

* **Interactive UI**: A landing page directs users to a list of diagnostic reports.
* **Report View**: Reports are displayed in a list where each item can be clicked to expand and view detailed observations.
* **FHIR Data Parsing**: Utilizes the `fhir-models` library to safely parse complex FHIR R4 JSON data into typed objects. Although this needed to be extended for the format of the example data.
* **Server-Side Rendering (SSR)**: Built with the Next.js App Router for optimal performance.
* **Responsive Design**: Styled with Tailwind CSS for a seamless experience on all screen sizes.
* **Component-Based Architecture**: A clean and maintainable codebase with logic separated into reusable React components.

---

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (v15+)
* **Library**: [React](https://reactjs.org/) (v19+)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **FHIR Parsing**: [fhir-models](https://www.npmjs.com/package/fhir-models)
* **Unit Tests**: [Jest](https://www.npmjs.com/package/jest)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or later) and `npm` installed on your computer. `nvm` or similar recommended. 

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:lpitman/diagnostic-display-demo.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd diagnostic-report-app
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the application in development mode, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

Run unit tests with:

```bash
npm test
```

---

## Project Structure

The project uses the Next.js App Router, which organizes the application by routes.

* `app/`: Contains all the application's routes and UI.
    * `app/page.tsx`: The main landing page.
    * `app/reports/page.tsx`: The page that fetches and displays the list of diagnostic reports.
    * `app/components/`: Contains all the reusable React components.
        * `CollapsibleReportItem.tsx`: An interactive client component for a single report accordion.
        * `ObservationItem.tsx`: A simple component to display a single observation/vital.
        * `app/components/tests/*text.tsx`: Tests for component rendering.
    * `app/types/`: Contains all our interfaces for this project.
    * `app/utils`: Contains the utilities for fetching and parsing the data.
        * `app/utils/fetch-report.ts`: Simple function to grab the data from the source.
        * `app/utils/parse-report.ts`: Where `fhir-models` is used to parse the incoming data.
        * `app/utils/utils.text.ts`: Unit tests for the utils functions. 
* `public/`: Static assets like images and fonts.
* `__mocks__`: Mock data for the unit tests.

---

## Assumptions Made

During the development process, the following assumptions were made:

1.  **API Endpoint**: The provided API endpoint (`https://build.fhir.org/diagnosticreport-example.json`) is stable, and its FHIR JSON structure is consistent.
2.  **Multiple Reports**: To demonstrate handling a list of reports, the single report fetched from the API was duplicated three times to simulate a real-world scenario where a patient might have multiple reports.
3.  **Data Consistency**: It is assumed that every `DiagnosticReport` will contain valid references to `Observation` resources that are also present within the same FHIR Bundle.
4.  **UI/UX**: The user interface was designed to be clean and intuitive, building upon the provided example by adding interactivity (accordion) for a better user experience.
5.  **Reference Ranges**: The reference range for Basophils is lacking a low range. It is assumed that is because the low limit is 0. Therefore, the ObservationDetail interface will default with a low of 0 if none is provided in the data.  

## Special Thanks
To my spouse the med lab tech for suggesting that I add the "It is not uncommon for results to be out of range." note to the reports.
