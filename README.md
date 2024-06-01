# Puppeteer Date Input Automation

This repository contains a script to automate the process of entering dates on a website using Puppeteer. The script logs into a website, navigates to a date picker, inputs specified dates, takes screenshots, and performs additional actions as needed.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher is recommended)
- [Puppeteer](https://pptr.dev/) (latest version)

## Installation

### 1. Install Node.js

1. **Download Node.js**:
   - Go to the [Node.js download page](https://nodejs.org/) and download the installer for your operating system.
   - Follow the instructions to install Node.js. This will also install `npm` (Node Package Manager).

2. **Verify Installation**:
   - Open your terminal (Command Prompt, PowerShell, or any terminal emulator).
   - Run the following command to verify the installation:
     ```sh
     node -v
     ```
   - You should see the installed version of Node.js. For example: `v16.14.0`.

   - Also, verify `npm` installation by running:
     ```sh
     npm -v
     ```
   - You should see the installed version of `npm`. For example: `8.3.1`.

### 2. Install Puppeteer

1. **Clone the Repository**:
   - Clone this repository to your local machine:
   ```sh
   git clone https://github.com/sinusance/park-entry-reservations.git
   cd park-entry-reservations
   ```

2. **Install Puppeteer**:
   - Run the following command to install Puppeteer:
     ```sh
     npm install
     ```

## Usage

1. Update the script with your email and password to login to recreation.gov (lines 60-61)

2. **Run the Script**:
   - In your terminal, navigate to the project directory and run the script using Node.js:
     ```sh
     node index.js
     ```

3. **Output**:
   - The script will log in to the specified website, input the dates, take screenshots for each date, and save them in the project directory. The screenshots will be named `datescreenshot_MM_DD_YYYY.png`.

4. Once the script completes you can login to recreation.gov and see all the tickets in your cart. They then need to be with your information and acknowledgements before checking out.

## Notes

- Ensure that the login credentials and other specific selectors match the actual values from your target website.
- Adjust the time slot selector and any other interactions as necessary to match the elements on your webpage.

## Troubleshooting

- If you encounter any issues, ensure that all dependencies are installed correctly.
- Check the selectors and make sure they match the elements on the webpage.
- If the script runs too quickly, you might need to increase the delay times.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
